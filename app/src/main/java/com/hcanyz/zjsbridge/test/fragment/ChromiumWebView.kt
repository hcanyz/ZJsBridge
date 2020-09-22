package com.hcanyz.zjsbridge.test.fragment

import android.content.Context
import android.os.Looper
import android.util.AttributeSet
import android.webkit.ValueCallback
import android.webkit.WebView
import android.webkit.WebViewClient
import com.hcanyz.zjsbridge.ZJsBridge
import com.hcanyz.zjsbridge.bridge.ZJavascriptInterface
import com.hcanyz.zjsbridge.cotainer.IZWebView
import com.hcanyz.zjsbridge.cotainer.ZWebHelper


class ChromiumWebView : WebView, IZWebView {

    constructor(p0: Context?) : super(p0)
    constructor(p0: Context?, p1: AttributeSet?) : super(p0, p1)
    constructor(p0: Context?, p1: AttributeSet?, p2: Int) : super(p0, p1, p2)

    private val zWebHelper: ZWebHelper by lazy { ZWebHelper(this) }

    init {
        val settings = settings
        @Suppress("SetJavaScriptEnabled")
        settings.javaScriptEnabled = true

        settings.userAgentString = settings.userAgentString + " zfjs/1.0.0"

        //提供js-bridge层注入
        webViewClient = InnerCustomWebViewClient()

        //注册bridge事件处理对象
        addJavascriptInterface(ZJavascriptInterface(this), ZJavascriptInterface.INTERFACE_NAME)
    }

    override fun getCurUrl(): String {
        return url
    }

    override fun getCurContext(): Context {
        return context
    }

    override fun getCurZWebHelper(): ZWebHelper {
        return zWebHelper
    }

    override fun execJs(methodName: String, params: String?, valueCallback: ValueCallback<String>?) {
        val js: String = if (params.isNullOrBlank()) {
            String.format("%s()", methodName)
        } else {
            String.format("%s('%s')", methodName, params)
        }
        execJs(js, valueCallback)
    }

    override fun execJs(sourceJs: String, valueCallback: ValueCallback<String>?) {
        if (ZJsBridge.ZJS_DEBUG) ZJsBridge.log("evaluateJavascript:javascript:$sourceJs")
        runOnMainThread(Runnable {
            evaluateJavascript("javascript:$sourceJs", valueCallback)
        })
    }

    override fun runOnMainThread(runnable: Runnable) {
        if (Looper.getMainLooper() == Looper.myLooper()) {
            runnable.run()
            return
        }
        post(runnable)
    }

    private inner class InnerCustomWebViewClient : WebViewClient() {
        override fun onPageFinished(webView: WebView?, s: String?) {
            super.onPageFinished(webView, s)
            //注入js-bridge，可以多次调用，js-bridge有幂等处理
            zWebHelper.injectCoreJs()
        }

        override fun doUpdateVisitedHistory(p0: WebView?, p1: String?, p2: Boolean) {
            super.doUpdateVisitedHistory(p0, p1, p2)
            //注入js-bridge，可以多次调用，js-bridge有幂等处理
            zWebHelper.injectCoreJs()
        }
    }
}
