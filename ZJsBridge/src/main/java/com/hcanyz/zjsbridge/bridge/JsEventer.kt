package com.hcanyz.zjsbridge.bridge

import android.webkit.ValueCallback
import com.hcanyz.zjsbridge.cotainer.IZWebView
import com.hcanyz.zjsbridge.util.ZUtils
import org.json.JSONArray
import org.json.JSONObject

class JsEventer(private val izWebView: IZWebView) {

    fun event(eventName: String, jsonObject: JSONObject = JSONObject(), valueCallback: ValueCallback<String>? = null) {
        doHandle(eventName, jsonObject, valueCallback)
    }

    fun event(eventName: String, key: String = "result", jsonArray: JSONArray = JSONArray(), valueCallback: ValueCallback<String>? = null) {
        val jsonObject = JSONObject()
        jsonObject.put(key, jsonArray)

        doHandle(eventName, jsonObject, valueCallback)
    }

    private fun doHandle(eventName: String, jsonObject: JSONObject, valueCallback: ValueCallback<String>? = null) {
        val jsonMessage = JSONObject()
        jsonMessage.put("eventName", eventName)
        jsonMessage.put("msgType", "event")
        jsonMessage.put("params", jsonObject)

        val jsonMessageBase64 = ZUtils.base64Encode(jsonMessage.toString())

        val shaKey = ZUtils.signatureSHA1("$jsonMessageBase64${izWebView.getCurZWebHelper().dgtVerifyRandomStr}")

        val toBridgeRet = JSONObject()
        toBridgeRet.put("jsonMessage", jsonMessageBase64)
        //生成签名
        toBridgeRet.put("shaKey", shaKey)

        izWebView.execJs("zfJSBridge._handleMessageFromZF", toBridgeRet.toString(), valueCallback)
    }
}