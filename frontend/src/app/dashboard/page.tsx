import Header from "@/src/components/dashboard/Header/Header"
import TaskList from "@/src/components/dashboard/TaskList/TaskList"

function DarshboardPage() {
    return (
        <main className="w-full min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col items-center p-4 md:p-8">
            <Header />
            <TaskList />
        </main>
    )
}

export default DarshboardPage