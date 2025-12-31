function UserTasksList() {
    return (
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
    )
}

export default UserTasksList