import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Pen, Trash2 } from "lucide-react";
import { useContext, useState } from "react";

export default function TaskListItem({task} : {task: Task}){
    const [done, setDone] = useState(task.done);

    const { tasks, setTasks } = useContext(TaskContext)!;

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

    function deleteTask(){
        axios.post('http://localhost:8080/tasks/delete/', {
            taskid: task.id
        }, {
            withCredentials: true
        }).then(() => {
            setTasks(tasks.filter((obj) => {return obj !== task}));
        })
        .catch((error) => {
            console.log(error);
        })

    }

    return (
        <div className="flex items-center hover:bg-background-200">
            <input 
                className="mx-2 accent-primary" 
                type="checkbox"
                checked={done}
                onChange={handleChecked}
            />
            {task.name}
            <Button
                className="bg-inherit hover:bg-background-300 ms-3 shadow-none"
            >
                <Pen/>
            </Button>
            <Button
                className="bg-inherit hover:bg-background-300 shadow-none"
                onClick={deleteTask}
            >
                <Trash2/>
            </Button>
        </div>
    );
}