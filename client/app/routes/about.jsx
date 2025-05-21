export function meta() {
    return [
        { title: "About us" },
        { name: "description", content: "Learn more about this tool and its purpose." },
    ];
}

export default function About() {
    return (
        <main className="flex items-center justify-center h-full w-full">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">About This Tool</h1>
                <p className="text-lg text-black dark:text-white">
                    Description to add !
                </p>
            </div>
        </main>

    );
}