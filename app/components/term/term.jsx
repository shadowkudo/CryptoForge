import { useEffect, useRef, useState } from 'react';
import { initializeTerminal } from './core';
import { handleCommandFactory } from './commandHandler';
import { maskKeyInCommand, darkTheme, lightTheme, PROMPT } from './helpers';
import TextAreas from './textAreas';

export default function Term({ theme }) {
    const terminalRef = useRef(null);
    const termRef = useRef(null);
    const inputBuffer = useRef('');
    const commandHistory = useRef([]);
    const historyIndex = useRef(-1);
    const cursorPos = useRef(0);
    const [inputText, setInputText] = useState('');
    const inputTextRef = useRef('');
    const [outputText, setOutputText] = useState('');
    const resolvedTheme = theme === 'dark';

    const replaceInput = (newInput) => {
        inputBuffer.current = newInput;
        cursorPos.current = newInput.length;
        rewriteInput();
    };

    const rewriteInput = () => {
        const term = termRef.current;
        const displayInput = maskKeyInCommand(inputBuffer.current);
        const clearSeq = '\x1b[2K\r' + PROMPT;
        term.write(clearSeq + displayInput);
        const targetOffset = displayInput.length - cursorPos.current;
        if (targetOffset > 0) term.write('\x1b[' + targetOffset + 'D');
    };


    useEffect(() => {
        const term = initializeTerminal(terminalRef.current, resolvedTheme ? darkTheme : lightTheme);
        termRef.current = term;

        const maxInputLength = term.cols - PROMPT.length;

        const handleCommand = handleCommandFactory(term, inputTextRef, setOutputText);
        term.onData((data) => {
            const code = data.charCodeAt(0);
            if (code === 13) {
                term.write('\r\n');
                const cmd = inputBuffer.current.trim();
                if (cmd) {
                    commandHistory.current.push(cmd);
                    historyIndex.current = commandHistory.current.length;
                    handleCommand(cmd);
                }
                inputBuffer.current = '';
                cursorPos.current = 0;
                term.write(PROMPT);
            } else if (code === 127) {
                if (cursorPos.current > 0) {
                    inputBuffer.current = inputBuffer.current.slice(0, cursorPos.current - 1) +
                        inputBuffer.current.slice(cursorPos.current);
                    cursorPos.current--;
                    rewriteInput();
                }
            } else if (data === '\x1b[D' && cursorPos.current > 0) {
                cursorPos.current--;
                term.write('\x1b[D');
            } else if (data === '\x1b[C' && cursorPos.current < inputBuffer.current.length) {
                cursorPos.current++;
                term.write('\x1b[C');
            } else if (data === '\x1b[A' && historyIndex.current > 0) {
                historyIndex.current--;
                replaceInput(commandHistory.current[historyIndex.current]);
            } else if (data === '\x1b[B') {
                if (historyIndex.current < commandHistory.current.length - 1) {
                    historyIndex.current++;
                    replaceInput(commandHistory.current[historyIndex.current]);
                } else {
                    historyIndex.current = commandHistory.current.length;
                    replaceInput('');
                }
            } else if (data.length > 0 && [...data].every(c => c >= ' ' && c <= '~')) { // Printable chars
                if (inputBuffer.current.length + data.length <= maxInputLength) {
                    inputBuffer.current =
                        inputBuffer.current.slice(0, cursorPos.current) +
                        data +
                        inputBuffer.current.slice(cursorPos.current);
                    cursorPos.current += data.length;
                    rewriteInput();
                } else {
                    term.write('\x07'); // bell on overflow
                }
            }
        });
        term.write(PROMPT);

        return () => term.dispose();
    }, []);

    useEffect(() => {
        if (termRef.current) {
            termRef.current.options.theme = resolvedTheme ? darkTheme : lightTheme;
        }
    }, [resolvedTheme]);

    return (
        <div className="flex h-full w-full">
            <div ref={terminalRef} className="w-2/3 h-full border-r-2 border-[#9172FF] p-2" />
            <TextAreas
                theme={theme}
                inputText={inputText}
                setInputText={setInputText}
                inputTextRef={inputTextRef}
                outputText={outputText}
                setOutputText={setOutputText}
            />
        </div>
    );
}