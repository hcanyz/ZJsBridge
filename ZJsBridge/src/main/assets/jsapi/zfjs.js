(function () {
    //--- util

    var __DL = 0, __IL = 1, __EL = 2, __LogLvl = __DL
    var __LogArr = ["start"]
    function __Log(lvl) {
        __LogArr.push(arguments)
        if (lvl >= __LogLvl) {
            window.console && window.console.log.apply(console, Array.prototype.slice.call(arguments, 1))
        }
    }

    var CryptoJS = CryptoJS || function (e, m) {
        var p = {},
            j = p.lib = {},
            l = function () { },
            f = j.Base = {
                extend: function (a) {
                    l.prototype = this
                    var c = new l
                    a && c.mixIn(a)
                    c.hasOwnProperty("init") || (c.init = function () {
                        c.$super.init.apply(this, arguments)
                    })
                    c.init.prototype = c
                    c.$super = this
                    return c
                },
                create: function () {
                    var a = this.extend()
                    a.init.apply(a, arguments)
                    return a
                },
                init: function () { },
                mixIn: function (a) {
                    for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c])
                    a.hasOwnProperty("toString") && (this.toString = a.toString)
                },
                clone: function () {
                    return this.init.prototype.extend(this)
                }
            },
            n = j.WordArray = f.extend({
                init: function (a, c) {
                    a = this.words = a || []
                    this.sigBytes = c != m ? c : 4 * a.length
                },
                toString: function (a) {
                    return (a || h).stringify(this)
                },
                concat: function (a) {
                    var c = this.words,
                        q = a.words,
                        d = this.sigBytes
                    a = a.sigBytes
                    this.clamp()
                    if (d % 4)
                        for (var b = 0; b < a; b++) c[d + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4)
                    else if (65535 < q.length)
                        for (b = 0; b < a; b += 4) c[d + b >>> 2] = q[b >>> 2]
                    else c.push.apply(c, q)
                    this.sigBytes += a
                    return this
                },
                clamp: function () {
                    var a = this.words,
                        c = this.sigBytes
                    a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4)
                    a.length = e.ceil(c / 4)
                },
                clone: function () {
                    var a = f.clone.call(this)
                    a.words = this.words.slice(0)
                    return a
                },
                random: function (a) {
                    for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * e.random() | 0)
                    return new n.init(c, a)
                }
            }),
            b = p.enc = {},
            h = b.Hex = {
                stringify: function (a) {
                    var c = a.words
                    a = a.sigBytes
                    for (var b = [], d = 0; d < a; d++) {
                        var f = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255
                        b.push((f >>> 4).toString(16))
                        b.push((f & 15).toString(16))
                    }
                    return b.join("")
                },
                parse: function (a) {
                    for (var c = a.length,
                        b = [], d = 0; d < c; d += 2) b[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8)
                    return new n.init(b, c / 2)
                }
            },
            g = b.Latin1 = {
                stringify: function (a) {
                    var c = a.words
                    a = a.sigBytes
                    for (var b = [], d = 0; d < a; d++) b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255))
                    return b.join("")
                },
                parse: function (a) {
                    for (var c = a.length,
                        b = [], d = 0; d < c; d++) b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4)
                    return new n.init(b, c)
                }
            },
            r = b.Utf8 = {
                stringify: function (a) {
                    try {
                        return decodeURIComponent(escape(g.stringify(a)))
                    } catch (c) {
                        throw Error("Malformed UTF-8 data")
                    }
                },
                parse: function (a) {
                    return g.parse(unescape(encodeURIComponent(a)))
                }
            },
            k = j.BufferedBlockAlgorithm = f.extend({
                reset: function () {
                    this._data = new n.init
                    this._nDataBytes = 0
                },
                _append: function (a) {
                    "string" == typeof a && (a = r.parse(a))
                    this._data.concat(a)
                    this._nDataBytes += a.sigBytes
                },
                _process: function (a) {
                    var c = this._data,
                        b = c.words,
                        d = c.sigBytes,
                        f = this.blockSize,
                        ht = d / (4 * f),
                        h = a ? e.ceil(ht) : e.max((ht | 0) - this._minBufferSize, 0)
                    a = h * f
                    d = e.min(4 * a, d)
                    if (a) {
                        for (var g = 0; g < a; g += f) this._doProcessBlock(b, g)
                        g = b.splice(0, a)
                        c.sigBytes -= d
                    }
                    return new n.init(g, d)
                },
                clone: function () {
                    var a = f.clone.call(this)
                    a._data = this._data.clone()
                    return a
                },
                _minBufferSize: 0
            })
        j.Hasher = k.extend({
            cfg: f.extend(),
            init: function (a) {
                this.cfg = this.cfg.extend(a)
                this.reset()
            },
            reset: function () {
                k.reset.call(this)
                this._doReset()
            },
            update: function (a) {
                this._append(a)
                this._process()
                return this
            },
            finalize: function (a) {
                a && this._append(a)
                return this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function (a) {
                return function (c, b) {
                    return (new a.init(b)).finalize(c)
                }
            },
            _createHmacHelper: function (a) {
                return function (b, f) {
                    return (new s.HMAC.init(a, f)).finalize(b)
                }
            }
        })
        var s = p.algo = {}
        return p
    }(Math);

    (function () {
        var e = CryptoJS,
            mt = e.lib,
            p = mt.WordArray,
            j = mt.Hasher,
            l = [],
            m = e.algo.SHA1 = j.extend({
                _doReset: function () {
                    this._hash = new p.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                },
                _doProcessBlock: function (f, n) {
                    for (var b = this._hash.words,
                        h = b[0], g = b[1], e = b[2], k = b[3], j = b[4], a = 0; 80 > a; a++) {
                        if (16 > a) l[a] = f[n + a] | 0
                        else {
                            var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16]
                            l[a] = c << 1 | c >>> 31
                        }
                        c = (h << 5 | h >>> 27) + j + l[a]
                        c = 20 > a ? c + ((g & e | ~g & k) + 1518500249) : 40 > a ? c + ((g ^ e ^ k) + 1859775393) : 60 > a ? c + ((g & e | g & k | e & k) - 1894007588) : c + ((g ^ e ^ k) - 899497514)
                        j = k
                        k = e
                        e = g << 30 | g >>> 2
                        g = h
                        h = c
                    }
                    b[0] = b[0] + h | 0
                    b[1] = b[1] + g | 0
                    b[2] = b[2] + e | 0
                    b[3] = b[3] + k | 0
                    b[4] = b[4] + j | 0
                },
                _doFinalize: function () {
                    var f = this._data,
                        e = f.words,
                        b = 8 * this._nDataBytes,
                        h = 8 * f.sigBytes
                    e[h >>> 5] |= 128 << 24 - h % 32
                    e[(h + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296)
                    e[(h + 64 >>> 9 << 4) + 15] = b
                    f.sigBytes = 4 * e.length
                    this._process()
                    return this._hash
                },
                clone: function () {
                    var e = j.clone.call(this)
                    e._hash = this._hash.clone()
                    return e
                }
            })
        e.SHA1 = j._createHelper(m)
        e.HmacSHA1 = j._createHmacHelper(m)
    })()

    var zfHelper = {
        isIOS: function () {
            let reg = /iphone|ipad|ipod/i
            if (reg.test(window.navigator.userAgent)) { return true } else { return false }
        }
    }

    //--- core

    var __zf
    if (zfHelper.isIOS()) {
        if (window.webkit && window.webkit.messageHandlers) {
            __zf = window.webkit.messageHandlers
        }
        if (!__zf) return "inject err: __zf not found"
        delete window.webkit.messageHandlers
    } else {
        __zf = window.__zf
        if (!__zf) return "inject err: __zf not found"
        delete window.__zf
    }

    if (__DL >= __LogLvl)
        __Log(__DL, "inject start")

    var injectStartTime = Date.now()

    var _callback_count = 1000,
        _callback_map = {},
        _MESSAGE_TYPE = 'msgType',
        _CALLBACK_ID = 'callbackId',

        _EVENT_NAME = 'eventName',
        _event_map = {}

    //客户端注入时替换
    var _dgtVerifyRandomStr = "${_dgtVerifyRandomStr}"

    var _JSON_MESSAGE = 'jsonMessage',
        _SHA_KEY = 'shaKey',
        _xxyy = _dgtVerifyRandomStr

    if (__DL >= __LogLvl)
        __Log(__DL, "__zf inject VerifyRandomStr:" + _xxyy)

    //防止方法被替换
    var _handleMessageIdentifier = _handleMessageFromZF;
    var _callIdentifier = _call;

    /**
     * H5调用Native方法
     */
    function _sendMessage(msg) {
        var msgStr = JSON.stringify(msg)

        var arr = new Array
        arr[0] = msgStr
        arr[1] = _xxyy
        var str = arr.join("")
        var msgSha = ''

        var shaObj = CryptoJS.SHA1(str)
        msgSha = shaObj.toString()

        var retMap = {}
        retMap[_JSON_MESSAGE] = msgStr
        retMap[_SHA_KEY] = msgSha
        msgStr = JSON.stringify(retMap)

        _doSendMessage(msgStr)
    }

    function _doSendMessage(msgStr) {
        if (__DL >= __LogLvl)
            __Log(__DL, "_doSendMessage , msgStr : " + msgStr)

        if (zfHelper.isIOS()) {
            __zf._sendMessage.postMessage(msgStr)
        } else {
            __zf._sendMessage(msgStr)
        }
    }

    /**
     * Native调用
     */
    function _handleMessageFromZF(msgStr) {
        var curFuncIdentifier = ___zfJSBridge._handleMessageFromZF
        if (curFuncIdentifier !== _handleMessageIdentifier) {
            return '{}'
        }

        var msg = JSON.parse(msgStr)

        var msgWrapStr = window.atob(msg[_JSON_MESSAGE])
        var msgWrap = JSON.parse(msgWrapStr)
        var shaStr = msg[_SHA_KEY]
        var arr = new Array
        arr[0] = msg[_JSON_MESSAGE]
        arr[1] = _xxyy
        var str = arr.join("")
        var msgSha = ''
        var shaObj = CryptoJS.SHA1(str)
        msgSha = shaObj.toString()

        if (__DL >= __LogLvl)
            __Log(__DL, '_handleMessageFromZF , msgWrapStr : ' + msgWrapStr)

        if (msgSha !== shaStr) {
            if (__DL >= __LogLvl)
                __Log(__DL, '_handleMessageFromZF shaStr not match, shaStr : ' + shaStr + ' , str : ' + str + ' , msgSha : ' + msgSha)
            return '{}'
        }

        switch (msgWrap[_MESSAGE_TYPE]) {
            case 'callback': {
                if (typeof msgWrap[_CALLBACK_ID] === 'string' && typeof _callback_map[msgWrap[_CALLBACK_ID]] === 'function') {
                    var callBackRet = _callback_map[msgWrap[_CALLBACK_ID]](msgWrap['params'])
                    delete _callback_map[msgWrap[_CALLBACK_ID]];

                    var hasRet = callBackRet != undefined
                    callBackRet = callBackRet || {}
                    callBackRet['errCode'] = callBackRet['errCode'] || 0

                    var callBackRetStr = JSON.stringify(callBackRet)

                    if (__DL >= __LogLvl && hasRet)
                        __Log(__DL, "_handleMessageFromZF , callBackRetStr : " + callBackRetStr)
                    return callBackRetStr
                }
                return JSON.stringify({
                    'errCode': '404'
                })
            }
            case 'event': {
                if (typeof _event_map[msgWrap[_EVENT_NAME]] === 'function') {
                    var eventRet = _event_map[msgWrap[_EVENT_NAME]](msgWrap['params'])

                    var hasRet = callBackRet != undefined
                    eventRet = eventRet || {}
                    eventRet['errCode'] = eventRet['errCode'] || 0

                    var eventRetStr = JSON.stringify(eventRet)

                    if (__DL >= __LogLvl && hasRet)
                        __Log(__DL, "_handleMessageFromZF , eventRetStr : " + eventRetStr)
                    return eventRetStr
                }

                return JSON.stringify({
                    'errCode': '404'
                })
            }
        }

        return JSON.stringify({
            'errCode': '404'
        })
    }

    /**
    * js-sdk调用bridge方法
    * @param {String} apiName 
    * @param {Any} params 
    * @param {(result)->Unit?} callBack
    */
    function _call(apiName, params, callback) {
        var curFuncIdentifier = ___zfJSBridge.call
        if (curFuncIdentifier !== _callIdentifier) {
            return
        }

        if (!apiName || typeof apiName !== 'string') {
            return
        }
        if (typeof params !== 'object') {
            params = {}
        }

        var callbackID = (_callback_count++).toString()

        if (typeof callback === 'function') {
            _callback_map[callbackID] = callback
        }

        var msgObj = {
            'apiName': apiName,
            'params': params
        }
        msgObj[_MESSAGE_TYPE] = 'call'
        msgObj[_CALLBACK_ID] = callbackID

        try {
            _sendMessage(msgObj)
        } catch (e) {
            __Log(__EL, "_call error", e)
        }
    }

    function _on(eventName, callback) {
        if (__DL >= __LogLvl)
            __Log(__DL, "_on event ,eventName : " + eventName + "  callback : " + callback)

        if (!eventName || typeof eventName !== 'string') {
            return
        }

        if (typeof callback !== 'function') {
            return
        }

        _event_map[eventName] = callback
    }

    var ___zfJSBridge = {
        // public
        call: _call,
        on: _on,
        // log: _log,
        // private
        _hasInit: false
    }

    try {
        Object.defineProperty(___zfJSBridge, '_handleMessageFromZF', {
            value: _handleMessageFromZF,
            writable: false,
            configurable: false
        });
    } catch (e) {
        __Log(__EL, "define _handleMessageFromZF", e)
        return "zfJSBridge init err:" + e.message
    }

    try {
        Object.defineProperty(window, 'zfJSBridge', {
            value: ___zfJSBridge,
            writable: false,
            configurable: false
        })
    } catch (e) {
        __Log(__EL, "define zfJSBridge", e)
        return "inject err:" + e.message
    }

    if (__DL >= __LogLvl)
        __Log(__IL, 'inject exec time', (Date.now() - injectStartTime))

    return "inject success"
}())