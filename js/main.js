"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var axios_1 = require("axios");
/**
 * 有道翻译
 * @author 欧阳鹏
 * @date 2023-04-11
 */
var YouDaoJS = /** @class */ (function () {
    function YouDaoJS() {
    }
    /**
     * 获取翻译结果
     * @param str 待翻译文本
     * @param from 来源语言，`LangInfo.youdaoLang` 的下标
     * @param to 目标语言下标，`LangInfo.youdaoLang` 的下标
     */
    YouDaoJS.prototype.getResult = function (str, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, data, api, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = new Date().getTime();
                        data = {
                            i: str,
                            from: LangInfo.youdaoLang[from],
                            to: LangInfo.youdaoLang[to],
                            dictResult: true,
                            keyid: 'webfanyi',
                            sign: this.getSign(timestamp),
                            client: 'fanyideskweb',
                            product: 'webfanyi',
                            appVersion: '1.0.0',
                            vendor: 'web',
                            pointParam: 'client,mysticTime,product',
                            mysticTime: timestamp,
                            keyfrom: 'fanyi.web'
                        };
                        api = 'https://dict.youdao.com/webtranslate';
                        result = null;
                        return [4 /*yield*/, axios_1.default.post(api, data, {
                                headers: {
                                    'Referer': 'github@oyps',
                                    'Cookie': 'OUTFOX_SEARCH_USER_ID=0@0.0.0.0',
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                            }).then(function (value) {
                                result = _this.decode(value.data);
                            }).catch(function (reason) {
                                result = reason;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 解密字符串
     * @param data 待解密字符串
     */
    YouDaoJS.prototype.decode = function (data) {
        var key = (0, crypto_1.createHash)('md5').update('ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl').digest();
        var iv = (0, crypto_1.createHash)('md5').update('ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4').digest();
        var decipher = (0, crypto_1.createDecipheriv)('aes-128-cbc', key, iv);
        var decrypted = decipher.update(data, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    };
    YouDaoJS.prototype.getSign = function (timestamp) {
        var str = "client=fanyideskweb&mysticTime=".concat(timestamp, "&product=webfanyi&key=fsdsogkndfokasodnaso");
        return (0, crypto_1.createHash)('md5').update(str).digest('hex');
    };
    return YouDaoJS;
}());
exports.default = YouDaoJS;
/** 语言信息 */
var LangInfo = /** @class */ (function () {
    function LangInfo() {
    }
    /** 语言列表，下标即为语言代码 */
    LangInfo.language = [
        '自动识别', '中文', '英语', '韩语', '日语', '法语',
        '俄语', '西班牙语', '葡萄牙语', '印地语', '阿拉伯语',
        '丹麦语', '德语', '希腊语', '芬兰语', '意大利语',
        '马来语', '越南语', '印尼语', '荷兰语', '泰语'
    ];
    /** 语言组合，二维数组，数组项为 `[from, to]` */
    LangInfo.group = [
        [0, 0], [1, 2], [2, 1], [1, 3], [3, 1],
        [1, 4], [4, 1], [1, 5], [5, 1], [1, 6],
        [6, 1], [1, 7], [7, 1], [1, 8], [8, 1],
        [1, 9], [1, 10], [10, 1], [1, 12], [12, 1],
        [1, 15], [15, 1], [1, 17], [17, 1], [1, 18],
        [18, 1], [1, 19], [19, 1], [1, 20], [20, 1]
    ];
    /** 有道翻译的语言代码，下标对应 `language` */
    LangInfo.youdaoLang = [
        'AUTO', 'zh-CHS', 'en', 'ko', 'ja',
        'fr', 'ru', 'es', 'pt', 'hi', 'ar',
        'da', 'de', 'el', 'fi', 'it', 'ms',
        'vi', 'id', 'nl', 'th'
    ];
    return LangInfo;
}());
