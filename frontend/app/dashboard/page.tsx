import Header from "@/components/dashboard/Header/Header"

function DarshboardPage() {
    return (
        <div className="w-full min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col items-center justify-center p-4 md:p-8">
            <Header />
            <main className="w-full max-w-md bg-(--bg-secondary) rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="w-full px-4 py-2 bg-(--bg-secondary) border border-(--border-color) rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) text-(--text-primary)"
                    />
                </div>
                <ul className="space-y-4">
                    <li className="flex items-center justify-between bg-(--bg-secondary) p-4 rounded-md border border-(--border-color)">
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2 accent-(--color-primary)" />
                            <span>Sample Task 1</span>
                        </div>
                        <button className="text-(--color-secondary) hover:text-[var(--color-secondary)/80]">
                            Delete
                        </button>
                    </li>
                    <li className="flex items-center justify-between bg-(--bg-secondary) p-4 rounded-md border border-(--border-color)">
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2 accent-(--color-primary)" />
                            <span>Sample Task 2</span>
                        </div>
                        <button className="text-(--color-secondary) hover:text-[var(--color-secondary)/80]">
                            Delete
                        </button>
                    </li>
                </ul>
            </main>
        </div>
    )
}

export default DarshboardPage