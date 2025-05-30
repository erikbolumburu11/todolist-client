"use client"

import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";

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
            setTasks(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const value = useMemo(() => ({ tasks, setTasks }), [tasks]);

    return (
        <TaskContext.Provider value={value}>
            { children }
        </TaskContext.Provider>
    );
}