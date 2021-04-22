package com.hcanyz.zjsbridge.test.chromium

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.hcanyz.zjsbridge.cotainer.IZWebViewContainer
import com.hcanyz.zjsbridge.handler.ZCommonJsHandler
import com.hcanyz.zjsbridge.jshandlerimpl.image.ImageJsHandler
import com.hcanyz.zjsbridge.test.R
import com.hcanyz.zjsbridge.test.test.TestJsHandler
import kotlinx.android.synthetic.main.activity_test_web_view.*

class TestWebViewActivity : AppCompatActivity(), IZWebViewContainer {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_test_web_view)

        web_test.loadUrl("file:///android_asset/index.html")

        web_test.getCurZWebHelper().registeredJsApiHandler(this, ZCommonJsHandler::class.java)
        web_test.getCurZWebHelper().registeredJsApiHandler(this, ImageJsHandler::class.java)
        web_test.getCurZWebHelper().registeredJsApiHandler(this, TestJsHandler::class.java)
    }

    override fun closeWindow() {
        finish()
    }

    override fun updateTitle(title: String) {
        tv_test_tile.text = title
    }

    override fun onResume() {
        super.onResume()
        web_test.getCurZWebHelper().jsEventer.event("onContainerResume")
    }

    override fun onPause() {
        super.onPause()
        web_test.getCurZWebHelper().jsEventer.event("onContainerPause")
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
}
