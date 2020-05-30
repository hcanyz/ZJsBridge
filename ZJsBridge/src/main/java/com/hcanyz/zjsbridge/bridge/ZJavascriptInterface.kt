package com.hcanyz.zjsbridge.bridge

import android.webkit.JavascriptInterface
import com.hcanyz.zjsbridge.ZJsBridge
import com.hcanyz.zjsbridge.cotainer.IZWebView
import java.lang.ref.WeakReference

class ZJavascriptInterface(private val qWebView: IZWebView) {

    //bridge层请求native api 参考readme-protocol.md
    @JavascriptInterface
    fun _sendMessage(msg: String?) {
        if (ZJsBridge.ZJS_DEBUG) ZJsBridge.log("bridge _sendMessage:$msg")

        if (msg != null) {
            try {
                //参考readme-protocol.md数据接口，解析成BridgeMessage对象
                val bridgeMessage = ZBridgeMessage.parse7Check(msg, qWebView.getCurZWebHelper().dgtVerifyRandomStr)

                val handler = ZJsCallBacker(bridgeMessage, izWebView = WeakReference(qWebView))

                qWebView.getCurZWebHelper().dispatchExeApi(bridgeMessage.apiName, bridgeMessage.params, handler)
            } catch (e: Exception) {
                if (ZJsBridge.ZJS_DEBUG) ZJsBridge.log("_sendMessage  e:$e")
            }
        }
    }
}
