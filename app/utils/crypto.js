
import CryptoJS from 'crypto-js';

/**
 * 加解密方式enum
 */
export const CryptoType = {
    CryptoType_DES: 0,    //默认加密方式
    CryptoType_AES: 1,
}

/**
 * 加解密处理类
 * 
 * @export
 * @class Crypto
 */
export default class Crypto {

    /**
     * 字符串MD5编码
     * 
     * @static
     * @memberof Crypto
     */
    static MD5(text) {
        let encrypted = CryptoJS.MD5(text);
        return encrypted.toString();
    }

    /**
     * 加密方法
     * 
     * @static
     * @param {any} key 
     * @param {CryptoType} CryptoType 
     * @param {any} text 
     * @returns 
     * @memberof Crypto
     */
    static Encrypt(key, cryptoTypeType = CryptoType.CryptoType_DES, text) {
        let keyHex = CryptoJS.enc.Utf8.parse(key);
        if (cryptoType == CryptoType.CryptoType_AES) {
            let encrypted = CryptoJS.AES.encrypt(text.toString(), keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        }
        else {//App的DES加密
            let encrypted = CryptoJS.DES.encrypt(text, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.ciphertext.toString();
        }
    }

    /**
     * 解密方法
     * 
     * @static
     * @param {any} key 
     * @param {CryptoType} cryptoType 
     * @param {any} text 
     * @memberof Crypto
     */
    static Decrypt(key, cryptoType = CryptoType.CryptoType_DES, text) {
        let keyHex = CryptoJS.enc.Utf8.parse(key);
        if (cryptoType == CryptoType.CryptoType_AES) {
            let decrypted = CryptoJS.AES.decrypt(text.toString(), keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
        else {//App的DES解密
            let decrypted = CryptoJS.DES.decrypt({
                ciphertext: CryptoJS.enc.Base64.parse(text)
            }, keyHex, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
    }

}
