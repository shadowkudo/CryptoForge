export const vigenereEncrypt = (text, key) => {
    let result = '', keyIndex = 0;
    key = key.toLowerCase();
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (/[a-zA-Z]/.test(c)) {
            const base = c === c.toLowerCase() ? 97 : 65;
            const shift = key.charCodeAt(keyIndex % key.length) - 97;
            result += String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
            keyIndex++;
        } else {
            result += c;
        }
    }
    return result;
};

export const vigenereDecrypt = (text, key) => {
    let result = '', keyIndex = 0;
    key = key.toLowerCase();
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (/[a-zA-Z]/.test(c)) {
            const base = c === c.toLowerCase() ? 97 : 65;
            const shift = key.charCodeAt(keyIndex % key.length) - 97;
            result += String.fromCharCode((c.charCodeAt(0) - base - shift + 26) % 26 + base);
            keyIndex++;
        } else {
            result += c;
        }
    }
    return result;
};