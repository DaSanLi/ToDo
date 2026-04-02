'use client'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Task, taskStatus } from '../TaskList/types'
import KanbanCard from './KanbanCard'

interface Props {
    id: taskStatus
    title: string
    tasks: Task[]
}

export default function KanbanColumn({ id, title, tasks }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id })

    return (
        <div
            ref={setNodeRef}
            className={`shrink-0 w-[85vw] sm:w-72 md:w-80 flex flex-col gap-3 p-3 sm:p-4 rounded-xl 
                bg-(--bg-secondary) border border-(--border-color)
                snap-center
                ${isOver ? 'ring-2 ring-(--color-primary) bg-(--color-primary)/5' : ''}`}
        >
            <header className="flex items-center justify-between pb-2 border-b border-(--border-color)">
                <h2 className="text-(--text-primary) font-semibold text-sm sm:text-base">{title}</h2>
                <span className="px-2 py-0.5 text-xs rounded-full bg-(--color-primary)/20 text-(--color-primary)">
                    {tasks.length}
                </span>
            </header>
            <div className="flex flex-col gap-2 sm:gap-3 min-h-37.5 sm:min-h-50 overflow-y-auto">
                <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.length === 0 ? (
                        <div className="flex items-center justify-center h-20 text-(--text-secondary) text-sm opacity-50">
                            Sin tareas
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <KanbanCard key={task.id} task={task} />
                        ))
                    )}
                </SortableContext>
            </div>
        </div>
    )
}
