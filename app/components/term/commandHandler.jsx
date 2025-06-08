import { ceasarEncrypt, ceasarDecrypt } from '../../algorithms/ceasar';
import { vigenereEncrypt, vigenereDecrypt } from '../../algorithms/vigenere';

export const handleCommandFactory = (term, inputTextRef, setOutputText) => {
    const write = (text) => term.writeln(text);
    const algorithms = ['ceasar', 'vigenere'];

    return (command) => {
        const cleanCmd = command.trim();

        if (cleanCmd === 'help') {
            write('Available commands:');
            write('  clear                        Clear the terminal');
            write('  help                         Show this help');
            write('  list                         List supported algorithms');
            write('  encrypt -a <algo> -k <key>   Encrypt input to output');
            write('  decrypt -a <algo> -k <key>   Decrypt input to output');
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
                else return write(`Unknown algorithm: ${algo}`);
                write('Cipher done.');
            } else {
                if (algo === 'ceasar') result = ceasarDecrypt(message, key);
                else if (algo === 'vigenere') result = vigenereDecrypt(message, key);
                else return write(`Unknown algorithm: ${algo}`);
                write('Decipher done.');
            }

            setOutputText(result);
        } else {
            write(`Unknown command: ${command}`);
        }
    };
};