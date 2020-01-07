package com.hcanyz.zjsbridge

import android.util.Log

class ZJsBridge {
    companion object {
        var ZJS_DEBUG = false

        fun init(debug: Boolean) {
            ZJS_DEBUG = debug
        }

        fun log(msg: String?) {
            if (ZJS_DEBUG) Log.d("ZJsBridge", msg)
        }
    }
}