export const ceasarEncrypt = (text, key) => {
    const shift = parseInt(key, 10) || 0;
    return text.split('').map(char => {
        if (/[a-z]/.test(char)) {
            return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
        } else if (/[A-Z]/.test(char)) {
            return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
        } else {
            return char;
        }
    }).join('');
};

export const ceasarDecrypt = (text, key) => {
    return ceasarEncrypt(text, 26 - (parseInt(key, 10) % 26));
};