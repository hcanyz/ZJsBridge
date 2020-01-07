package com.hcanyz.zjsbridge.handler

import com.hcanyz.zjsbridge.bridge.JsCallBacker
import com.hcanyz.zjsbridge.cotainer.IZWebViewContainer

class CommonJsHandler : BaseJsApiHandler() {

    override fun handleApi(apiName: String, params: String, jsCallBacker: JsCallBacker): Boolean {
        when (apiName) {
            "closeWindow" -> {
                getContainerOp<IZWebViewContainer>()?.closeWindow()
                return true
            }
            "setTitle" -> {
                getContainerOp<IZWebViewContainer>()?.updateTitle(params)
                return true
            }
        }
        return false
    }
}