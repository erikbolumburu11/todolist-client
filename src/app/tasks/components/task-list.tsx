"use client"

import { TaskContext } from "@/app/contexts/taskcontext";
import { useContext } from "react";
import TaskListItem from "./task-list-item";

export default function TaskList(){
    const { tasks } = useContext(TaskContext)!;

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