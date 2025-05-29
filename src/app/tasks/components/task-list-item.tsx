import { Task } from "@/app/contexts/taskcontext";
import axios from "axios";
import { useState } from "react";

export default function TaskListItem({task} : {task: Task}){
    const [done, setDone] = useState(task.done);

    const handleChecked = () => {
        const isDone: boolean = !done;

        setDone(isDone);

        axios.post('http://localhost:8080/tasks/setdone/', {
            taskid: task.id,
            done: isDone 
        }, {
            withCredentials: true
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <input 
                className="mx-2 accent-primary" 
                type="checkbox"
                checked={done}
                onChange={handleChecked}
            />
            {task.name}
        </div>
    );
}