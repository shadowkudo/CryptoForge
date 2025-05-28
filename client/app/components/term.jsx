import {useEffect, useRef, useState} from 'react';
import {Terminal} from "@xterm/xterm"; // comment for prod
/*import xtermPkg from "@xterm/xterm"; // comment for dev
const { Terminal } = xtermPkg;*/
import {FitAddon} from "@xterm/addon-fit/src/FitAddon.js";
import {
    ArrowUpOutlined,
    CopyOutlined,
    DownloadOutlined, RestOutlined,
    UploadOutlined
} from '@ant-design/icons';

const PROMPT = '$> ';

// currently here for tests, will be in backend later
const ceasarEncrypt = (text, key) => {
    const shift = parseInt(key, 10) || 0;
    return text
        .split('')
        .map(char => {
            if (/[a-z]/.test(char)) {
                return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
            } else if (/[A-Z]/.test(char)) {
                return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
            } else {
                return char;
            }
        })
        .join('');
};

const ceasarDecrypt = (text, key) => ceasarEncrypt(text, 26 - (parseInt(key, 10) % 26));

const vigenereEncrypt = (text, key) => {
    let result = '';
    key = key.toLowerCase();
    let keyIndex = 0;
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

const vigenereDecrypt = (text, key) => {
    let result = '';
    key = key.toLowerCase();
    let keyIndex = 0;
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

const darkTheme = {
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

const lightTheme = {
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

const maskKeyInCommand = (cmd) => {
    return cmd.replace(/(-k\s+)(\S+)/, (_, flag, val) => { // format key is -k <key>
        return flag + '*'.repeat(Math.min(val.length, 6));
    });
};

export function Term({ theme }) {
    const terminalRef = useRef(null);
    const termRef = useRef(null); // holds terminal instance
    const inputBuffer = useRef('');
    const commandHistory = useRef([]);
    const historyIndex = useRef(-1);
    const cursorPos = useRef(0); // Position of cursor in inputBuffer
    const [inputText, setInputText] = useState(''); // Input state for the text area
    const inputTextRef = useRef('');
    const [outputText, setOutputText] = useState(''); // Output state for the text area
    const algorithms = ['ceasar', 'vigenere']; // for now hard coded but should be from backend later
    const resolvedTheme = theme === "dark";

    const replaceInput = (newInput) => {
        inputBuffer.current = newInput;
        cursorPos.current = newInput.length;
        rewriteInput();
    };

    const rewriteInput = () => {
        const term = termRef.current;

        // Mask key before displaying
        const displayInput = maskKeyInCommand(inputBuffer.current);

        // Clear line and write prompt + masked input
        const clearSeq = '\x1b[2K\r' + PROMPT;
        term.write(clearSeq + displayInput);

        // Move cursor to correct position (relative to actual input length)
        const targetOffset = displayInput.length - cursorPos.current;
        if (targetOffset > 0) {
            term.write('\x1b[' + targetOffset + 'D'); // move left
        }
    };

    const handleCommand = (command) => {
        const term = termRef.current;
        const write = (text) => term.writeln(text);

        const cleanCmd = command.trim();

        if (cleanCmd === 'help') {
            const helpLines = [
                'Available commands:',
                '  clear                        Clear the terminal',
                '  help                         Show this help',
                '  list                         List supported algorithms',
                '  encrypt -a <algo> -k <key>   Encrypt input to output',
                '  decrypt -a <algo> -k <key>   Decrypt input to output',
            ];

            helpLines.forEach(line => term.writeln(line));
        } else if (cleanCmd === 'clear') {
            term.clear();
        } else if (cleanCmd === 'list') {
            write('Supported algorithms: ' + algorithms.join(', '));
        } else if (cleanCmd.startsWith('encrypt') || cleanCmd.startsWith('decrypt')) {
            if (!inputTextRef.current.trim()) {
                write('Warning: No input text provided!');
                return;
            }

            const match = cleanCmd.match(/-a\s+(\w+)\s+-k\s+(\w+)/);
            if (!match) {
                write(`Usage: ${cleanCmd.startsWith('encrypt') ? 'encrypt' : 'decrypt'} -a <algo> -k <key>`);
                return;
            }
            const algo = match[1];
            const key = match[2];
            const message = inputTextRef.current;

            let result;
            if (cleanCmd.startsWith('encrypt')) {
                if (algo === 'ceasar') result = ceasarEncrypt(message, key);
                else if (algo === 'vigenere') result = vigenereEncrypt(message, key);
                else {
                    write(`Unknown algorithm: ${algo}`);
                    return;
                }

                setOutputText(result);
                write(`Cipher done.`);
            } else if (cleanCmd.startsWith('decrypt')) {
                if (algo === 'ceasar') result = ceasarDecrypt(message, key);
                else if (algo === 'vigenere') result = vigenereDecrypt(message, key);
                else {
                    write(`Unknown algorithm: ${algo}`);
                    return;
                }

                setOutputText(result);
                write(`Decipher done.`);
            }
        } else {
            write(`Unknown command: ${command}`);
        }
    };

    const downloadOutput = () => {
        //TODO
    };

    const copyRaw = () => {
        //TODO
    };

    const outputToInput = () => {
        //TODO
    };

    const uploadInput = () => {
        //TODO
    };

    const cleanTextarea = () => {
        //TODO
    };


    useEffect(() => {
        // initialize terminal once
        const term = new Terminal({
            cursorBlink: true,
            theme: resolvedTheme ? darkTheme : lightTheme,
        });
        termRef.current = term;

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        const resizeListener = () => {
            fitAddon.fit();
        };
        window.addEventListener("resize", resizeListener);

        term.onData((data) => {
            const code = data.charCodeAt(0);

            if (code === 13) {
                // Enter
                term.write('\r\n');
                const cmd = inputBuffer.current.trim();
                if (cmd) {
                    commandHistory.current.push(cmd);
                    historyIndex.current = commandHistory.current.length;
                }
                handleCommand(cmd);
                inputBuffer.current = '';
                cursorPos.current = 0;
                term.write(PROMPT);
            } else if (code === 127) {
                // Backspace
                if (cursorPos.current > 0) {
                    inputBuffer.current = inputBuffer.current.slice(0, cursorPos.current - 1) +
                        inputBuffer.current.slice(cursorPos.current);
                    cursorPos.current--;

                    // Clear line and rewrite
                    rewriteInput();
                }
            } else if (data === '\x1b[D') {
                // LEFT ARROW
                if (cursorPos.current > 0) {
                    cursorPos.current--;
                    term.write('\x1b[D'); // move cursor left
                }
            } else if (data === '\x1b[C') {
                // RIGHT ARROW
                if (cursorPos.current < inputBuffer.current.length) {
                    cursorPos.current++;
                    term.write('\x1b[C'); // move cursor right
                }
            } else if (data === '\x1b[A') {
                // UP ARROW
                if (historyIndex.current > 0) {
                    historyIndex.current--;
                    replaceInput(commandHistory.current[historyIndex.current]);
                }
            } else if (data === '\x1b[B') {
                // DOWN ARROW
                if (historyIndex.current < commandHistory.current.length - 1) {
                    historyIndex.current++;
                    replaceInput(commandHistory.current[historyIndex.current]);
                } else {
                    historyIndex.current = commandHistory.current.length;
                    replaceInput('');
                }
            } else if (data >= ' ' && data <= '~') {
                // Printable characters
                inputBuffer.current =
                    inputBuffer.current.slice(0, cursorPos.current) +
                    data +
                    inputBuffer.current.slice(cursorPos.current);
                cursorPos.current++;

                rewriteInput();
            }
        });

        if (terminalRef.current) {
            requestAnimationFrame(() => {
                terminalRef.current.innerHTML = '';
                term.open(terminalRef.current);
                fitAddon.fit();

                const observer = new ResizeObserver(() => {
                    fitAddon.fit();
                });
                observer.observe(terminalRef.current);

                term.writeln('Welcome to CryptoForge Tool (TIP: help)');
                term.write(PROMPT);

                return () => {
                    observer.disconnect();
                };
            });
        }

        return () => {
            term.dispose(); // cleanup
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    useEffect(() => {
        termRef.current.options.theme = resolvedTheme ? darkTheme : lightTheme;
    }, [resolvedTheme]);


    return (
        <div className="flex h-full w-full">
            {/* Tool */}
            <div
                ref={terminalRef}
                className="w-2/3 h-full border-t-2 border-r-2 border-indigo-700 dark:border-indigo-700 p-2"
            ></div>

            {/* Right Panel: Input & Output textareas */}
            <div className="w-1/3 h-full flex flex-col pl-2 space-y-2 mr-4">
                {/* Input Area */}
                <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex justify-end space-x-4 mt-2">
                        <UploadOutlined
                            onClick={uploadInput}
                            style={{ fontSize: 20, cursor: 'pointer', color: theme ? '#fff' : '#000' }}
                            title="Upload input from a file"
                        />
                        <RestOutlined
                            onClick={cleanTextarea}
                            style={{ fontSize: 20, cursor: 'pointer', color: theme ? '#fff' : '#000' }}
                            title="Clean input"
                        />
                    </div>
                    <textarea
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value);
                            inputTextRef.current = e.target.value;
                        }}
                        placeholder="Input text"
                        className="flex-1 resize-none p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded border border-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Output Area */}
                <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex justify-end space-x-4">
                        <ArrowUpOutlined
                            onClick={outputToInput}
                            style={{ fontSize: 20, cursor: 'pointer', color: theme ? '#fff' : '#000' }}
                            title="Put output to input"
                        />
                        <CopyOutlined
                            onClick={copyRaw}
                            style={{ fontSize: 20, cursor: 'pointer', color: theme ? '#fff' : '#000' }}
                            title="Copy raw output"
                        />
                        <DownloadOutlined
                            onClick={downloadOutput}
                            style={{ fontSize: 20, cursor: 'pointer', color: theme ? '#fff' : '#000' }}
                            title="Download output as a file"
                        />
                        <RestOutlined
                            onClick={cleanTextarea}
                            style={{ fontSize: 20, cursor: 'pointer', color: theme ? '#fff' : '#000' }}
                            title="Clean output"
                        />
                    </div>
                    <textarea
                        value={outputText}
                        placeholder="Output text"
                        className="flex-1 resize-none p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded border border-gray-300 dark:border-gray-600"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}