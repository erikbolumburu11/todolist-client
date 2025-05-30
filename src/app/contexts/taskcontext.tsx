"use client"

import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./usercontext";

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
    const user = useContext(UserContext);

    useEffect(() => {
        if(user === null) return;
        axios.get('http://localhost:8080/tasks/getusertasks/', {
            withCredentials: true
        })
        .then((response) => {
            setTasks(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [user]);

    const value = useMemo(() => ({ tasks, setTasks }), [tasks]);

    return (
        <TaskContext.Provider value={value}>
            { children }
        </TaskContext.Provider>
    );
}