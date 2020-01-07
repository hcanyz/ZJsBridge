# 协议

android和ios如果直接给予web页面一个file:///路径资源时，web页面无法直接预览(显示)此文件(图片)   
可以虚拟一个资源uri，web页面正常虚拟uri，android端在资源加载时动态拦截此uri，替换为真实资源数据

原理：

```kotlin
//android.webkit.WebViewClient
override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? {

}

//web页面加载资源时都会经过此方法，可以拦截特定url，返回处理过的WebResourceResponse
```