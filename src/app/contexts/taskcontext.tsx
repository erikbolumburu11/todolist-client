"use client"

import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface Task {
    id: number;
    name: string;
    done: boolean;
}

interface TaskContextType {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children } : {children: ReactNode}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tasks/getusertasks/', {
            withCredentials: true
        })
        .then((response) => {
            // setTasks([
            //     {id: 1, name: "walk dog", done: true}
            // ]);
            setTasks(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            { children }
        </TaskContext.Provider>
    );
}