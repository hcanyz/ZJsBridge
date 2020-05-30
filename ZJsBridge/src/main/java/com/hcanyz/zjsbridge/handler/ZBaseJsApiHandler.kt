package com.hcanyz.zjsbridge.handler

import androidx.annotation.CallSuper
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import com.hcanyz.zjsbridge.bridge.ZJsCallBacker
import com.hcanyz.zjsbridge.cotainer.IZWebViewContainer
import java.lang.ref.WeakReference

abstract class ZBaseJsApiHandler : IZJsApiHandler {

    private var activityWR: WeakReference<FragmentActivity>? = null
    private var fragmentWR: WeakReference<Fragment?>? = null
    private var containerWR: WeakReference<IZWebViewContainer>? = null

    override fun onAttachContainer(activity: FragmentActivity) {
        activityWR = WeakReference(activity)
        check(activity is IZWebViewContainer) { "activity Must implement IZWebViewContainer" }
        containerWR = WeakReference(activity)
    }

    override fun onAttachContainer(fragment: Fragment) {
        activityWR = WeakReference(fragment.requireActivity())
        fragmentWR = WeakReference(fragment)
        check(fragment is IZWebViewContainer) { "fragment Must implement IZWebViewContainer" }
        containerWR = WeakReference(fragment)
    }

    fun getActivity(): FragmentActivity? {
        return activityWR?.get()
    }

    fun getFragment(): Fragment? {
        return fragmentWR?.get()
    }

    fun <T : IZWebViewContainer> getContainerOp(): T? {
        @Suppress("UNCHECKED_CAST")
        return containerWR?.get() as T?
    }

    private val zJsCallBackerMap: MutableMap<String, ZJsCallBacker> by lazy {
        mutableMapOf<String, ZJsCallBacker>()
    }

    fun saveJsCallBacker(key: String, ZJsCallBacker: ZJsCallBacker) {
        zJsCallBackerMap[key] = ZJsCallBacker
    }

    fun get7RemoveJsCallBacker(key: String): ZJsCallBacker? {
        return zJsCallBackerMap.remove(key)
    }

    @CallSuper
    override fun onContainerDestroy() {
        zJsCallBackerMap.clear()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        return true
    }

    override fun hashCode(): Int {
        return javaClass.hashCode()
    }
}