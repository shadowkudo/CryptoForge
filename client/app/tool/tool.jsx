import {useEffect, useRef, useState} from 'react';
import { Terminal } from "@xterm/xterm";
import {FitAddon} from "@xterm/addon-fit/src/FitAddon.js";

export function Tool() {
    const terminalRef = useRef(null);
    const termRef = useRef(null); // holds terminal instance
    const inputBuffer = useRef('');

    const algorithms = ['ceasar', 'vigenere'];

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
            } else if (cleanCmd.startsWith('encrypt')) {
                const match = cleanCmd.match(/-a\s+(\w+)\s+-k\s+(\w+)/);
                if (!match) {
                    write('Usage: encrypt -a <algo> -k <key>');
                    return;
                }
                const algo = match[1];
                const key = match[2];
                const input = 'HelloWorld';

                let result;
                if (algo === 'ceasar') result = ceasarEncrypt(input, key);
                else if (algo === 'vigenere') result = vigenereEncrypt(input, key);
                else {
                    write(`Unknown algorithm: ${algo}`);
                    return;
                }

                write(`Encrypted "${input}": ${result}`);
            } else if (cleanCmd.startsWith('decrypt')) {
                const match = cleanCmd.match(/-a\s+(\w+)\s+-k\s+(\w+)/);
                if (!match) {
                    write('Usage: decrypt -a <algo> -k <key>');
                    return;
                }
                const algo = match[1];
                const key = match[2];
                const input = 'EncryptedTextHere'; // hardcoded unless added input zone

                let result;
                if (algo === 'ceasar') result = ceasarDecrypt(input, key);
                else if (algo === 'vigenere') result = vigenereDecrypt(input, key);
                else {
                    write(`Unknown algorithm: ${algo}`);
                    return;
                }

                write(`Decrypted "${input}": ${result}`);
            } else {
                write(`Unknown command: ${command}`);
            }
        }
    ;

    useEffect(() => {
        const term = new Terminal({cursorBlink: true});
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        termRef.current = term;
        term.open(terminalRef.current);
        fitAddon.fit();
        window.addEventListener("resize", fitAddon.fit);
        // Delay writing welcome message slightly to avoid layout race
        setTimeout(() => {
            term.writeln('Welcome to CryptoForge Terminal');
            term.write('> ');
        }, 10);

        term.onData((data) => {
            const code = data.charCodeAt(0);

            if (code === 13) {
                // Enter
                term.write('\r\n');
                const cmd = inputBuffer.current.trim();
                handleCommand(cmd);
                inputBuffer.current = '';
                term.write('> ');
            } else if (code === 127) {
                // Backspace
                if (inputBuffer.current.length > 0) {
                    inputBuffer.current = inputBuffer.current.slice(0, -1);
                    term.write('\b \b');
                }
            } else {
                inputBuffer.current += data;
                term.write(data);
            }
        });

        return () => {
            term.dispose(); // cleanup
            window.removeEventListener("resize", fitAddon.fit);
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
                        <button className="text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Btn</button>
                        <button className="text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Btn</button>
                    </div>
                    <textarea
                        placeholder="Input text"
                        className="flex-1 resize-none p-2 bg-gray-800 text-white rounded border border-gray-600"
                    />
                </div>

                {/* Output Area */}
                <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex justify-between">
                        <button className="text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Btn</button>
                        <button className="text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Btn</button>
                    </div>
                    <textarea
                        placeholder="Output text"
                        className="flex-1 resize-none p-2 bg-gray-800 text-white rounded border border-gray-600"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}