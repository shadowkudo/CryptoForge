import CryptoJS from 'crypto-js';

export const desEncrypt = (msg, key) => {
    return CryptoJS.DES.encrypt(msg, key).toString();
}
export const desDecrypt = (cipher, key) => {
    try {
        const bytes = CryptoJS.DES.decrypt(cipher, key);
        return bytes.toString(CryptoJS.enc.Utf8) || 'Invalid key or corrupted data.';
    } catch (err) {
        return 'Decryption error.';
    }
}