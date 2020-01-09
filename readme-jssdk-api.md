# zfjs-sdk说明文档

#### 目录
[1 概述](#概述)

[1.1 jssdk使用步骤](#jssdk使用步骤)

[1.1.1 引入js](#引入js)

[1.2 接口调用说明](#接口调用说明)

[1.3 如何判断是否运行在zfjsapp环境中](#如何判断是否运行在zfjsapp环境中)


[2 基础接口](#基础接口)

[2.1 check](#check)

[2.2 容器后台前台切换](#容器后台前台切换)

[3 工具类接口](#工具类接口)

[3.1 设置浏览器标题文字](#设置浏览器标题文字)

[3.2 返回上一个h5页面-根页面则退出容器](#返回上一个h5页面-根页面则退出容器)

[3.3 退出容器](#退出容器)

[3.4 键值对存储-存](#键值对存储-存)

[3.5 键值对存储-读](#键值对存储-读)


[4 图片类接口](#图片类接口)

[4.1 选择图片](#选择图片)

[4.2 上传图片](#上传图片)

[4.3 预览图片](#预览图片)


[5 视频类接口](#视频类接口)

[5.1 选择视频](#选择视频)

[5.2 上传视频](#上传视频)

[5.3 预览视频](#预览视频)


[6 文件类接口](#文件类接口)

[6.1 选择文件](#选择文件)

[6.2 上传文件](#上传文件)

[6.3 预览文件](#预览文件)


[7 位置类接口](#位置类接口)

[7.1 通过界面选取一个位置](#通过界面选取一个位置)

[7.2 直接获取一个位置](#直接获取一个位置)

[7.3 打开地图预览](#打开地图预览)


## 概述
## jssdk使用步骤

#### **引入js**

在需要调用JS接口的页面引入JS文件 [zfjs-sdk.js](./zfjs-sdk.js)  
支持使用 AMD/CMD 标准模块加载方法加载

#### **接口调用说明**
所有接口通过zfApi对象来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：

success：接口调用成功时执行的回调函数。  
fail：接口调用失败时执行的回调函数。  
complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。  
cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。  

以上几个函数都带有一个参数，类型为对象，其中除了每个接口本身返回的数据之外，还有一些通用属性，如：```{
    errCode: 0,
    errMsg: ""
}```  
其中errCode为必有的integer字段，含义参照[错误码](./readme-protocol.md#错误码),errMsg为调用失败的具体描述

#### **如何判断是否运行在zfjsapp环境中**
```
let match = 
navigator.userAgent.match(/zfjs\/(\d+\.\d+\.\d+)/)
||
navigator.userAgent.match(/zfjs\/(\d+\.\d+)/)

let vCode = match && match[1]
```


## 基础接口

#### **check**

#### **容器后台前台切换**
```
window.zfApi.onContainerResume(ret => {
    console.log(`onContainerResume ${JSON.stringify(ret)}`);
});
window.zfApi.onContainerPause(ret => {
    console.log(`onContainerPause ${JSON.stringify(ret)}`);
});
```

## 工具类接口

#### **设置浏览器标题文字**
```
zfApi.setTitle({
    title: "test title" //标题
});
```

#### **返回上一个h5页面-根页面则退出容器**
```
zfApi.backCloseWindow({});
```

#### **退出容器**
```
zfApi.closeWindow({});
```

#### **键值对存储-存**
TODO  安全
```
zfApi.putLocalStorageKV({
    key:""      //键
    value:""    //值
});
```

#### **键值对存储-读**
TODO  安全
```
zfApi.getLocalStorageKV({
    key:"",             //键
    success(ret){
        let ret.value   //取到的值
    }
});
```

## 图片类接口

#### **选择图片**
```
zfApi.choosePhotos({
    enableCount: 3, //可选择数量，0<enableCount<=9
    success(ret) {
        let result = ret.result; //[{nativeResourceUrl:"",name:"",size:0}]
        result.forEach(element => {
            let nativeResourceUrl = element.nativeResourceUrl; //图片本地地址，可以直接指定为image标签src
            let name = element.name; //名称
            let size = element.size; //文件大小
        });
    }
});
```

#### **上传图片**
```
zfApi.uploadPhotos({
    nativeResourceUrls: [""], //choosePhotos获取到的
    success(ret) {
        let result = ret.result; //[{nativeResourceUrl:"",serverResourceUrl:""}]
        result.forEach(element => {
            let nativeResourceUrl = element.nativeResourceUrl; //图片本地地址
            let serverResourceUrl = element.serverResourceUrl; //服务器地址
        });
    }
});
```

#### **预览图片**
```
zfApi.previewPhotos({
    urls: ["", ""], //可以为nativeResourceUrl
    index: 0, //打开时展示的图片位置
    success() {}
});
```

## 视频类接口

#### **选择视频**
```
zfApi.chooseVideos({
    enableCount: 3, //可选择数量,0<enableCount<=3
    success(ret) {
        let result = ret.result; //[{nativeResourceUrl:"",name:"",size:0}]  
        result.forEach(element => {
            let nativeResourceUrl = element.nativeResourceUrl; //本地地址
            let name = element.name; //名称
            let size = element.size; //文件大小
            let videoTime = element.videoTime; //视频时长，毫秒
        });
    }
});
```

#### **上传视频**
```
zfApi.uploadVideos({
    nativeResourceUrls: [""], //chooseVideos获取到的
    success(ret) {
        let result = ret.result; //[{nativeResourceUrl:"",serverResourceUrl:""}]
        result.forEach(element => {
            let nativeResourceUrl = element.nativeResourceUrl; //本地地址
            let serverResourceUrl = element.serverResourceUrl; //服务器地址
        });
    }
});
```

#### **预览视频**
```
zfApi.previewVideo({
    url: "", //可以为nativeResourceUrl
    success() {}
});
```

## 文件类接口

#### **选择文件**
```
zfApi.chooseFile({
    enableCount: 3, //可选择数量，0<enableCount<=9，在多选时才处理-iOS不支持多选
    maxSize: 3, //单个文件限制大小：0:无限制; >0 限制最大值，单位为MB
    isMultiSelect: true, //（true，为多选  false，单选-iOS不支持多选）
    success(ret) {
        let result = ret.result; //[{nativeResourceUrl:"",name:"",size:0}]  
        result.forEach(element => {
            let nativeResourceUrl = element.nativeResourceUrl; //本地地址
            let name = element.name; //名称
            let size = element.size; //文件大小
        });
    }
});
```

#### **上传文件**
```
zfApi.uploadFile({
    nativeResourceUrls: [""], //chooseVideos获取到的
    success(ret) {
        let result = ret.result; //[{nativeResourceUrl:"",serverResourceUrl:""}]
        result.forEach(element => {
            let nativeResourceUrl = element.nativeResourceUrl; //本地地址
            let serverResourceUrl = element.serverResourceUrl; //服务器地址
        });
    }
});
```

#### **预览文件**
```
zfApi.previewFile({
    url: "", //可以为nativeResourceUrl
    success() {}
});
```

## 位置类接口

#### **通过界面选取一个位置**
```
zfApi.chooseLocation({
    success(ret) {
        let address = ret.address; // 详细地址
        let latitude = ret.latitude; // 纬度，浮点数，范围为90 ~ -90
        let longitude = ret.longitude; // 经度，浮点数，范围为180 ~ -180。
    }
});
```

#### **直接获取当前位置**
```
zfApi.getLocation({
    success(ret) {
        let address = ret.address; // 详细地址
        let latitude = ret.latitude; // 纬度，浮点数，范围为90 ~ -90
        let longitude = ret.longitude; // 经度，浮点数，范围为180 ~ -180。
    }
});
```

#### **打开地图预览**
TODO
```
zfApi.getLocation({
    success(ret) {}
});
```