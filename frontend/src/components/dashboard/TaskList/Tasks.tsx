'use client'
import { fetchApi } from "@/src/scripts.ts/scripts"
import { Task } from "./types"
import React from "react"
import NewTask from "../NewTask/NewTask"

interface Props {
    tasks: Task[]
}

function Tasks({ tasks }: Props) {
    const [newTaskPanel, setNewTaskPanel] = React.useState<boolean>(false)
    const [idUpdate, setIdUpdate] = React.useState<string>("")
    const endPoint: string = 'tasks'

    function updateTaskPanel(id: string) {
        setNewTaskPanel(prev => !prev)
        setIdUpdate(id)
    }

    async function deleteTask(id: string) {
        async function sendForm() {
            const res = await fetchApi(`${endPoint}/${id}`, {
                headers: { "Content-Type": "application/json" },
                method: 'DELETE',
                credentials: 'include'
            })
            console.log(res)
        }
        sendForm()
    }

    return (
        <>
            {newTaskPanel && <NewTask setNewTaskPanel={setNewTaskPanel} requiredOptionalsInputs={false} idUpdate={idUpdate} />}
            {tasks.length === 0
                ? <p>No tienes tareas agregadas.</p>
                :
                tasks.map(task => (
                    <article
                        key={task._id}
                        className="flex flex-col gap-3 p-4 rounded-xl
                    bg-(--bg-secondary)
                    border border-(--border-color)
                    hover:shadow-md
                    transition-shadow"
                    >
                        <header className="flex items-start justify-between">
                            <span
                                className="px-3 py-1 rounded-full text-xs
                            bg-(--color-primary)/10
                            text-(--color-primary)"
                            >
                                {task.priority}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-1 rounded-md
                                text-(--text-secondary)
                                hover:text-(--color-primary)
                                hover:bg-(--bg-primary)
                                transition-colors"
                                    //esta modificacion se realiza dentro de NewTask para reutilizar el mismo componente
                                    onClick={() => updateTaskPanel(task._id)}
                                >
                                    ✏️
                                </button>
                                <button
                                    className="p-1 rounded-md
                                text-(--text-secondary)
                                hover:text-red-500
                                hover:bg-(--bg-primary)
                                transition-colors"
                                    onClick={() => deleteTask(task._id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        </header>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-(--text-primary)">
                                {task.title}
                            </h3>
                            <p className="text-(--text-secondary)">
                                {task.description}
                            </p>
                        </div>
                    </article>
                ))
            }
        </>
    )
}
export default Tasks