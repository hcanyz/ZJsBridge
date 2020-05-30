package com.hcanyz.zjsbridge.jshandlerimpl.image

import android.app.Activity
import android.content.Intent
import android.provider.MediaStore
import android.webkit.MimeTypeMap
import androidx.core.content.FileProvider
import com.hcanyz.zjsbridge.bridge.ZJsCallBacker
import com.hcanyz.zjsbridge.handler.ZBaseJsApiHandler
import org.json.JSONArray
import org.json.JSONObject
import java.io.File


class ImageJsHandler : ZBaseJsApiHandler() {

    companion object {
        const val REQUEST_ALBUM = 10000
    }

    override fun handleApi(apiName: String, params: String, jsCallBacker: ZJsCallBacker): Boolean {
        when (apiName) {
            "choosePhotos" -> {
                val activity = getActivity() ?: return true
                val fragment = getFragment()
                val albumIntent = Intent(Intent.ACTION_PICK)
                albumIntent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*")
                if (fragment != null) {
                    fragment.startActivityForResult(albumIntent, REQUEST_ALBUM)
                } else {
                    activity.startActivityForResult(albumIntent, REQUEST_ALBUM)
                }
                saveJsCallBacker("choosePhotos_$REQUEST_ALBUM", jsCallBacker)
                return true
            }
            "previewPhotos" -> {
                try {
                    val activity = getActivity() ?: return true

                    val jsonObject = JSONObject(params)
                    val urls = jsonObject.optJSONArray("urls")
                    val index = jsonObject.optInt("index", 0)

                    val intent = Intent(Intent.ACTION_VIEW)

                    //找回真实路径
                    val filePath = jsCallBacker.getVirtualKeyRealPath(urls.getString(index))

                    val uri = FileProvider.getUriForFile(activity, activity.applicationContext.packageName + ".provider", File(filePath))
                    intent.setDataAndType(uri, MimeTypeMap.getSingleton().getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(filePath)))
                    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    activity.startActivity(intent)
                } catch (e: Exception) {
                    jsCallBacker.fail(ZJsCallBacker.CODE_ERR_FAIL, e.toString())
                }
                return true
            }
            "uploadPhotos" -> {
            }
        }
        return false
    }

    override fun onContainerResult(requestCode: Int, resultCode: Int, data: Intent?): Boolean {
        when (requestCode) {
            REQUEST_ALBUM -> {
                when (resultCode) {
                    Activity.RESULT_OK -> {
                        val get7RemoveJsCallBacker = get7RemoveJsCallBacker("choosePhotos_$REQUEST_ALBUM")
                                ?: return true
                        data?.data?.pathSegments?.lastOrNull()?.let { path ->
                            val result = JSONArray()

                            val item = JSONObject()
                            //将真实路径转化为虚拟映射路径
                            item.put("nativeResourceUrl", get7RemoveJsCallBacker.createNativeResourceVirtualKey(path))
                            result.put(item)

                            get7RemoveJsCallBacker.success(jsonArray = result)
                        }
                    }
                }
                return true
            }
        }
        return super.onContainerResult(requestCode, resultCode, data)
    }
}