import {useEffect, useRef, useState} from 'react';
import {Terminal} from "@xterm/xterm";
import {FitAddon} from "@xterm/addon-fit/src/FitAddon.js";

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

export function Tool() {
    const terminalRef = useRef(null);
    const termRef = useRef(null); // holds terminal instance
    const inputBuffer = useRef('');
    const commandHistory = useRef([]);
    const historyIndex = useRef(-1);
    const cursorPos = useRef(0); // Position of cursor in inputBuffer
    const [inputText, setInputText] = useState(''); // Input state for the text area
    const inputTextRef = useRef('');
    const [outputText, setOutputText] = useState(''); // Output state for the text area
    const algorithms = ['ceasar', 'vigenere'];

    const replaceInput = (newInput) => {
        inputBuffer.current = newInput;
        cursorPos.current = newInput.length;
        rewriteInput();
    };

    const rewriteInput = () => {
        const term = termRef.current;

        // Clear current line (go back, erase, go back to start)
        const clearSeq = '\x1b[2K\r' + PROMPT;
        term.write(clearSeq + inputBuffer.current);

        // Move cursor to correct position
        const targetOffset = inputBuffer.current.length - cursorPos.current;
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
            // Check if the textarea is empty
            console.log(`Input textarea is ${inputTextRef.current}`);
            if (!inputTextRef.current.trim()) {
                write('Warning: No input text provided!');
                return; // Stop further processing
            }

            const match = cleanCmd.match(/-a\s+(\w+)\s+-k\s+(\w+)/);
            if (!match) {
                write(`Usage: ${cleanCmd.startsWith('encrypt') ? 'encrypt' : 'decrypt'} -a <algo> -k <key>`);
                return;
            }
            const algo = match[1];
            const key = match[2];
            const message = inputTextRef.current;  // Get the input from the textarea

            let result;
            if (cleanCmd.startsWith('encrypt')) {
                if (algo === 'ceasar') result = ceasarEncrypt(message, key);
                else if (algo === 'vigenere') result = vigenereEncrypt(message, key);
                else {
                    write(`Unknown algorithm: ${algo}`);
                    return;
                }

                // Update the output textarea and terminal
                setOutputText(result);
                write(`Cipher done.`);
            } else if (cleanCmd.startsWith('decrypt')) {
                if (algo === 'ceasar') result = ceasarDecrypt(message, key);
                else if (algo === 'vigenere') result = vigenereDecrypt(message, key);
                else {
                    write(`Unknown algorithm: ${algo}`);
                    return;
                }

                // Update the output textarea and terminal
                setOutputText(result);
                write(`Decipher done.`);
            }
        } else {
            write(`Unknown command: ${command}`);
        }
    };

    useEffect(() => {
        const term = new Terminal({cursorBlink: true});
        const fitAddon = new FitAddon();

        term.loadAddon(fitAddon);
        termRef.current = term;

        if (terminalRef.current) {
            term.open(terminalRef.current); // Open the terminal
            fitAddon.fit(); // Adjust the size
        }

        const resizeListener = () => {
            if (term) {
                fitAddon.fit(); // Adjust terminal size when the window is resized
            }
        };

        // Add event listener for resize
        window.addEventListener("resize", resizeListener);

        // Write initial message after a slight delay to avoid race conditions
        setTimeout(() => {
            term.writeln('Welcome to CryptoForge Terminal');
            term.write(PROMPT);
        }, 10);

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

        return () => {
            term.dispose(); // cleanup
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    return (
        <div className="flex h-full w-full">
            {/* Terminal */}
            <div
                ref={terminalRef}
                className="w-2/3 h-full bg-black text-white p-2"
            ></div>

            {/* Right Panel: Input & Output textareas */}
            <div className="w-1/3 h-full flex flex-col pl-2 space-y-2">
                {/* Input Area */}
                <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex justify-between">
                        <button className="text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Btn
                        </button>
                        <button className="text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Btn
                        </button>
                    </div>
                    <textarea
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value);
                            inputTextRef.current = e.target.value;
                        }}
                        placeholder="Input text"
                        className="flex-1 resize-none p-2 bg-gray-800 text-white rounded border border-gray-600"
                    />
                </div>

                {/* Output Area */}
                <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex justify-between">
                        <button className="text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Btn
                        </button>
                        <button className="text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Btn
                        </button>
                    </div>
                    <textarea
                        value={outputText}
                        placeholder="Output text"
                        className="flex-1 resize-none p-2 bg-gray-800 text-white rounded border border-gray-600"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}