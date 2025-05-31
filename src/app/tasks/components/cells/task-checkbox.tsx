import { Task, TaskContext } from "@/app/contexts/taskcontext";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";



export default function TaskCheckbox({ task }: { task: Task }) {
    const { tasksByGroup, currentGroupId, setTasksForGroup} = useContext(TaskContext)!;
    const tasks = tasksByGroup[currentGroupId];
    const [done, setDone] = useState(task.done);

    const handleChecked = () => {
        const isDone: boolean = !done;
        setDone(isDone);

        const updatedTasks = tasks.map((t: Task) => (
            t.id === task.id ? {...t, done:isDone} : t
        ));
        setTasksForGroup(currentGroupId, updatedTasks);

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

    return <input
        className="flex mx-auto accent-primary w-4 h-4"
        type="checkbox" 
        checked={done} 
        onChange={handleChecked}/>;
}