'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDeleteTask } from "@/src/graphql/hooks/useDeleteTask"
import { Task } from '../TaskList/types'
import { useState } from 'react'
import NewTask from '../NewTask/NewTask'

interface Props {
    task: Task
    isDragging?: boolean
}

export default function KanbanCard({ task, isDragging }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({ id: task.id })
    const { handleDeleteTask } = useDeleteTask()
    const [newTaskPanel, setNewTaskPanel] = useState<boolean>(false)

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    async function deleteTask() {
        await handleDeleteTask(task.id)
    }

    const priorityColors: Record<string, string> = {
        baja: 'bg-green-500/20 text-green-400',
        media: 'bg-yellow-500/20 text-yellow-400',
        alta: 'bg-orange-500/20 text-orange-400',
        urgente: 'bg-red-500/20 text-red-400',
    }

    return (
        <>
            {newTaskPanel && <NewTask setNewTaskPanel={setNewTaskPanel} requiredOptionalsInputs={false} idUpdate={task.id} />}
            <article
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className={`flex flex-col gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-grab active:cursor-grabbing
                    bg-(--bg-primary)
                    border border-(--border-color)
                    hover:shadow-md
                    transition-all
                    ${isSortableDragging ? 'opacity-40 scale-95' : ''}
                    ${isDragging ? 'shadow-xl scale-105 z-50 ring-2 ring-(--color-primary)' : ''}`}
            >
                <header className="flex items-start justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap ${priorityColors[task.priority] || priorityColors.media}`}>
                        {task.priority}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            className="p-1.5 sm:p-1 rounded-md text-(--text-secondary) hover:text-(--color-primary) hover:bg-(--bg-secondary) transition-colors text-sm"
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setNewTaskPanel(true) }}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            ✏️
                        </button>
                        <button
                            className="p-1.5 sm:p-1 rounded-md text-(--text-secondary) hover:text-red-500 hover:bg-(--bg-secondary) transition-colors text-sm"
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); deleteTask() }}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            🗑️
                        </button>
                    </div>
                </header>
                <div className="flex flex-col gap-1">
                    <h3 className="text-(--text-primary) font-medium text-sm sm:text-base line-clamp-2">{task.title}</h3>
                    <p className="text-(--text-secondary) text-xs sm:text-sm line-clamp-2">{task.description}</p>
                </div>
            </article>
        </>
    )
}
