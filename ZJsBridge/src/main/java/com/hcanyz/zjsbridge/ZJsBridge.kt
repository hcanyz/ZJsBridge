package com.hcanyz.zjsbridge

import android.util.Log

class ZJsBridge {
    companion object {
        var ZJS_DEBUG = false
        var logFun: ((msg: String?) -> Unit)? = null

        fun init(debug: Boolean, log: ((msg: String?) -> Unit)? = null) {
            ZJS_DEBUG = debug
            logFun = log
        }

        fun log(msg: String?) {
            if (ZJS_DEBUG) {
                val logFun = logFun
                if (logFun != null) {
                    logFun(msg)
                    return
                }
                Log.d("ZJsBridge", msg)
            }
        }
    }
}