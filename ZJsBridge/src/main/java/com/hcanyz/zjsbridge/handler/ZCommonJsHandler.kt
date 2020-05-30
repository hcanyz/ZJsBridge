package com.hcanyz.zjsbridge.handler

import com.hcanyz.zjsbridge.bridge.ZJsCallBacker
import com.hcanyz.zjsbridge.cotainer.IZWebViewContainer

class ZCommonJsHandler : ZBaseJsApiHandler() {

    override fun handleApi(apiName: String, params: String, jsCallBacker: ZJsCallBacker): Boolean {
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