import { Link } from "react-router";

export function meta() {
    return [
        { title: "CryptoForge" },
        { name: "description", content: "Homepage" },
    ];
}

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-white dark:bg-black text-black dark:text-white px-4">
            <h1 className="text-4xl font-extrabold mb-3 text-center">
                Welcome to <span className="text-[#9172FF]">CryptoForge</span>
            </h1>

            <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
                Learn encryption like it's meant to be: manual, hands-on, and educational. CryptoForge puts you in the
                coder’s seat.
            </p>

            {/* Wrapper */}
            <div className="w-full max-w-4xl mx-auto">
                {/* Idea */}
                <div className="collapse collapse-arrow bg-gray-400 dark:bg-base-100 border-base-300 border m-2">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold">
                        Craft your own encrypted messages by hand — just like a real cryptographer.
                    </div>
                    <div className="collapse-content text-sm">
                        CryptoForge lets you experience the power and logic behind classic and modern encryption algorithms
                        in a terminal-style interface. No black boxes. No hidden magic. You’re in full control of the cipher.
                    </div>
                </div>

                {/* Algo */}
                <div className="collapse collapse-arrow bg-gray-400 dark:bg-base-100 border-base-300 border m-2">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold">Supported Algorithms</div>
                    <div className="collapse-content text-sm">
                        <ul className="list-disc list-inside">
                            <li><strong>Caesar Cipher</strong> – Simple letter shift</li>
                            <li><strong>Vigenere Cipher</strong> – Keyword-based substitution</li>
                            <li>More will be coming!</li>
                        </ul>
                    </div>
                </div>

                {/* Why */}
                <div className="collapse collapse-arrow bg-gray-400 dark:bg-base-100 border-base-300 border m-2">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold">Why Use CryptoForge?</div>
                    <div className="collapse-content text-sm">
                        <ul className="list-disc list-inside">
                            <li>Understand encryption, don’t just apply it</li>
                            <li>Practice encryption/decryption in a hands-on terminal environment</li>
                            <li>Have fun!</li>
                        </ul>
                    </div>
                </div>

                {/* Problem */}
                <div className="collapse collapse-arrow bg-gray-400 dark:bg-base-100 border-base-300 border m-2">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold">Have a Problem?</div>
                    <div className="collapse-content text-sm">
                        Visit the{" "}
                        <Link
                            to="/about#contact"
                            className="underline text-indigo-600 dark:text-[#9172FF] hover:text-indigo-800 hover:dark:text-indigo-600 transition"
                        >
                            Contact
                        </Link>{" "}
                        section to reach out to us. We’re here to help.
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
                <Link
                    to="/tool"
                    className="px-6 py-2 rounded bg-[#9172FF] text-white dark:text-black font-medium hover:bg-indigo-600 transition"
                >
                    Go to the Terminal
                </Link>
                <Link
                    to="/about"
                    className="px-6 py-2 rounded bg-[#9172FF] text-white dark:text-black font-medium hover:bg-indigo-600 transition"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
}