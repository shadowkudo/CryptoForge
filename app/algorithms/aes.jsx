import CryptoJS from 'crypto-js';

export const aesEncrypt = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
};

export const aesDecrypt = (cipher, key) => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipher, key);
        return bytes.toString(CryptoJS.enc.Utf8) || 'Invalid key or corrupted data.';
    } catch (err) {
        return 'Decryption error.';
    }
};