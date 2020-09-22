ZJsBridge
===
> 参考微信jsBridge的一套完整的native-bridge-web协议与实现，清晰规范的开发Hybrid App

[![](https://jitpack.io/v/hcanyz/ZJsBridge.svg)](https://jitpack.io/#hcanyz/ZJsBridge)

Support **API v19+**  
Support **androidx**

[js实现: zfjs-sdk库](https://github.com/hcanyz/ZJsBridge-ZJs)

## ZJsBridge能做什么
- 对web端提供js-sdk，形成sdk概念，统一app对外api，统一的api管理（权限、版本兼容）
- 让native端api具备组件化能力，不在需要将所有api写个一个modlue中
- 保障native-web js交互的数据一致性、安全

## 什么场景下需要使用ZJsBridge
- 项目中有较多的web与native交互，需要native统一提供对外api
- native组件化，需要在不同模块中实现api逻辑

## [标准api：zfjs-sdk-api](./readme-jssdk-api.md#zfjs-sdk说明文档)

## [bridge协议：Native-Bridge协议](./readme-protocol.md#协议)

## ~~[虚拟资源协议：nativeResourceUrl协议](./readme-nativeResourceUrl.md#协议)~~

## 如何使用((推荐)详见本项目demo)

### 添加依赖
```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}

dependencies {
    implementation 'com.github.hcanyz:ZJsBridge:$version'
}
```

#### 需要修改的类
- Webview（android、x5...）
- WebViewClient（添加一些方法调用，协助zjs感知webview生命周期）
- activity|fragment
    - 注册api实现类
    - 添加一些方法，协助zjs感知容器生命周期

##### WebView implements IZWebView
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

##### Webview addJavascriptInterface
```kotlin
addJavascriptInterface(ZJavascriptInterface(this), ZJavascriptInterface.INTERFACE_NAME)
```

##### WebViewClient
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
}
```

##### registeredJsApiHandler
```kotlin
web_test.getCurZWebHelper().registeredJsApiHandler(this, ZCommonJsHandler::class.java)
web_test.getCurZWebHelper().registeredJsApiHandler(this, ImageJsHandler::class.java)
```

##### activity|fragment容器 implements IZWebViewContainer
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

## api测试

[这个库](https://github.com/hcanyz/ZJsBridge-ZJs/blob/master/test/zfjs-test/README.md)提供了一个h5的api测试页面

本项目中已集成一个打包后的产物，可以自行编译替换（ZJsBridge\app\src\main\assets）
