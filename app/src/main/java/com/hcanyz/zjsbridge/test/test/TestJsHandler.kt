package com.hcanyz.zjsbridge.test.test

import android.widget.Toast
import com.hcanyz.zjsbridge.bridge.ZJsCallBacker
import com.hcanyz.zjsbridge.handler.ZBaseJsApiHandler
import org.json.JSONObject

class TestJsHandler : ZBaseJsApiHandler() {

    override fun handleApi(apiName: String, params: String, jsCallBacker: ZJsCallBacker): Boolean {
        when (apiName) {
            "_test_unicode_params_and_result" -> {
                val activity = getActivity() ?: return true

                Toast.makeText(activity, params, Toast.LENGTH_LONG).show()

                val result = JSONObject()
                result.put("unicodeResult", "中文 Emoji 😂🤣")
                jsCallBacker.success(result)
                return true
            }
        }
        return false
    }
}