package com.hcanyz.zjsbridge.bridge

import android.webkit.ValueCallback
import com.hcanyz.zjsbridge.cotainer.IZWebView
import com.hcanyz.zjsbridge.util.ZUtils
import org.json.JSONObject

class JsEventer {
    companion object {
        fun event(izWebView: IZWebView, ret: String, valueCallback: ValueCallback<String>? = null) {
            val jsonMessage = JSONObject(ret)
            jsonMessage.put("errCode", JsCallBacker.CODE_SUCCESS)

            val shaKey = ZUtils.signatureSHA1("$jsonMessage${izWebView.getCurZWebHelper().dgtVerifyRandomStr}")

            val toBridgeRet = JSONObject()
            toBridgeRet.put("jsonMessage", jsonMessage)
            //生成签名文件
            toBridgeRet.put("shaKey", shaKey)

            izWebView.execJs("zfJSBridge._handleMessageFromZF", toBridgeRet.toString(), valueCallback)
        }
    }
}