package com.hcanyz.zjsbridge.util

import android.util.Base64
import java.security.MessageDigest

class ZUtils {
    companion object {

        private val HEX_DIGITS = charArrayOf('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f')

        fun signatureSHA1(paramsStr: String): String {
            return try {
                val digest = MessageDigest.getInstance("SHA-1")
                digest.update(paramsStr.toByteArray())
                toHexString(digest.digest())
            } catch (e: Exception) {
                ""
            }
        }

        private fun toHexString(bData: ByteArray): String {
            val sb = StringBuilder(bData.size * 2)
            for (i in bData.indices) {
                sb.append(HEX_DIGITS[(bData[i].toInt() shr 4) and 0x0f])
                sb.append(HEX_DIGITS[bData[i].toInt() and 0x0f])
            }
            return sb.toString()
        }

        fun base64Encode(str: String): String {
            return Base64.encodeToString(str.toByteArray(), Base64.NO_WRAP)
        }
    }
}