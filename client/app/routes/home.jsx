import {Link} from "react-router";

export function meta() {
    return [
        { title: "CryptoForge" },
        { name: "description", content: "Forge your message!" },
    ];
}

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to CryptoForge</h1>
            <p className="mb-8 text-lg text-center max-w-md">
                This is the homepage. Choose a tool or learn more about the project.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/tool"
                    className="px-4 py-2 bg-[#9172FF] text-white dark:text-black rounded hover:bg-indigo-600 transition"
                >
                    Go to Tool
                </Link>
                <Link
                    to="/about"
                    className="px-4 py-2 bg-[#9172FF] text-white dark:text-black rounded hover:bg-indigo-600 transition"
                >
                    Read more
                </Link>
            </div>
        </div>
    );
}
