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

const defaultContext: TaskContextType = {
  tasks: [],
  setTasks: () => { throw new Error("setTasks not implemented") }
};

export const TaskContext = createContext<TaskContextType | null>(defaultContext);

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

    useEffect(() => {
        console.log("Tasks updated:", tasks);
    }, [tasks]);

    const value = useMemo(() => ({ tasks, setTasks }), [tasks]);

    return (
        <TaskContext.Provider value={value}>
            { children }
        </TaskContext.Provider>
    );
}