import { Task } from "@/app/contexts/taskcontext";
import { CellContext } from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";



export default function TaskCheckbox({ cell }: { cell: CellContext<Task, boolean> }) {
    const [done, setDone] = useState(cell.row.original.done);

    const handleChecked = () => {
        const isDone: boolean = !done;

        setDone(isDone);

        axios.post('http://localhost:8080/tasks/setdone/', {
            taskid: cell.row.original.id,
            done: isDone 
        }, {
            withCredentials: true
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return <input
        className="flex items-center accent-primary w-4 h-4"
        type="checkbox" 
        checked={done} 
        onChange={handleChecked}/>;
}