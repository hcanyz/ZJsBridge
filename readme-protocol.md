# 协议

## Bridge->Native
- var _dgtVerifyRandomStr = "${_dgtVerifyRandomStr}" 用于注入一个密钥串（UUID）
加载zfjs.js时替换"${_dgtVerifyRandomStr}" 为UUID

- _sendMessage 用于请求native api
    数据结构：
    ```
    _sendMessage({
        jsonMessage:"{
            apiName:""
            params:""
            callbackId:""
            msgType:"" //call
        }",
        shaKey:""  // sha1(jsonMessage+_dgtVerifyRandomStr) sha1("111") = 6216f8a75fd5bb3d5f22b6f9958cdede3fc086c2
    })
    ```
Native每次收到请求都需要校验数据一致性


## Native->Bridge
- _handleMessageFromZF 用于Native传递数据给Bridge
    
    数据结构:
    ```
    _handleMessageFromZF({
        //android与js平台的json实现有略微区别，需要base64编码保证数据一致
        jsonMessage:Base64.encodeToString("{
            msgType:""       //callback | event
            callbackId:""    //msgType==callback必传，_sendMessage里面
            eventName:""     //msgType==event必传，表示触发什么事件

            params:{           //调用参数,json
                errCode:0       //必传
                errMsg:""       //具体api
            }
        }"),
        shaKey:""  // sha1(jsonMessage:Base64.encodeToString(jsonMessage)+_dgtVerifyRandomStr)
    })
    ```
    返回值：

    ```
    出错时：
    {
        'errCode': 404
    }
    正常: 看具体api
    {
        'errCode': 0,
        ...
    }
    ```

- #### 错误码

| errCode | 含义                         |
|---------|------------------------------|
| 0       | 正常                         |
| 1       | 取消操作                     |
| 2       | 无效的请求参数               |
| 403     | 没有该方法的调用权限         |
| 404     | 请求的方法或者事件名没有找到 |

- 已有event列表

