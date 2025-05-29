import { Task } from "@/app/contexts/taskcontext";
import { useState } from "react";

export default function TaskListItem({task} : {task: Task}){
    const [done, setDone] = useState(task.done);

    const handleChecked = () => {
        setDone(!done);
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