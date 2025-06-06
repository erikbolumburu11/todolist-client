"use client"

import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./usercontext";
import { API_CONNECTION_STRING } from "../../../next.config";

export const UNGROUPED_KEY = -1;

export type Task = {
    id: number;
    name: string;
    done: boolean;
    due: Date;
    groupid: number;
}

export type Group = {
    id: number;
    name: string;
}

interface TaskContextType {
    groups: Group[];
    addGroup: (group: Group) => void;
    setGroups: Dispatch<SetStateAction<Group[]>>;
    currentGroupId: number;
    setCurrentGroupId: Dispatch<SetStateAction<number>>;
    tasksByGroup: Record<number, Task[]>;
    setTasksForGroup: (groupId: number, tasks: Task[]) => void;
    tasksLoading: boolean;
    groupsLoading: boolean;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children } : {children: ReactNode}) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [currentGroupId, setCurrentGroupId] = useState<number>(-1);
    const [tasksByGroup, setTasksByGroup] = useState<Record<number, Task[]>>({});

    const [tasksLoading, setTasksLoading] = useState(false);
    const [groupsLoading, setGroupsLoading] = useState(false);

    const user = useContext(UserContext);

    useEffect(() => {
        if(user === null) return;
        setGroupsLoading(true);
        axios.get(API_CONNECTION_STRING + '/tasks/get/groups/', {
            withCredentials: true
        })
        .then((response) => {
            setGroups(response.data);
            setCurrentGroupId(-1);
            setGroupsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [user]);

    useEffect(() => {
        if(user === null) return;
        setTasksLoading(true);
        if(currentGroupId == null){
            axios.get(API_CONNECTION_STRING + `/tasks/get/`, { withCredentials: true })
            .then((response) => {
                setTasksByGroup(prev => ({
                    ...prev,
                    [-1]: response.data
                }));
                setTasksLoading(false);
            })
            .catch(console.error);
        }

        axios.get(API_CONNECTION_STRING + `/tasks/get/${currentGroupId}`, { withCredentials: true })
            .then((response) => {
                setTasksByGroup(prev => ({
                    ...prev,
                    [currentGroupId!]: response.data
                }));
                setTasksLoading(false);
            })
            .catch(console.error);
    }, [currentGroupId, user]);

    const setTasksForGroup = (groupId: number, tasks: Task[]) => {
        setTasksByGroup(prev => ({
            ...prev,
            [groupId]: tasks
        }));
    }

    const addGroup = (group: Group) => {
        setGroups(prev => [...prev, group]);
    }

    const value = useMemo(() => ({
        groups,
        addGroup,
        setGroups,
        currentGroupId,
        setCurrentGroupId,
        tasksByGroup,
        setTasksForGroup,
        tasksLoading,
        groupsLoading
    }), [groups, currentGroupId, tasksByGroup, tasksLoading, groupsLoading])

    return (
        <TaskContext.Provider value={value}>
            { children }
        </TaskContext.Provider>
    );
}