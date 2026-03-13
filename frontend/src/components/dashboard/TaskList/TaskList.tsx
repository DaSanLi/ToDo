import { fetchApi } from "@/src/scripts.ts/scripts"
import NewTaskSection from "../NewTask/NewTaskSection"
import Tasks from "./Tasks"
import { cookies } from "next/dist/server/request/cookies";
import { Task } from "./types";
import { FetchOptions } from "@/src/scripts.ts/types";

const query = 
`query {
    FindAllTasks {
        findAllTasks {
            description
            id
            priority
            title
        }
    }
}`

async function TaskList() {
    const cookieStore = await cookies();
    const cookieAuth = cookieStore.toString();
//     let tasks: Task[] | null = await fetchApi("",{ credentials: 'include', headers: { 'Cookie': cookieAuth, 'Content-Type': 'application/json' }, body: JSON.stringify({query:
//         `query {
//     FindAllTasks {
//         findAllTasks {
//             description
//             id
//             priority
//             title
//         }
//     }
// }`
// }) });

const options: FetchOptions = {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "Cookie": cookieAuth 
    },
    body: JSON.stringify({ query }) 
};

const response = await fetchApi<{ data: { findAllTasks: Task[] } }>("", options);

const allTasks = response?.data?.findAllTasks || [];

console.log(allTasks)

// const tasks = await fetchApi<{ data: { findAllTasks: Task[] } }>("", fetchOptions);

    // if (!tasks || (tasks?.length !== 0 && tasks?.length < 1)) {
    //     tasks = [];
    // }
    return (
        <section
            className="w-full h-full px-4 py-10 bg-(--bg-primary)"
            aria-label="Tablero de tareas"
        >
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-(--text-primary)">
                    Tablero de tareas
                </h1>
                {/* form para agregar nueva tarea */}
                {/* <NewTaskSection /> */}
            </header>
            {/* Grid de tareas */}
            <div
                className="grid gap-4
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4"
            >
                {/* Aquí van las cards/tareas */}
                {/* <Tasks tasks={tasks} /> */}
            </div>
        </section>
    )
}

export default TaskList