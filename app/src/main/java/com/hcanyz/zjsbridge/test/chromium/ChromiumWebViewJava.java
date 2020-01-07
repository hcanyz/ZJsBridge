package com.hcanyz.zjsbridge.test.chromium;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Looper;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.webkit.ValueCallback;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.hcanyz.zjsbridge.bridge.ZJavascriptInterface;
import com.hcanyz.zjsbridge.cotainer.IZWebView;
import com.hcanyz.zjsbridge.cotainer.ZWebHelper;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class ChromiumWebViewJava extends WebView implements IZWebView {

    public ChromiumWebViewJava(Context context) {
        super(context);
        init();
    }

    public ChromiumWebViewJava(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public ChromiumWebViewJava(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }


    @SuppressLint("SetJavaScriptEnabled")
    private void init() {
        WebSettings settings = getSettings();
        settings.setJavaScriptEnabled(true);

        settings.setUserAgentString(settings.getUserAgentString() + " zfjs/1.0.0");

        setWebViewClient(new InnerCustomWebViewClient());

        addJavascriptInterface(new ZJavascriptInterface(this), "__zf");
    }

    private ZWebHelper zWebHelper = new ZWebHelper(this);

    @Override
    public void execJs(@NotNull String methodName, @Nullable String params, @Nullable ValueCallback<String> valueCallback) {
        String js;
        if (TextUtils.isEmpty(params)) {
            js = String.format("%s()", methodName);
        } else {
            js = String.format("%s('%s')", methodName, params);
        }
        execJs(js, valueCallback);
    }

    @Override
    public void execJs(@NotNull final String sourceJs, @Nullable final ValueCallback<String> valueCallback) {
        runOnMainThread(new Runnable() {
            @Override
            public void run() {
                evaluateJavascript(sourceJs, valueCallback);
            }
        });
    }

    @Override
    public void runOnMainThread(@NotNull Runnable runnable) {
        if (Looper.getMainLooper() == Looper.myLooper()) {
            runnable.run();
            return;
        }
        post(runnable);
    }

    @NotNull
    @Override
    public String getCurUrl() {
        return getUrl();
    }

    @NotNull
    @Override
    public Context getCurContext() {
        return getContext();
    }

    @NotNull
    @Override
    public ZWebHelper getCurZWebHelper() {
        return zWebHelper;
    }

    private class InnerCustomWebViewClient extends WebViewClient {
        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            zWebHelper.injectCoreJs();
        }

        @Override
        public void doUpdateVisitedHistory(WebView view, String url, boolean isReload) {
            super.doUpdateVisitedHistory(view, url, isReload);
            zWebHelper.injectCoreJs();
        }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            ZWebHelper.ZWebResourceResponse zWebResourceResponse = zWebHelper.hookNativeResourceWithWebViewRequest(request.getUrl());
            if (zWebResourceResponse != null) {
                return new WebResourceResponse(zWebResourceResponse.getMimeType(), "", zWebResourceResponse.getData());
            }
            return super.shouldInterceptRequest(view, request);
        }
    }
}
