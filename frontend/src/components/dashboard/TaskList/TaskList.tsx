'use client'
import { useTasks } from "@/src/graphql/hooks/useTasks"
import NewTaskSection from "../NewTask/NewTaskSection"
import KanbanBoard from "../KanbanBoard/KanbanBoard"

function TaskList() {
    const { tasks, loading, error } = useTasks()

    if (loading) return <p>Cargando tareas...</p>
    if (error) return <p>Error al cargar tareas</p>

    

    return (
        <section
            className="w-full h-full px-4 py-10 bg-(--bg-primary)"
            aria-label="Tablero de tareas"
        >
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-(--text-primary)">
                    Tablero de tareas
                </h1>
                <NewTaskSection />
            </header>
            <KanbanBoard tasks={tasks} />
        </section>
    )
}

export default TaskList
