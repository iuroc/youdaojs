import { createHash, createDecipheriv } from 'crypto'
import axios from 'axios'

/**
 * 有道翻译
 * @author 欧阳鹏
 * @date 2023-04-11
 */
export default class YouDaoFanYi {
    /**
     * 
     * @param str 代翻译文本
     * @param from 来源语言，`LangInfo.youdaoLang` 的下标
     * @param to 目标语言下标，`LangInfo.youdaoLang` 的下标
     */
    public async getResult(str: string, from: number = 0, to: number = 0) {
        let timestamp = new Date().getTime()
        const data = {
            i: '你好',
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
        }
        let api = 'https://dict.youdao.com/webtranslate'
        let result: any = null
        await axios.post(api, data, {
            headers: {
                'Referer': 'github@oyps',
                'Cookie': 'OUTFOX_SEARCH_USER_ID=0@0.0.0.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then((value) => {
            result = this.decode(value.data)
        }).catch((reason) => {
            result = reason
        })
        return result
    }

    /**
     * 解密字符串
     * @param data 待解密字符串
     */
    public decode(data: string) {
        const key = createHash('md5').update('ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl').digest()
        const iv = createHash('md5').update('ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4').digest()
        const decipher = createDecipheriv('aes-128-cbc', key, iv)
        let decrypted = decipher.update(data, 'base64', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    }

    public getSign(timestamp: number): string {
        let str = `client=fanyideskweb&mysticTime=${timestamp}&product=webfanyi&key=fsdsogkndfokasodnaso`
        return createHash('md5').update(str).digest('hex')
    }
}

/** 语言信息 */
class LangInfo {
    /** 语言列表，下标即为语言代码 */
    public static language = [
        '自动识别', '中文', '英语', '韩语', '日语', '法语',
        '俄语', '西班牙语', '葡萄牙语', '印地语', '阿拉伯语',
        '丹麦语', '德语', '希腊语', '芬兰语', '意大利语',
        '马来语', '越南语', '印尼语', '荷兰语', '泰语'
    ]
    /** 语言组合，二维数组，数组项为 `[from, to]` */
    public static group = [
        [0, 0], [1, 2], [2, 1], [1, 3], [3, 1],
        [1, 4], [4, 1], [1, 5], [5, 1], [1, 6],
        [6, 1], [1, 7], [7, 1], [1, 8], [8, 1],
        [1, 9], [1, 10], [10, 1], [1, 12], [12, 1],
        [1, 15], [15, 1], [1, 17], [17, 1], [1, 18],
        [18, 1], [1, 19], [19, 1], [1, 20], [20, 1]
    ]
    /** 有道翻译的语言代码，下标对应 `language` */
    public static youdaoLang = [
        'AUTO', 'zh-CHS', 'en', 'ko', 'ja',
        'fr', 'ru', 'es', 'pt', 'hi', 'ar',
        'da', 'de', 'el', 'fi', 'it', 'ms',
        'vi', 'id', 'nl', 'th'
    ]
}