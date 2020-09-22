package com.hcanyz.zjsbridge.bridge

import com.hcanyz.zjsbridge.ZJsBridge
import com.hcanyz.zjsbridge.cotainer.IZWebView
import com.hcanyz.zjsbridge.util.ZUtils
import org.json.JSONArray
import org.json.JSONObject
import java.lang.ref.WeakReference


class ZJsCallBacker(private val bridgeMessage: ZBridgeMessage, private val izWebView: WeakReference<IZWebView>) {

    companion object {
        const val CODE_SUCCESS = 0   //成功
        const val CODE_ERR_CANCEL = 1  //取消操作
        const val CODE_ERR_FAIL = 3 //未知错误
        const val CODE_ERR_INVALID = 400  //无效的请求参数
        const val CODE_ERR_FORBIDDEN = 403 //没有该方法的调用权限
        const val CODE_ERR_404 = 404  //请求的方法或者事件名没有找到
    }

    fun cancel() {
        val jsonObject = JSONObject()
        jsonObject.put("errCode", CODE_ERR_CANCEL)
        doHandle(jsonObject)
    }

    fun fail(errCode: Int = CODE_ERR_FAIL, errMsg: String = "") {
        val jsonObject = JSONObject()
        jsonObject.put("errCode", errCode)
        jsonObject.put("errMsg", errMsg)
        doHandle(resultObj = jsonObject)
    }

    fun success(jsonObject: JSONObject) {
        jsonObject.put("errCode", CODE_SUCCESS)
        doHandle(resultObj = jsonObject)
    }

    fun success(key: String = "result", jsonArray: JSONArray) {
        val jsonObject = JSONObject()
        jsonObject.put("errCode", CODE_SUCCESS)
        jsonObject.put(key, jsonArray)
        doHandle(resultObj = jsonObject)
    }

    private fun doHandle(resultObj: JSONObject) {
        izWebView.get()?.let { izWebView ->
            try {
                val jsonMessage = JSONObject()

                jsonMessage.put("msgType", "callback")
                jsonMessage.put("callbackId", bridgeMessage.callbackId)
                jsonMessage.put("params", resultObj)

                val jsonMessageBase64 = ZUtils.base64Encode(jsonMessage.toString())

                val shaKey = ZUtils.signatureSHA1("$jsonMessageBase64${izWebView.getCurZWebHelper().dgtVerifyRandomStr}")

                val toBridgeRet = JSONObject()
                toBridgeRet.put("jsonMessage", jsonMessageBase64)
                toBridgeRet.put("shaKey", shaKey)

                izWebView.execJs("zfJSBridge._handleMessageFromZF", toBridgeRet.toString(), null)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        } ?: if (ZJsBridge.ZJS_DEBUG) ZJsBridge.log("$bridgeMessage izWebView recycle")
    }

    @Deprecated("use content://")
    fun createNativeResourceVirtualKey(nativeResource: String): String? {
        return izWebView.get()?.getCurZWebHelper()?.createNativeResourceVirtualKey(nativeResource)
    }

    @Deprecated("use content://")
    fun getVirtualKeyRealPath(virtualKey: String): String? {
        return izWebView.get()?.getCurZWebHelper()?.findVirtualKeyRealPath(virtualKey)
    }
}