"use client"

import { useState } from "react";
import TaskList from "./components/tasks/task-list";
import { useContext } from "react";
import { TaskContext } from "../contexts/taskcontext";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import { UserContext } from "../contexts/usercontext";

export default function Tasks() {
    const [loading, setLoading] = useState(true);
    const { tasksLoading, groupsLoading } = useContext(TaskContext)!;
    const { userLoading } = useContext(UserContext)!;

    useEffect(() => {
        if(tasksLoading || groupsLoading || userLoading){
            setLoading(true);
        }
        else {
            setLoading(false);
        }
    }, [tasksLoading, groupsLoading, userLoading])

    if(loading) return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-lg">
            <FadeLoader/>
        </div>
    );

    return(
        <div className="mx-10">
            <h1 className="md:text-start text-center">Tasks</h1>
            <div className="mt-3">
                <TaskList/>
            </div>
        </div>
    );
}
