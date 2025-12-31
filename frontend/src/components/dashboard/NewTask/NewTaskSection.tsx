'use client'
import React from 'react'
import NewTask from './NewTask'

function NewTaskSection() {
    const [ newTaskPanel, setNewTaskPanel ] = React.useState<boolean>(false)
    return (
        <section>
            <button onClick={ () => setNewTaskPanel(prev => !prev) }
            className="bg-(--color-primary) hover:bg-(--color-primary)/50 text-white font-bold py-2 px-4 rounded">
            Agregar tarea</button>
            {newTaskPanel && <NewTask setNewTaskPanel={setNewTaskPanel} requiredOptionalsInputs={true}/>}
        </section>
    )
}

export default NewTaskSection