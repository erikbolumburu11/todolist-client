import { Task, TaskContext } from "@/app/contexts/taskcontext";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import 'dotenv/config'
import { API_CONNECTION_STRING } from "../../../../../next.config";

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

        axios.post(API_CONNECTION_STRING + '/tasks/setdone/', {
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
        className="flex md:mx-auto accent-primary md:w-4 md:h-4 w-5 h-5 cursor-pointer"
        type="checkbox" 
        checked={done} 
        onChange={handleChecked}/>;
}