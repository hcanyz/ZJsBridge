(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13766879"],{"00d8":function(t,r){(function(){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e={rotl:function(t,r){return t<<r|t>>>32-r},rotr:function(t,r){return t<<32-r|t>>>r},endian:function(t){if(t.constructor==Number)return 16711935&e.rotl(t,8)|4278255360&e.rotl(t,24);for(var r=0;r<t.length;r++)t[r]=e.endian(t[r]);return t},randomBytes:function(t){for(var r=[];t>0;t--)r.push(Math.floor(256*Math.random()));return r},bytesToWords:function(t){for(var r=[],e=0,n=0;e<t.length;e++,n+=8)r[n>>>5]|=t[e]<<24-n%32;return r},wordsToBytes:function(t){for(var r=[],e=0;e<32*t.length;e+=8)r.push(t[e>>>5]>>>24-e%32&255);return r},bytesToHex:function(t){for(var r=[],e=0;e<t.length;e++)r.push((t[e]>>>4).toString(16)),r.push((15&t[e]).toString(16));return r.join("")},hexToBytes:function(t){for(var r=[],e=0;e<t.length;e+=2)r.push(parseInt(t.substr(e,2),16));return r},bytesToBase64:function(t){for(var e=[],n=0;n<t.length;n+=3)for(var o=t[n]<<16|t[n+1]<<8|t[n+2],i=0;i<4;i++)8*n+6*i<=8*t.length?e.push(r.charAt(o>>>6*(3-i)&63)):e.push("=");return e.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],n=0,o=0;n<t.length;o=++n%4)0!=o&&e.push((r.indexOf(t.charAt(n-1))&Math.pow(2,-2*o+8)-1)<<2*o|r.indexOf(t.charAt(n))>>>6-2*o);return e}};t.exports=e})()},"1fb5":function(t,r,e){"use strict";r.byteLength=h,r.toByteArray=l,r.fromByteArray=y;for(var n=[],o=[],i="undefined"!==typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,u=s.length;a<u;++a)n[a]=s[a],o[s.charCodeAt(a)]=a;function f(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");-1===e&&(e=r);var n=e===r?0:4-e%4;return[e,n]}function h(t){var r=f(t),e=r[0],n=r[1];return 3*(e+n)/4-n}function c(t,r,e){return 3*(r+e)/4-e}function l(t){var r,e,n=f(t),s=n[0],a=n[1],u=new i(c(t,s,a)),h=0,l=a>0?s-4:s;for(e=0;e<l;e+=4)r=o[t.charCodeAt(e)]<<18|o[t.charCodeAt(e+1)]<<12|o[t.charCodeAt(e+2)]<<6|o[t.charCodeAt(e+3)],u[h++]=r>>16&255,u[h++]=r>>8&255,u[h++]=255&r;return 2===a&&(r=o[t.charCodeAt(e)]<<2|o[t.charCodeAt(e+1)]>>4,u[h++]=255&r),1===a&&(r=o[t.charCodeAt(e)]<<10|o[t.charCodeAt(e+1)]<<4|o[t.charCodeAt(e+2)]>>2,u[h++]=r>>8&255,u[h++]=255&r),u}function p(t){return n[t>>18&63]+n[t>>12&63]+n[t>>6&63]+n[63&t]}function g(t,r,e){for(var n,o=[],i=r;i<e;i+=3)n=(t[i]<<16&16711680)+(t[i+1]<<8&65280)+(255&t[i+2]),o.push(p(n));return o.join("")}function y(t){for(var r,e=t.length,o=e%3,i=[],s=16383,a=0,u=e-o;a<u;a+=s)i.push(g(t,a,a+s>u?u:a+s));return 1===o?(r=t[e-1],i.push(n[r>>2]+n[r<<4&63]+"==")):2===o&&(r=(t[e-2]<<8)+t[e-1],i.push(n[r>>10]+n[r>>4&63]+n[r<<2&63]+"=")),i.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},"25f0":function(t,r,e){"use strict";var n=e("6eeb"),o=e("825a"),i=e("d039"),s=e("ad6d"),a="toString",u=RegExp.prototype,f=u[a],h=i((function(){return"/a/b"!=f.call({source:"a",flags:"b"})})),c=f.name!=a;(h||c)&&n(RegExp.prototype,a,(function(){var t=o(this),r=String(t.source),e=t.flags,n=String(void 0===e&&t instanceof RegExp&&!("flags"in u)?s.call(t):e);return"/"+r+"/"+n}),{unsafe:!0})},"558f":function(t,r,e){"use strict";e.r(r);e("d3b7"),e("25f0");var n=e("58b7"),o=e.n(n),i="${_dgtVerifyRandomStr}";window.__zf=window.__zf||function(){return{_sendMessage:function(t){var r=JSON.parse(t),e=JSON.parse(r.jsonMessage),n={msgType:"callback",callbackId:e.callbackId};if(o()(r.jsonMessage+i).toString()!=r.shaKey)n.params={errCode:"99999999"};else switch(e.apiName){case"config":n.params={errCode:0};break;case"setTitle":document.title=e.params.title,n.params={errCode:0};break;case"backCloseWindow":history.back(),n.params={errCode:0};break;case"closeWindow":window.close(),n.params={errCode:0};break;case"putLocalStorageKV":localStorage.setItem(e.params.key,e.params.value),n.params={errCode:0};break;case"getLocalStorageKV":n.params={errCode:0,value:localStorage.getItem(e.params.key)};break;case"choosePhotos":if(e.params.enableCount>0){n.params={errCode:0,result:[]};for(var s=0;s<5;s++)n.params.result.push({nativeResourceUrl:"assets/logo.png",name:"logo.png",size:"123"})}else n.params={errCode:1};break;case"uploadPhotos":for(var a in n.params={errCode:0,result:[]},e.params.nativeResourceUrls)n.params.result.push({nativeResourceUrl:e.params.nativeResourceUrls[a],serverResourceUrl:e.params.nativeResourceUrls[a]});break;case"previewPhotos":n.params={errCode:0};break;case"chooseVideos":if(e.params.enableCount>0){n.params={errCode:0,result:[]};for(var u=0;u<5;u++)n.params.result.push({nativeResourceUrl:"assets/logo.png",name:"logo.png",size:123,videoTime:123})}else n.params={errCode:1};break;case"uploadVideos":for(var f in n.params={errCode:0,result:[]},e.params.nativeResourceUrls)n.params.result.push({nativeResourceUrl:e.params.nativeResourceUrls[f],serverResourceUrl:e.params.nativeResourceUrls[f]});break;case"previewVideo":n.params={errCode:0};break;case"chooseFile":if(e.params.enableCount>0){n.params={errCode:0,result:[]};for(var h=0;h<5;h++)n.params.result.push({nativeResourceUrl:"assets/logo.png",name:"logo.png",size:"123"})}else n.params={errCode:1};break;case"uploadFile":for(var c in n.params={errCode:0,result:[]},e.params.nativeResourceUrls)n.params.result.push({nativeResourceUrl:e.params.nativeResourceUrls[c],serverResourceUrl:e.params.nativeResourceUrls[c]});break;case"previewFile":n.params={errCode:0};break;case"chooseLocation":n.params={errCode:0,address:"深圳",latitude:0,longitude:0};break;case"getLocation":n.params={errCode:0,address:"深圳",latitude:0,longitude:0};break;case"previewLocation":n.params={errCode:0};break}var l=window.btoa(JSON.stringify(n));window.zfJSBridge._handleMessageFromZF(JSON.stringify({jsonMessage:l,shaKey:o()(l+i).toString()}))}}}()},"58b7":function(t,r,e){(function(r){(function(){var n=e("00d8"),o=e("9a63").utf8,i=e("9a63").bin,s=function(t){t.constructor==String?t=o.stringToBytes(t):"undefined"!==typeof r&&"function"==typeof r.isBuffer&&r.isBuffer(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||(t=t.toString());var e=n.bytesToWords(t),i=8*t.length,s=[],a=1732584193,u=-271733879,f=-1732584194,h=271733878,c=-1009589776;e[i>>5]|=128<<24-i%32,e[15+(i+64>>>9<<4)]=i;for(var l=0;l<e.length;l+=16){for(var p=a,g=u,y=f,d=h,w=c,v=0;v<80;v++){if(v<16)s[v]=e[l+v];else{var b=s[v-3]^s[v-8]^s[v-14]^s[v-16];s[v]=b<<1|b>>>31}var m=(a<<5|a>>>27)+c+(s[v]>>>0)+(v<20?1518500249+(u&f|~u&h):v<40?1859775393+(u^f^h):v<60?(u&f|u&h|f&h)-1894007588:(u^f^h)-899497514);c=h,h=f,f=u<<30|u>>>2,u=a,a=m}a+=p,u+=g,f+=y,h+=d,c+=w}return[a,u,f,h,c]},a=function(t,r){var e=n.wordsToBytes(s(t));return r&&r.asBytes?e:r&&r.asString?i.bytesToString(e):n.bytesToHex(e)};a._blocksize=16,a._digestsize=20,t.exports=a})()}).call(this,e("b639").Buffer)},9152:function(t,r){r.read=function(t,r,e,n,o){var i,s,a=8*o-n-1,u=(1<<a)-1,f=u>>1,h=-7,c=e?o-1:0,l=e?-1:1,p=t[r+c];for(c+=l,i=p&(1<<-h)-1,p>>=-h,h+=a;h>0;i=256*i+t[r+c],c+=l,h-=8);for(s=i&(1<<-h)-1,i>>=-h,h+=n;h>0;s=256*s+t[r+c],c+=l,h-=8);if(0===i)i=1-f;else{if(i===u)return s?NaN:1/0*(p?-1:1);s+=Math.pow(2,n),i-=f}return(p?-1:1)*s*Math.pow(2,i-n)},r.write=function(t,r,e,n,o,i){var s,a,u,f=8*i-o-1,h=(1<<f)-1,c=h>>1,l=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:i-1,g=n?1:-1,y=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(a=isNaN(r)?1:0,s=h):(s=Math.floor(Math.log(r)/Math.LN2),r*(u=Math.pow(2,-s))<1&&(s--,u*=2),r+=s+c>=1?l/u:l*Math.pow(2,1-c),r*u>=2&&(s++,u/=2),s+c>=h?(a=0,s=h):s+c>=1?(a=(r*u-1)*Math.pow(2,o),s+=c):(a=r*Math.pow(2,c-1)*Math.pow(2,o),s=0));o>=8;t[e+p]=255&a,p+=g,a/=256,o-=8);for(s=s<<o|a,f+=o;f>0;t[e+p]=255&s,p+=g,s/=256,f-=8);t[e+p-g]|=128*y}},"9a63":function(t,r){var e={utf8:{stringToBytes:function(t){return e.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(e.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var r=[],e=0;e<t.length;e++)r.push(255&t.charCodeAt(e));return r},bytesToString:function(t){for(var r=[],e=0;e<t.length;e++)r.push(String.fromCharCode(t[e]));return r.join("")}}};t.exports=e},ad6d:function(t,r,e){"use strict";var n=e("825a");t.exports=function(){var t=n(this),r="";return t.global&&(r+="g"),t.ignoreCase&&(r+="i"),t.multiline&&(r+="m"),t.dotAll&&(r+="s"),t.unicode&&(r+="u"),t.sticky&&(r+="y"),r}},b639:function(t,r,e){"use strict";(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var n=e("1fb5"),o=e("9152"),i=e("e3db");function s(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"===typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(r){return!1}}function a(){return f.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function u(t,r){if(a()<r)throw new RangeError("Invalid typed array length");return f.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(r),t.__proto__=f.prototype):(null===t&&(t=new f(r)),t.length=r),t}function f(t,r,e){if(!f.TYPED_ARRAY_SUPPORT&&!(this instanceof f))return new f(t,r,e);if("number"===typeof t){if("string"===typeof r)throw new Error("If encoding is specified then the first argument must be a string");return p(this,t)}return h(this,t,r,e)}function h(t,r,e,n){if("number"===typeof r)throw new TypeError('"value" argument must not be a number');return"undefined"!==typeof ArrayBuffer&&r instanceof ArrayBuffer?d(t,r,e,n):"string"===typeof r?g(t,r,e):w(t,r)}function c(t){if("number"!==typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function l(t,r,e,n){return c(r),r<=0?u(t,r):void 0!==e?"string"===typeof n?u(t,r).fill(e,n):u(t,r).fill(e):u(t,r)}function p(t,r){if(c(r),t=u(t,r<0?0:0|v(r)),!f.TYPED_ARRAY_SUPPORT)for(var e=0;e<r;++e)t[e]=0;return t}function g(t,r,e){if("string"===typeof e&&""!==e||(e="utf8"),!f.isEncoding(e))throw new TypeError('"encoding" must be a valid string encoding');var n=0|m(r,e);t=u(t,n);var o=t.write(r,e);return o!==n&&(t=t.slice(0,o)),t}function y(t,r){var e=r.length<0?0:0|v(r.length);t=u(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}function d(t,r,e,n){if(r.byteLength,e<0||r.byteLength<e)throw new RangeError("'offset' is out of bounds");if(r.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");return r=void 0===e&&void 0===n?new Uint8Array(r):void 0===n?new Uint8Array(r,e):new Uint8Array(r,e,n),f.TYPED_ARRAY_SUPPORT?(t=r,t.__proto__=f.prototype):t=y(t,r),t}function w(t,r){if(f.isBuffer(r)){var e=0|v(r.length);return t=u(t,e),0===t.length?t:(r.copy(t,0,0,e),t)}if(r){if("undefined"!==typeof ArrayBuffer&&r.buffer instanceof ArrayBuffer||"length"in r)return"number"!==typeof r.length||rt(r.length)?u(t,0):y(t,r);if("Buffer"===r.type&&i(r.data))return y(t,r.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function v(t){if(t>=a())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+a().toString(16)+" bytes");return 0|t}function b(t){return+t!=t&&(t=0),f.alloc(+t)}function m(t,r){if(f.isBuffer(t))return t.length;if("undefined"!==typeof ArrayBuffer&&"function"===typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!==typeof t&&(t=""+t);var e=t.length;if(0===e)return 0;for(var n=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":case void 0:return q(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return $(t).length;default:if(n)return q(t).length;r=(""+r).toLowerCase(),n=!0}}function A(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if(e>>>=0,r>>>=0,e<=r)return"";t||(t="utf8");while(1)switch(t){case"hex":return x(this,r,e);case"utf8":case"utf-8":return k(this,r,e);case"ascii":return O(this,r,e);case"latin1":case"binary":return L(this,r,e);case"base64":return I(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return D(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function R(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function E(t,r,e,n,o){if(0===t.length)return-1;if("string"===typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,isNaN(e)&&(e=o?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(o)return-1;e=t.length-1}else if(e<0){if(!o)return-1;e=0}if("string"===typeof r&&(r=f.from(r,n)),f.isBuffer(r))return 0===r.length?-1:_(t,r,e,n,o);if("number"===typeof r)return r&=255,f.TYPED_ARRAY_SUPPORT&&"function"===typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):_(t,[r],e,n,o);throw new TypeError("val must be string, number or Buffer")}function _(t,r,e,n,o){var i,s=1,a=t.length,u=r.length;if(void 0!==n&&(n=String(n).toLowerCase(),"ucs2"===n||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;s=2,a/=2,u/=2,e/=2}function f(t,r){return 1===s?t[r]:t.readUInt16BE(r*s)}if(o){var h=-1;for(i=e;i<a;i++)if(f(t,i)===f(r,-1===h?0:i-h)){if(-1===h&&(h=i),i-h+1===u)return h*s}else-1!==h&&(i-=i-h),h=-1}else for(e+u>a&&(e=a-u),i=e;i>=0;i--){for(var c=!0,l=0;l<u;l++)if(f(t,i+l)!==f(r,l)){c=!1;break}if(c)return i}return-1}function T(t,r,e,n){e=Number(e)||0;var o=t.length-e;n?(n=Number(n),n>o&&(n=o)):n=o;var i=r.length;if(i%2!==0)throw new TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var s=0;s<n;++s){var a=parseInt(r.substr(2*s,2),16);if(isNaN(a))return s;t[e+s]=a}return s}function B(t,r,e,n){return tt(q(r,t.length-e),t,e,n)}function S(t,r,e,n){return tt(G(r),t,e,n)}function U(t,r,e,n){return S(t,r,e,n)}function P(t,r,e,n){return tt($(r),t,e,n)}function C(t,r,e,n){return tt(Q(r,t.length-e),t,e,n)}function I(t,r,e){return 0===r&&e===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(r,e))}function k(t,r,e){e=Math.min(t.length,e);var n=[],o=r;while(o<e){var i,s,a,u,f=t[o],h=null,c=f>239?4:f>223?3:f>191?2:1;if(o+c<=e)switch(c){case 1:f<128&&(h=f);break;case 2:i=t[o+1],128===(192&i)&&(u=(31&f)<<6|63&i,u>127&&(h=u));break;case 3:i=t[o+1],s=t[o+2],128===(192&i)&&128===(192&s)&&(u=(15&f)<<12|(63&i)<<6|63&s,u>2047&&(u<55296||u>57343)&&(h=u));break;case 4:i=t[o+1],s=t[o+2],a=t[o+3],128===(192&i)&&128===(192&s)&&128===(192&a)&&(u=(15&f)<<18|(63&i)<<12|(63&s)<<6|63&a,u>65535&&u<1114112&&(h=u))}null===h?(h=65533,c=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),o+=c}return M(n)}r.Buffer=f,r.SlowBuffer=b,r.INSPECT_MAX_BYTES=50,f.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:s(),r.kMaxLength=a(),f.poolSize=8192,f._augment=function(t){return t.__proto__=f.prototype,t},f.from=function(t,r,e){return h(null,t,r,e)},f.TYPED_ARRAY_SUPPORT&&(f.prototype.__proto__=Uint8Array.prototype,f.__proto__=Uint8Array,"undefined"!==typeof Symbol&&Symbol.species&&f[Symbol.species]===f&&Object.defineProperty(f,Symbol.species,{value:null,configurable:!0})),f.alloc=function(t,r,e){return l(null,t,r,e)},f.allocUnsafe=function(t){return p(null,t)},f.allocUnsafeSlow=function(t){return p(null,t)},f.isBuffer=function(t){return!(null==t||!t._isBuffer)},f.compare=function(t,r){if(!f.isBuffer(t)||!f.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var e=t.length,n=r.length,o=0,i=Math.min(e,n);o<i;++o)if(t[o]!==r[o]){e=t[o],n=r[o];break}return e<n?-1:n<e?1:0},f.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(t,r){if(!i(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return f.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=f.allocUnsafe(r),o=0;for(e=0;e<t.length;++e){var s=t[e];if(!f.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(n,o),o+=s.length}return n},f.byteLength=m,f.prototype._isBuffer=!0,f.prototype.swap16=function(){var t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)R(this,r,r+1);return this},f.prototype.swap32=function(){var t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)R(this,r,r+3),R(this,r+1,r+2);return this},f.prototype.swap64=function(){var t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)R(this,r,r+7),R(this,r+1,r+6),R(this,r+2,r+5),R(this,r+3,r+4);return this},f.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?k(this,0,t):A.apply(this,arguments)},f.prototype.equals=function(t){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===f.compare(this,t)},f.prototype.inspect=function(){var t="",e=r.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},f.prototype.compare=function(t,r,e,n,o){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),r<0||e>t.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&r>=e)return 0;if(n>=o)return-1;if(r>=e)return 1;if(r>>>=0,e>>>=0,n>>>=0,o>>>=0,this===t)return 0;for(var i=o-n,s=e-r,a=Math.min(i,s),u=this.slice(n,o),h=t.slice(r,e),c=0;c<a;++c)if(u[c]!==h[c]){i=u[c],s=h[c];break}return i<s?-1:s<i?1:0},f.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},f.prototype.indexOf=function(t,r,e){return E(this,t,r,e,!0)},f.prototype.lastIndexOf=function(t,r,e){return E(this,t,r,e,!1)},f.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"===typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r|=0,isFinite(e)?(e|=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var o=this.length-r;if((void 0===e||e>o)&&(e=o),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return T(this,t,r,e);case"utf8":case"utf-8":return B(this,t,r,e);case"ascii":return S(this,t,r,e);case"latin1":case"binary":return U(this,t,r,e);case"base64":return P(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return C(this,t,r,e);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var Y=4096;function M(t){var r=t.length;if(r<=Y)return String.fromCharCode.apply(String,t);var e="",n=0;while(n<r)e+=String.fromCharCode.apply(String,t.slice(n,n+=Y));return e}function O(t,r,e){var n="";e=Math.min(t.length,e);for(var o=r;o<e;++o)n+=String.fromCharCode(127&t[o]);return n}function L(t,r,e){var n="";e=Math.min(t.length,e);for(var o=r;o<e;++o)n+=String.fromCharCode(t[o]);return n}function x(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var o="",i=r;i<e;++i)o+=X(t[i]);return o}function D(t,r,e){for(var n=t.slice(r,e),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}function N(t,r,e){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function z(t,r,e,n,o,i){if(!f.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>o||r<i)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function j(t,r,e,n){r<0&&(r=65535+r+1);for(var o=0,i=Math.min(t.length-e,2);o<i;++o)t[e+o]=(r&255<<8*(n?o:1-o))>>>8*(n?o:1-o)}function F(t,r,e,n){r<0&&(r=4294967295+r+1);for(var o=0,i=Math.min(t.length-e,4);o<i;++o)t[e+o]=r>>>8*(n?o:3-o)&255}function J(t,r,e,n,o,i){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function V(t,r,e,n,i){return i||J(t,r,e,4,34028234663852886e22,-34028234663852886e22),o.write(t,r,e,n,23,4),e+4}function K(t,r,e,n,i){return i||J(t,r,e,8,17976931348623157e292,-17976931348623157e292),o.write(t,r,e,n,52,8),e+8}f.prototype.slice=function(t,r){var e,n=this.length;if(t=~~t,r=void 0===r?n:~~r,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),r<0?(r+=n,r<0&&(r=0)):r>n&&(r=n),r<t&&(r=t),f.TYPED_ARRAY_SUPPORT)e=this.subarray(t,r),e.__proto__=f.prototype;else{var o=r-t;e=new f(o,void 0);for(var i=0;i<o;++i)e[i]=this[i+t]}return e},f.prototype.readUIntLE=function(t,r,e){t|=0,r|=0,e||N(t,r,this.length);var n=this[t],o=1,i=0;while(++i<r&&(o*=256))n+=this[t+i]*o;return n},f.prototype.readUIntBE=function(t,r,e){t|=0,r|=0,e||N(t,r,this.length);var n=this[t+--r],o=1;while(r>0&&(o*=256))n+=this[t+--r]*o;return n},f.prototype.readUInt8=function(t,r){return r||N(t,1,this.length),this[t]},f.prototype.readUInt16LE=function(t,r){return r||N(t,2,this.length),this[t]|this[t+1]<<8},f.prototype.readUInt16BE=function(t,r){return r||N(t,2,this.length),this[t]<<8|this[t+1]},f.prototype.readUInt32LE=function(t,r){return r||N(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},f.prototype.readUInt32BE=function(t,r){return r||N(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},f.prototype.readIntLE=function(t,r,e){t|=0,r|=0,e||N(t,r,this.length);var n=this[t],o=1,i=0;while(++i<r&&(o*=256))n+=this[t+i]*o;return o*=128,n>=o&&(n-=Math.pow(2,8*r)),n},f.prototype.readIntBE=function(t,r,e){t|=0,r|=0,e||N(t,r,this.length);var n=r,o=1,i=this[t+--n];while(n>0&&(o*=256))i+=this[t+--n]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*r)),i},f.prototype.readInt8=function(t,r){return r||N(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},f.prototype.readInt16LE=function(t,r){r||N(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt16BE=function(t,r){r||N(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt32LE=function(t,r){return r||N(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},f.prototype.readInt32BE=function(t,r){return r||N(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},f.prototype.readFloatLE=function(t,r){return r||N(t,4,this.length),o.read(this,t,!0,23,4)},f.prototype.readFloatBE=function(t,r){return r||N(t,4,this.length),o.read(this,t,!1,23,4)},f.prototype.readDoubleLE=function(t,r){return r||N(t,8,this.length),o.read(this,t,!0,52,8)},f.prototype.readDoubleBE=function(t,r){return r||N(t,8,this.length),o.read(this,t,!1,52,8)},f.prototype.writeUIntLE=function(t,r,e,n){if(t=+t,r|=0,e|=0,!n){var o=Math.pow(2,8*e)-1;z(this,t,r,e,o,0)}var i=1,s=0;this[r]=255&t;while(++s<e&&(i*=256))this[r+s]=t/i&255;return r+e},f.prototype.writeUIntBE=function(t,r,e,n){if(t=+t,r|=0,e|=0,!n){var o=Math.pow(2,8*e)-1;z(this,t,r,e,o,0)}var i=e-1,s=1;this[r+i]=255&t;while(--i>=0&&(s*=256))this[r+i]=t/s&255;return r+e},f.prototype.writeUInt8=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,1,255,0),f.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=255&t,r+1},f.prototype.writeUInt16LE=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,2,65535,0),f.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):j(this,t,r,!0),r+2},f.prototype.writeUInt16BE=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,2,65535,0),f.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):j(this,t,r,!1),r+2},f.prototype.writeUInt32LE=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,4,4294967295,0),f.TYPED_ARRAY_SUPPORT?(this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t):F(this,t,r,!0),r+4},f.prototype.writeUInt32BE=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,4,4294967295,0),f.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):F(this,t,r,!1),r+4},f.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r|=0,!n){var o=Math.pow(2,8*e-1);z(this,t,r,e,o-1,-o)}var i=0,s=1,a=0;this[r]=255&t;while(++i<e&&(s*=256))t<0&&0===a&&0!==this[r+i-1]&&(a=1),this[r+i]=(t/s>>0)-a&255;return r+e},f.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r|=0,!n){var o=Math.pow(2,8*e-1);z(this,t,r,e,o-1,-o)}var i=e-1,s=1,a=0;this[r+i]=255&t;while(--i>=0&&(s*=256))t<0&&0===a&&0!==this[r+i+1]&&(a=1),this[r+i]=(t/s>>0)-a&255;return r+e},f.prototype.writeInt8=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,1,127,-128),f.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[r]=255&t,r+1},f.prototype.writeInt16LE=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,2,32767,-32768),f.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8):j(this,t,r,!0),r+2},f.prototype.writeInt16BE=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,2,32767,-32768),f.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=255&t):j(this,t,r,!1),r+2},f.prototype.writeInt32LE=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,4,2147483647,-2147483648),f.TYPED_ARRAY_SUPPORT?(this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24):F(this,t,r,!0),r+4},f.prototype.writeInt32BE=function(t,r,e){return t=+t,r|=0,e||z(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),f.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t):F(this,t,r,!1),r+4},f.prototype.writeFloatLE=function(t,r,e){return V(this,t,r,!0,e)},f.prototype.writeFloatBE=function(t,r,e){return V(this,t,r,!1,e)},f.prototype.writeDoubleLE=function(t,r,e){return K(this,t,r,!0,e)},f.prototype.writeDoubleBE=function(t,r,e){return K(this,t,r,!1,e)},f.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var o,i=n-e;if(this===t&&e<r&&r<n)for(o=i-1;o>=0;--o)t[o+r]=this[o+e];else if(i<1e3||!f.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)t[o+r]=this[o+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+i),r);return i},f.prototype.fill=function(t,r,e,n){if("string"===typeof t){if("string"===typeof r?(n=r,r=0,e=this.length):"string"===typeof e&&(n=e,e=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==n&&"string"!==typeof n)throw new TypeError("encoding must be a string");if("string"===typeof n&&!f.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"===typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var i;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"===typeof t)for(i=r;i<e;++i)this[i]=t;else{var s=f.isBuffer(t)?t:q(new f(t,n).toString()),a=s.length;for(i=0;i<e-r;++i)this[i+r]=s[i%a]}return this};var W=/[^+\/0-9A-Za-z-_]/g;function Z(t){if(t=H(t).replace(W,""),t.length<2)return"";while(t.length%4!==0)t+="=";return t}function H(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function X(t){return t<16?"0"+t.toString(16):t.toString(16)}function q(t,r){var e;r=r||1/0;for(var n=t.length,o=null,i=[],s=0;s<n;++s){if(e=t.charCodeAt(s),e>55295&&e<57344){if(!o){if(e>56319){(r-=3)>-1&&i.push(239,191,189);continue}if(s+1===n){(r-=3)>-1&&i.push(239,191,189);continue}o=e;continue}if(e<56320){(r-=3)>-1&&i.push(239,191,189),o=e;continue}e=65536+(o-55296<<10|e-56320)}else o&&(r-=3)>-1&&i.push(239,191,189);if(o=null,e<128){if((r-=1)<0)break;i.push(e)}else if(e<2048){if((r-=2)<0)break;i.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;i.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;i.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return i}function G(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}function Q(t,r){for(var e,n,o,i=[],s=0;s<t.length;++s){if((r-=2)<0)break;e=t.charCodeAt(s),n=e>>8,o=e%256,i.push(o),i.push(n)}return i}function $(t){return n.toByteArray(Z(t))}function tt(t,r,e,n){for(var o=0;o<n;++o){if(o+e>=r.length||o>=t.length)break;r[o+e]=t[o]}return o}function rt(t){return t!==t}}).call(this,e("c8ba"))},e3db:function(t,r){var e={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==e.call(t)}}}]);
//# sourceMappingURL=chunk-13766879.5dcb9fe0.js.map