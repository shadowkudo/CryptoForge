import React from 'react';
import {isRouteErrorResponse, useRouteError} from 'react-router';
import {AppShell} from '../root.jsx';
import ErrorNav from '../components/errorNav.jsx';

export default function ErrorPage() {
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

    /*
        - ErrorBoundary can not use useLoaderData() (because app got error and got sent here)
        - Choice 1: client sided read cookie -> too late for first render from server (using ssr)
        - Choice 2: define that when ErrorBoundary uses system scheme at init -> chose this one
        - Choice 3: is there another choice better for this situation ? -> none
     */
    const theme = "system";

    return (
        <AppShell colorScheme={theme}>
            <ErrorNav/>
            <main className="px-8 py-6">
                <div className="bg-[#9172FF] text-black rounded-lg p-6 shadow-md">
                    <h1 className="text-3xl font-bold mb-4">{message}</h1>
                    <p className="mb-4">{details}</p>
                    {stack && (
                        <pre className="bg-red-500 bg-opacity-25 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
                            <code>{stack}</code>
                        </pre>
                    )}
                </div>
            </main>
        </AppShell>
    );
}
