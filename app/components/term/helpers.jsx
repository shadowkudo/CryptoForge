export const PROMPT = '$> ';

export const darkTheme = {
    background: '#000000',
    foreground: '#ffffff',
    cursor: '#ffffff',
    selectionBackground: '#555555',
    black: '#000000',
    red: '#ff5555',
    green: '#50fa7b',
    yellow: '#f1fa8c',
    blue: '#bd93f9',
    magenta: '#ff79c6',
    cyan: '#8be9fd',
    white: '#bbbbbb',
    brightBlack: '#555555',
    brightWhite: '#ffffff',
};

export const lightTheme = {
    background: '#ffffff',
    foreground: '#000000',
    cursor: '#000000',
    selectionBackground: '#aaaaaa',
    black: '#000000',
    red: '#ff5555',
    green: '#50fa7b',
    yellow: '#f1fa8c',
    blue: '#bd93f9',
    magenta: '#ff79c6',
    cyan: '#8be9fd',
    white: '#444444',
    brightBlack: '#aaaaaa',
    brightWhite: '#000000',
};

export const maskKeyInCommand = (cmd) => {
    return cmd.replace(/(-k\s+)(\S+)/, (_, flag, val) => { // format key is -k <key>
        return flag + '*'.repeat(Math.min(val.length, 6));
    });
};