package com.hcanyz.zjsbridge.handler

import android.content.Intent
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import com.hcanyz.zjsbridge.bridge.ZJsCallBacker


interface IZJsApiHandler {

    fun handleApi(apiName: String, params: String, jsCallBacker: ZJsCallBacker): Boolean

    fun onAttachContainer(activity: FragmentActivity)

    fun onAttachContainer(fragment: Fragment)

    fun onContainerResult(requestCode: Int, resultCode: Int, data: Intent?): Boolean {
        return false
    }

    fun onContainerDestroy()
}
