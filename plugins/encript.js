const crypto = require('crypto');
const keyDefault = "9vApxLk5G3PAsJrM";
const ivDefault = "FnJL7EDzjqWjcaY9";
export const aesEncrypt = function (data, key = keyDefault, iv = ivDefault) {
    try {
        const dataTemp = typeof data === "object" ? JSON.stringify({ ...data }) : data;
        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);   // 采用aes192加密方式
        var crypted = cipher.update(dataTemp, 'utf8', 'hex');     // 加密
        crypted += cipher.final('hex');
        return {
            c: crypted
        };
    } catch (e) {
    }

};

export const aesDecrypt = function ({ c } = {}, key = keyDefault, iv = ivDefault) {
    if(!c) return;
    try {
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);   // 解密 aes192
        var decrypted = decipher.update(c, 'hex', 'utf8');    //解密
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    } catch (e) {
    }
}