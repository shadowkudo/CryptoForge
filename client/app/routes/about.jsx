export function meta() {
    return [
        { title: "About us" },
        { name: "description", content: "Learn more about this tool and its purpose." },
    ];
}

export default function About() {
    return (
        <main className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">About This Tool</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
                Description to add !
            </p>
        </main>
    );
}