import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteLoaderData, data, useFetcher, useLoaderData,
} from "react-router";
import React, {useEffect, useState} from "react";
import "./app.css";
//import '@xterm/xterm/css/xterm.css'; // comment for dev
import '@ant-design/v5-patch-for-react-19';
import {getColorScheme, schema, setColorScheme} from "./ssr/color-scheme-cookie.js";
import ErrorPage from "./components/errorPage.jsx";
import MainNav from "./components/mainNav.jsx";
import Footer from "./components/footer.jsx";

export async function loader({request}) {
    let colorScheme = await getColorScheme(request);
    return {colorScheme};
}

export async function action({request}) {
    let formData = await request.formData();
    let colorScheme = schema.parse(formData.get("color-scheme"));
    return data(null, {
        headers: {"Set-Cookie": await setColorScheme(colorScheme)},
    });
}

export const links = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
    {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"},
    {rel: "stylesheet", href: "node_modules/@xterm/xterm/css/xterm.css"}, // comment for prod
];

export const meta = () => [
    {title: "CryptoForge"},
    {name: "description", content: "Forge your message!"},
];

export function AppShell({children, colorScheme}) {
    return (
        <html lang="en" className={colorScheme ?? "system"}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

function Layout({children, initScheme}) {
    const [isDark, setIsDark] = useState(() => {
        // Initialize state immediately on first render
        if (initScheme === "dark") return true;
        if (initScheme === "light") return false;
        return null; // system
    });

    useEffect(() => {
        if (isDark === null) {
            // For system, listen to changes in system preference
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = (e) => setIsDark(e.matches);
            // Set initial system preference once
            setIsDark(mediaQuery.matches);
            // Listen to changes
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [isDark]);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark", "system");
        if (initScheme === "system" && isDark === null) {
            root.classList.add("system");
        } else if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.add("light");
        }
    }, [isDark, initScheme]);

    const fetcher = useFetcher();

    const handleChange = (checked) => {
        setIsDark(checked);
        const scheme = checked ? "dark" : "light";

        fetcher.submit(
            {"color-scheme": scheme},
            {method: "post", action: "/"}
        );
    };

    const theme = (initScheme === "system" && isDark === null) ? "system" : isDark ? "dark" : "light";

    return (
        <>
            <div className="flex flex-col h-screen overflow-hidden">
                <MainNav isDark={isDark} handleChange={handleChange} />

                <main
                    className="flex-1 overflow-auto bg-white dark:bg-black text-black dark:text-white min-h-[calc(100vh-104px)]">
                    {children}
                    <Outlet context={{theme}}/>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default function App() {
    const {colorScheme} = useRouteLoaderData("root") ?? {colorScheme: "system"};

    return (
        <AppShell colorScheme={colorScheme}>
            <Layout initScheme={colorScheme}/>
        </AppShell>
    );
}

export function ErrorBoundary() {
    return (
        <ErrorPage />
    );
}