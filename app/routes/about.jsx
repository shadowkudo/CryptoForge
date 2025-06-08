import {useState} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

export function meta() {
    return [
        { title: "About us" },
        { name: "description", content: "Learn more about this web site and its purpose." },
    ];
}

export default function About() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <main className="flex h-full w-full">
            {/* Sidebar */}
            {sidebarOpen && (
                <aside className="w-64 p-4 border-r bg-[#9172FF] dark:text-black text-white border-gray-300 dark:border-gray-700">
                    <ul className="menu space-y-2">
                        <li><a href="#intro">Introduction</a></li>
                        <li><a href="#terminal">Using the Terminal</a></li>
                        <li><a href="#theory">Cipher Theory</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#credits">Credits</a></li>
                    </ul>
                </aside>
            )}

            {/* Main Content */}
            <section className="flex-1 p-8 overflow-y-auto space-y-12">
                {/* Title with sidebar toggle */}
                <div className="relative mb-8 h-10 flex items-center justify-center">
                    <button
                        className="absolute left-0 btn btn-sm btn-outline flex items-center gap-2 hover:bg-[#9172FF]"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        title={sidebarOpen ? "Close side panel" : "Open side panel"}
                    >
                        {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                    </button>

                    <h1 className="text-2xl font-bold text-center">
                        On this page you’ll find information about the web app.
                    </h1>
                </div>

                <div role="alert" className="alert alert-info mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Use the button to open/close the side panel.</span>
                </div>

                {/* Sections */}

                {/* Introduction */}
                <div id="intro" className="bg-gray-400 dark:bg-base-100 border border-base-300 rounded-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Introduction</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>CryptoForge is a hands-on encryption tool with a terminal interface.</li>
                        <li>Use command-line commands to encrypt and decrypt messages manually.</li>
                        <li>Explore how classic ciphers work by interacting with them directly and reading how it works.</li>
                    </ul>
                </div>

                {/* Terminal */}
                <div id="terminal" className="bg-gray-400 dark:bg-base-100 border border-base-300 rounded-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Terminal</h2>

                    <p className="text-lg mb-4">
                        Typing <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">help</code> will show the commands you can use.
                    </p>

                    <div role="alert" className="alert alert-warning mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>It’s your responsibility to use ciphers wisely; don’t use ciphers meant for text data on byte data like pictures.</span>
                    </div>

                    <h3 className="font-semibold text-lg mb-1">Keyboard Terminal</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Use arrow up/down to cycle through command history.</li>
                        <li>Use arrow left/right to move the cursor within the current line.</li>
                    </ul>

                    <div role="alert" className="alert alert-warning mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>When the cursor is in the terminal, browser keyboard shortcuts won’t work. Click outside the terminal to regain normal browser keyboard functionality.</span>
                    </div>

                    <h3 className="font-semibold text-lg mb-1">Input Length Limit</h3>
                    <p className="mb-4">
                        The terminal input is limited to a maximum length per line (typically around 77 characters) based on the terminal width and prompt size. This ensures proper display without overflow or wrapping issues.
                    </p>

                    <h3 className="font-semibold text-lg mb-1">Input Zone</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Freely write your plaintext or ciphertext here.</li>
                        <li>You can upload the contents of a file.</li>
                    </ul>

                    <h3 className="font-semibold text-lg mb-1">Output Zone</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Displays the command output — ciphertext or plaintext.</li>
                        <li>You can download the output to a file.</li>
                        <li>You can copy the output to your clipboard.</li>
                        <li>You can move the output back to the input zone.</li>
                    </ul>

                    <div role="alert" className="alert alert-info mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>To choose the destination folder when downloading files, make sure your browser is set to “Always ask you where to save files.” For example, in Firefox, you can change this in <em>Settings → General → Downloads</em>.</span>
                    </div>
                </div>

                {/* Cipher Theory */}
                <div id="theory" className="bg-gray-400 dark:bg-base-100 border border-base-300 rounded-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Cipher Theory</h2>
                    <p className="text-lg leading-relaxed mb-2">
                        Understanding the theory behind the ciphers strengthens your cryptographic intuition.
                    </p>

                    <h3 className="text-xl font-semibold mt-4 mb-1">Caesar Cipher</h3>
                    <p className="text-lg leading-relaxed mb-3">
                        A simple substitution cipher that shifts each letter by a fixed number of positions.
                        It’s easy to crack but perfect for learning basics of encryption and modular arithmetic.
                    </p>

                    <h3 className="text-xl font-semibold mt-4 mb-1">Vigenère Cipher</h3>
                    <p className="text-lg leading-relaxed mb-3">
                        Uses a keyword to apply multiple Caesar shifts, making it stronger and a great introduction to polyalphabetic ciphers.
                    </p>

                    <h3 className="text-xl font-semibold mt-4 mb-1">AES (Advanced Encryption Standard)</h3>
                    <p className="text-lg leading-relaxed mb-3">
                        A symmetric block cipher widely used across the globe. AES encrypts data in fixed-size blocks (usually 128 bits)
                        and supports key sizes of 128, 192, or 256 bits. It's fast, secure, and the current standard for modern encryption.
                    </p>

                    <h3 className="text-xl font-semibold mt-4 mb-1">DES (Data Encryption Standard)</h3>
                    <p className="text-lg leading-relaxed mb-3">
                        An older symmetric-key algorithm that operates on 64-bit blocks and uses a 56-bit key. While historically important,
                        DES is now considered insecure due to its small key size and is mainly of academic or legacy interest.
                    </p>

                    <div role="alert" className="alert alert-info mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>For deeper study, consider exploring modern cryptography resources.</span>
                    </div>
                </div>

                {/* Theme Info */}
                <div id="theme" className="bg-gray-400 dark:bg-base-100 border border-base-300 rounded-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Theme: Light & Dark Mode</h2>
                    <p className="text-lg leading-relaxed mb-3">
                        This application supports both <strong>light</strong> and <strong>dark</strong> themes to provide a comfortable user experience.
                        By default, it automatically matches your <strong>system’s preferred color scheme</strong>.
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Light mode uses bright, high-contrast colors for daytime usage.</li>
                        <li>Dark mode uses softer tones to reduce eye strain, especially at night.</li>
                    </ul>
                    <p className="text-lg leading-relaxed mb-3">
                        Your theme preference is temporarily stored in an <strong>encrypted session cookie</strong> (named <code>color-scheme</code>). This means:
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Your theme is remembered while your browser tab remains open.</li>
                        <li>Once the session ends (e.g., browser is closed), the cookie is deleted.</li>
                        <li>The cookie is encrypted — only this app can read or modify it.</li>
                    </ul>
                </div>

                {/* Contact */}
                <div id="contact" className="bg-gray-400 dark:bg-base-100 border border-base-300 rounded-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Contact</h2>
                    <p className="text-lg leading-relaxed mb-4">
                        Have issues or ideas? Reach out through:
                    </p>
                    <ul className="list-disc pl-6 text-lg space-y-2">
                        <li>
                            <a
                                href="https://github.com/shadowkudo/CryptoForge/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-indigo-600 dark:text-[#9172FF] hover:text-indigo-800 hover:dark:text-indigo-600 transition"
                            >
                                GitHub Issues
                            </a>{" "}
                            — for bugs, feature requests, and development discussion.
                        </li>
                        <li>
                            <a
                                href="mailto:cryptoforge@cybernest.ch"
                                className="underline text-indigo-600 dark:text-[#9172FF] hover:text-indigo-800 hover:dark:text-indigo-600 transition"
                            >
                                Email
                            </a>{" "}
                            — for general questions or feedback.
                        </li>
                    </ul>
                </div>

                {/* Credits */}
                <div id="credits" className="bg-gray-400 dark:bg-base-100 border border-base-300 rounded-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Credits</h2>
                    <p className="text-lg leading-relaxed mb-2">
                        Developed by 2 people for a school project.
                    </p>
                    <p className="text-lg leading-relaxed">
                        <a
                            href="https://github.com/shadowkudo/CryptoForge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-indigo-600 dark:text-[#9172FF] hover:text-indigo-800 hover:dark:text-indigo-600 transition"
                        >
                            Visit the GitHub repository
                        </a>{" "}
                        to see the source code, contribute, or check out the project history.
                    </p>
                </div>
            </section>
        </main>
    );
}