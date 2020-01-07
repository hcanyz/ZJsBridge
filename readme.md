ZJsBridge
===
> 一套完整的native-bridge-web协议与实现，清晰规范的开发Hybrid App

[zfjs-sdk项目](https://github.com/hcanyz/ZJsBridge-ZJs)

## ZJsBridge能做什么
- 对web端提供完整的js-sdk，形成sdk版本概念
- 对native提供jsapi组件化实现能力
- 交互过程数据完整性校验

## 什么场景下需要使用ZJsBridge
- 较多的web与native交互，需要统一native对外api
- native组件化，需要不能模块提供不同native api

## 如何使用(详见demo)

添加依赖
```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}

dependencies {
    implementation 'com.github.hcanyz:ZJsBridge:1.0.0'
}
```

WebView implements IZWebView
```kotlin
class WebView : WebView, IZWebView {
    
    private val zWebHelper: ZWebHelper by lazy { ZWebHelper(this) }

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
            evaluateJavascript("javascript:$sourceJs") { valueCallback?.onReceiveValue(it) }
        })
    }

    override fun runOnMainThread(runnable: Runnable) {
        if (Looper.getMainLooper() == Looper.myLooper()) {
            runnable.run()
            return
        }
        post(runnable)
    }
}
```

初始化时 addJavascriptInterface
```kotlin
addJavascriptInterface(ZJavascriptInterface(this), "__zf")
```

添加一个WebViewClient
```kotlin
private inner class InnerCustomWebViewClient : WebViewClient() {
    override fun onPageFinished(webView: WebView?, s: String?) {
        super.onPageFinished(webView, s)
        zWebHelper.injectCoreJs()
    }

    override fun doUpdateVisitedHistory(p0: WebView?, p1: String?, p2: Boolean) {
        super.doUpdateVisitedHistory(p0, p1, p2)
        zWebHelper.injectCoreJs()
    }

    override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? {
        val zWebResourceResponse = zWebHelper.hookNativeResourceWithWebViewRequest(request.url)
        if (zWebResourceResponse != null) {
            return WebResourceResponse(zWebResourceResponse.mimeType, "", zWebResourceResponse.data)
        }
        return super.shouldInterceptRequest(view, request)
    }
}
```

activity|fragment容器 registeredJsApiHandler
```kotlin
web_test.getCurZWebHelper().registeredJsApiHandler(this, CommonJsHandler::class.java)
web_test.getCurZWebHelper().registeredJsApiHandler(this, ImageJsHandler::class.java)
```

activity|fragment容器 implements IZWebViewContainer
```kotlin
override fun closeWindow() {
    finish()
}

override fun updateTitle(title: String) {
    tv_test_tile.text = title
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    web_test.getCurZWebHelper().dispatchContainerResult(requestCode, resultCode, data)
}

override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    web_test.getCurZWebHelper().dispatchContainerDestroy()
}

override fun onBackPressed() {
    if (web_test.canGoBack()) {
        web_test.goBack()
    } else {
        super.onBackPressed()
    }
}
```

## web测试工程
app module中已集成一个打包后的项目，可以替换为
https://github.com/hcanyz/ZJsBridge-ZJs/test/zfjs-test/README.md

## [zfjs-sdk-api](./readme-jssdk-api.md#zfjs-sdk说明文档)

## [Native-Bridge协议](./readme-protocol.md#协议)

## [nativeResourceUrl协议](./readme-nativeResourceUrl.md#协议)