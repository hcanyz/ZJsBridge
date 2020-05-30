package com.hcanyz.zjsbridge.cotainer

import android.content.Intent
import android.net.Uri
import android.webkit.MimeTypeMap
import android.webkit.ValueCallback
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import com.hcanyz.zjsbridge.ZJsBridge
import com.hcanyz.zjsbridge.bridge.ZJsCallBacker
import com.hcanyz.zjsbridge.bridge.ZJsEventer
import com.hcanyz.zjsbridge.handler.IZJsApiHandler
import com.hcanyz.zjsbridge.util.ZUtils
import java.io.File
import java.io.FileInputStream
import java.io.InputStream
import java.io.InputStreamReader
import java.util.*

/**
 * 处理一些预置行为
 * 例如注入zfjs.js到当前页面，此过程会协商加密密钥
 *
 * @property izWebView IZWebView
 * @property dgtVerifyRandomStr String 与bridge约定的加密密钥
 * @property apiHandlers MutableSet<IJsApiHandler> 处理web的api请求对象，由容器初始化
 * @property nativeResourceVirtualKeyMap MutableMap<String, String> 虚拟路径映射表
 * @constructor
 */
class ZWebHelper(private val izWebView: IZWebView) {

    val dgtVerifyRandomStr: String by lazy { UUID.randomUUID().toString() }

    //  加载js处理
    private val injectCoreJsStr: String by lazy {
        val readLines = InputStreamReader(izWebView.getCurContext().assets.open("jsapi/zfjs.js")).readLines()
        val js = StringBuilder()
        readLines.fold(js, { acc, s ->
            acc.append(s.replace("\${_dgtVerifyRandomStr}", dgtVerifyRandomStr)).append("\n")
        })
        js.toString()
    }

    fun injectCoreJs() {
        izWebView.execJs(injectCoreJsStr,
                ValueCallback {
                    if (ZJsBridge.ZJS_DEBUG) ZJsBridge.log("url: ${izWebView.getCurUrl()}\ninject result: $it")
                })
    }

    private val apiHandlers: MutableSet<IZJsApiHandler> by lazy { hashSetOf<IZJsApiHandler>() }

    fun dispatchExeApi(apiName: String, params: String, zJsCallBacker: ZJsCallBacker) {
        izWebView.runOnMainThread(Runnable {
            try {
                for (handler in apiHandlers) {
                    if (handler.handleApi(apiName, params, zJsCallBacker)) {
                        return@Runnable
                    }
                }
            } catch (e: Exception) {
                zJsCallBacker.fail(ZJsCallBacker.CODE_ERR_FAIL, e.toString())
                return@Runnable
            }
            zJsCallBacker.fail(ZJsCallBacker.CODE_ERR_404, "")
        })
    }

    fun dispatchContainerResult(requestCode: Int, resultCode: Int, data: Intent?) {
        for (handler in apiHandlers) {
            if (handler.onContainerResult(requestCode, resultCode, data)) {
                return
            }
        }
    }

    fun dispatchContainerDestroy() {
        for (handler in apiHandlers) {
            handler.onContainerDestroy()
        }
    }

    fun registeredJsApiHandler(fragment: Fragment, clazz: Class<out IZJsApiHandler>) {
        val jsApiHandler = clazz.newInstance()
        jsApiHandler.onAttachContainer(fragment)
        apiHandlers.add(jsApiHandler)
    }

    fun registeredJsApiHandler(fragment: Fragment, jsApiHandler: IZJsApiHandler) {
        jsApiHandler.onAttachContainer(fragment)
        apiHandlers.add(jsApiHandler)
    }

    fun registeredJsApiHandler(fragmentActivity: FragmentActivity, clazz: Class<out IZJsApiHandler>) {
        val jsApiHandler = clazz.newInstance()
        jsApiHandler.onAttachContainer(fragmentActivity)
        apiHandlers.add(jsApiHandler)
    }

    fun registeredJsApiHandler(fragmentActivity: FragmentActivity, jsApiHandler: IZJsApiHandler) {
        jsApiHandler.onAttachContainer(fragmentActivity)
        apiHandlers.add(jsApiHandler)
    }

    /**
     * 用于存储一个真实地址与虚拟路径的映射关系
     */
    private val nativeResourceVirtualKeyMap by lazy { mutableMapOf<String, String>() }

    fun createNativeResourceVirtualKey(nativeResource: String): String {
        val file = File(nativeResource)
        if (!file.exists() || !file.isFile) {
            ZJsBridge.log("createNativeResourceVirtualKey file does not exists or not a file")
        }

        val virtualKey = "zf://nativeResourceMap?key=${ZUtils.signatureSHA1(nativeResource)}.${MimeTypeMap.getFileExtensionFromUrl(nativeResource)}"

        nativeResourceVirtualKeyMap[virtualKey] = nativeResource

        return virtualKey
    }

    fun findVirtualKeyRealPath(virtualKey: String): String? {
        return nativeResourceVirtualKeyMap[virtualKey]
    }

    fun hookNativeResourceWithWebViewRequest(url: Uri): ZWebResourceResponse? {
        if (url.scheme == "zf" && url.host == "nativeResourceMap") {
            val nativeResource = nativeResourceVirtualKeyMap[url.toString()] ?: return null
            val file = File(nativeResource)
            if (!file.exists() || !file.isFile) {
                ZJsBridge.log("hookNativeResourceWithWebViewRequest file does not exists or not a file")
                return null
            }
            val mimeType = MimeTypeMap.getSingleton()
                    .getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(url.getQueryParameter("key")))
                    ?: ""
            return ZWebResourceResponse(mimeType, FileInputStream(file))
        }
        return null
    }

    data class ZWebResourceResponse(val mimeType: String?, val data: InputStream)

    val jsEventer: ZJsEventer by lazy { ZJsEventer(izWebView) }
}