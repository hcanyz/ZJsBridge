package com.hcanyz.zjsbridge.handler

import android.content.Intent
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import com.hcanyz.zjsbridge.bridge.JsCallBacker


interface IJsApiHandler {

    fun handleApi(apiName: String, params: String, jsCallBacker: JsCallBacker): Boolean

    fun attachContainer(activity: FragmentActivity)

    fun attachContainer(fragment: Fragment)

    fun onContainerResult(requestCode: Int, resultCode: Int, data: Intent?): Boolean {
        return false
    }

    fun onContainerDestroy()
}
