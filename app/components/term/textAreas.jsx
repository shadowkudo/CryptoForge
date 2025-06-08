import {
    ArrowUpOutlined,
    CopyOutlined,
    DownloadOutlined,
    RestOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { message } from 'antd';

export default function TextAreas({ theme, inputText, setInputText, inputTextRef, outputText, setOutputText }) {
    const downloadOutput = () => {
        if (!outputText.trim()) return message.warning("Output is empty.");
        const blob = new Blob([outputText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        message.success("Download triggered.");
    };

    const copyRaw = async () => {
        try {
            await navigator.clipboard.writeText(outputText);
            message.success("Output copied to clipboard.");
        } catch {
            message.error("Failed to copy.");
        }
    };

    const outputToInput = () => {
        if (!outputText.trim()) return;
        setInputText(outputText);
        inputTextRef.current = outputText;
        setOutputText('');
    };

    const uploadInput = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > 100 * 1024) return message.error("File too large (max 100 KB).");
            try {
                const text = await file.text();
                setInputText(text);
                inputTextRef.current = text;
                message.success("File loaded into input.");
            } catch {
                message.error("Failed to read file.");
            }
        };
        input.click();
    };

    const cleanTextarea = (target = 'both') => {
        if (target === 'input' || target === 'both') {
            setInputText('');
            inputTextRef.current = '';
        }
        if (target === 'output' || target === 'both') {
            setOutputText('');
        }
    };

    const iconStyle = {
        fontSize: 20,
        cursor: 'pointer',
        color: theme === 'dark' ? '#fff' : '#000'
    };

    return (
        <div className="w-1/3 h-full flex flex-col pl-2 space-y-2 mr-4">
            {/* Input Area */}
            <div className="flex-1 flex flex-col space-y-1 mt-2">
                <div className="flex justify-end space-x-4">
                    <UploadOutlined onClick={uploadInput} style={iconStyle} title="Upload input from a file" />
                    <RestOutlined onClick={() => cleanTextarea('input')} style={iconStyle} title="Clean input" />
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
            <div className="flex-1 flex flex-col space-y-1 mb-2">
                <div className="flex justify-end space-x-4">
                    <ArrowUpOutlined onClick={outputToInput} style={iconStyle} title="Put output to input" />
                    <CopyOutlined onClick={copyRaw} style={iconStyle} title="Copy raw output" />
                    <DownloadOutlined onClick={downloadOutput} style={iconStyle} title="Download output as a file" />
                    <RestOutlined onClick={() => cleanTextarea('output')} style={iconStyle} title="Clean output" />
                </div>
                <textarea
                    value={outputText}
                    placeholder="Output text"
                    className="flex-1 resize-none p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded border border-gray-300 dark:border-gray-600"
                    readOnly
                />
            </div>
        </div>
    );
}