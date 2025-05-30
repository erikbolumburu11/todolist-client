"use client"

import { TaskContext } from "@/app/contexts/taskcontext";
import { useContext } from "react";
import TaskListItem from "./task-list-item";
import { UserContext } from "@/app/contexts/usercontext";

export default function TaskList(){
    const { tasks } = useContext(TaskContext)!;
    const user = useContext(UserContext)!;

    const taskListItems = tasks.map(task => 
        <div key={task.id}>
            <TaskListItem task={task}/>
        </div>
    );

    if(user === null){
        return (
            <>
                <p>Login or Register!</p>
            </>
        );
    }

    if(tasks.length === 0) {
        return (
            <>
                <p>Add a task!</p>
            </>
        );
    }
    else{
        return(
            <div>
                {taskListItems}
            </div>
        );
    }
}