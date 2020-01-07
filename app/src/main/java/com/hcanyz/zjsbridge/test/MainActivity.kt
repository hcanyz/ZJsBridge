package com.hcanyz.zjsbridge.test

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.hcanyz.zjsbridge.ZJsBridge
import com.hcanyz.zjsbridge.test.chromium.TestWebViewActivity
import com.hcanyz.zjsbridge.test.fragment.TestInFragmentActivity
import com.hcanyz.zjsbridge.test.x5.TestX5WebViewActivity
import com.tencent.smtt.sdk.QbSdk

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //init x5
        QbSdk.initX5Environment(application, null)

        ZJsBridge.init(true)

        setContentView(R.layout.activity_main)
    }

    fun testWebViewActivity(view: View) {
        startActivity(Intent(this, TestWebViewActivity::class.java))
    }

    fun testX5WebViewActivity(view: View) {
        startActivity(Intent(this, TestX5WebViewActivity::class.java))
    }

    fun testInFragment(view: View) {
        startActivity(Intent(this, TestInFragmentActivity::class.java))
    }
}