package com.hcanyz.zjsbridge.test.fragment

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.fragment.app.Fragment
import com.hcanyz.zjsbridge.cotainer.IZWebViewContainer
import com.hcanyz.zjsbridge.handler.CommonJsHandler
import com.hcanyz.zjsbridge.jshandlerimpl.image.ImageJsHandler
import com.hcanyz.zjsbridge.test.R
import kotlinx.android.synthetic.main.fragmenttest_web_view.*

class TestWebViewFragment : Fragment(), IZWebViewContainer {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragmenttest_web_view, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        web_test.loadUrl("file:///android_asset/index.html")

        web_test.getCurZWebHelper().registeredJsApiHandler(this, CommonJsHandler::class.java)
        web_test.getCurZWebHelper().registeredJsApiHandler(this, ImageJsHandler::class.java)

        requireActivity().onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (web_test.canGoBack()) {
                    web_test.goBack()
                } else {
                    requireActivity().finish()
                }
            }
        })
    }

    override fun closeWindow() {
        requireActivity().finish()
    }

    override fun updateTitle(title: String) {
        tv_test_tile.text = title
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        //处理startActivityForResult返回值到每个JsApiHandler
        web_test.getCurZWebHelper().dispatchContainerResult(requestCode, resultCode, data)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        //处每个JsApiHandler处理界面销毁
        web_test.getCurZWebHelper().dispatchContainerDestroy()
    }
}