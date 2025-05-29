"use client"

import { TaskContext } from "@/app/contexts/taskcontext";
import { useContext } from "react";
import TaskListItem from "./task-list-item";

export default function TaskList(){
    const taskContext = useContext(TaskContext);

    if(!taskContext){
        return <p>Loading Tasks</p>;
    }

    const { tasks } = taskContext;

    console.log(tasks);

    const taskListItems = tasks.map(task => 
        <div key={task.id}>
            <TaskListItem task={task}/>
        </div>
    );

    return(
        <div>
            {taskListItems}
        </div>
    );
}