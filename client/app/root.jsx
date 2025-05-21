import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    Link,
    useRouteError,
} from "react-router";
import {useEffect, useState} from "react";
import {Switch} from "antd";
import "./app.css";
import {MoonOutlined, SunOutlined} from "@ant-design/icons";

export const links = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
    {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"},
    {rel: "stylesheet", href: "node_modules/@xterm/xterm/css/xterm.css"},
];

export const meta = () => [
    {title: "CryptoForge"},
    {name: "description", content: "Forge your message!"},
];

function Layout({children, isDark, setIsDark}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleString();

    return (
        <>
            <Meta/>
            <Links/>
            <div className="flex flex-col h-screen overflow-hidden">
                <nav
                    className="p-4 flex gap-4 items-center justify-between bg-white dark:bg-black text-black dark:text-white border-b border-gray-300 dark:border-gray-700">
                    <div className="flex gap-4">
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                        <Link to="/about" className="hover:underline">
                            About
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={isDark}
                            onChange={setIsDark}
                            checkedChildren={<SunOutlined style={{fontSize: 20}}/>}
                            unCheckedChildren={<MoonOutlined style={{fontSize: 20}}/>}
                            style={{
                                backgroundColor: isDark ? '#6366F1' : '#6B7280',
                                borderColor: 'transparent',
                                transition: 'background-color 0.3s ease'
                            }}

                        />
                    </div>
                </nav>

                <main
                    className="flex-1 overflow-auto bg-white dark:bg-black text-black dark:text-white min-h-[calc(100vh-104px)]">
                    {children}
                </main>

                <footer
                    className="bg-white dark:bg-black text-black dark:text-white text-center p-4 text-sm border-t border-gray-300 dark:border-gray-700">
                    {`Current date and time: ${formattedTime}`}
                </footer>
            </div>

            <ScrollRestoration/>
            <Scripts/>
        </>
    );
}

export default function App() {
    // get initial dark mode with fallback to system preference
    const getInitialDarkMode = () => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme");
            if (stored === "dark") return true;
            if (stored === "light") return false;
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    };

    const [isDark, setIsDark] = useState(getInitialDarkMode);

    return (
        <Layout isDark={isDark} setIsDark={setIsDark}>
            <Outlet context={{isDark, setIsDark}}/>
        </Layout>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    const getInitialDarkMode = () => {
        if (typeof window === "undefined") return false;
        const stored = localStorage.getItem("theme");
        if (stored) return stored === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const [isDark] = useState(getInitialDarkMode);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <>
            <Meta/>
            <Links/>
            <main className="bg-white dark:bg-black text-black dark:text-white h-full w-full">
                <div className="pt-16 p-4 container mx-auto">
                    <h1>{message}</h1>
                    <p>{details}</p>
                    {stack && (
                        <pre className="w-full p-4 overflow-x-auto">
                        <code>{stack}</code>
                    </pre>
                    )}
                </div>
            </main>
            <ScrollRestoration/>
            <Scripts/>
        </>
    );
}