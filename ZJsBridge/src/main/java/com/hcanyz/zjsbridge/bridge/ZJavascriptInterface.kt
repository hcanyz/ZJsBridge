package com.hcanyz.zjsbridge.bridge

import android.webkit.JavascriptInterface
import com.hcanyz.zjsbridge.ZJsBridge
import com.hcanyz.zjsbridge.cotainer.IZWebView
import java.lang.ref.WeakReference

class ZJavascriptInterface(private val qWebView: IZWebView) {

    @JavascriptInterface
    fun _sendMessage(msg: String?) {
        //bridge层请求native api 参考readme-protocol.md
        if (ZJsBridge.ZJS_DEBUG) ZJsBridge.log("bridge _sendMessage:$msg")

        if (msg != null) {
            try {
                //参考readme-protocol.md数据接口，解析成BridgeMessage对象
                val bridgeMessage = BridgeMessage.parse7Check(msg, qWebView.getCurZWebHelper().dgtVerifyRandomStr)

                //构建一个回调器
                val handler = JsCallBacker(bridgeMessage, izWebView = WeakReference(qWebView))

                //遍历查找所有的注册集合，消耗该次请求
                qWebView.getCurZWebHelper().dispatchExeApi(bridgeMessage.apiName, bridgeMessage.params, handler)
            } catch (e: Exception) {
                if (ZJsBridge.ZJS_DEBUG) ZJsBridge.log("_sendMessage  e:$e")
            }
        }
    }
}
