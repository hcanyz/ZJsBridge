package com.hcanyz.zjsbridge.test.x5

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.hcanyz.zjsbridge.cotainer.IZWebViewContainer
import com.hcanyz.zjsbridge.handler.ZCommonJsHandler
import com.hcanyz.zjsbridge.jshandlerimpl.image.ImageJsHandler
import com.hcanyz.zjsbridge.test.R
import com.hcanyz.zjsbridge.test.test.TestJsHandler
import kotlinx.android.synthetic.main.activity_test_x5_web_view.*

class TestX5WebViewActivity : AppCompatActivity(), IZWebViewContainer {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_test_x5_web_view)

        x5web_test.loadUrl("file:///android_asset/index.html")

        x5web_test.getCurZWebHelper().registeredJsApiHandler(this, ZCommonJsHandler::class.java)
        x5web_test.getCurZWebHelper().registeredJsApiHandler(this, ImageJsHandler::class.java)
        x5web_test.getCurZWebHelper().registeredJsApiHandler(this, TestJsHandler::class.java)
    }

    override fun onResume() {
        super.onResume()
        x5web_test.getCurZWebHelper().jsEventer.event("onContainerResume")
    }

    override fun onPause() {
        super.onPause()
        x5web_test.getCurZWebHelper().jsEventer.event("onContainerPause")
    }

    override fun closeWindow() {
        finish()
    }

    override fun updateTitle(title: String) {
        tv_test_tile.text = title
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        x5web_test.getCurZWebHelper().dispatchContainerResult(requestCode, resultCode, data)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        x5web_test.getCurZWebHelper().dispatchContainerDestroy()
    }

    override fun onBackPressed() {
        if (x5web_test.visibility == View.VISIBLE && x5web_test.canGoBack()) {
            x5web_test.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
