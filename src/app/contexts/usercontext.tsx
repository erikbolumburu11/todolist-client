"use client"

import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import 'dotenv/config'
import { API_CONNECTION_STRING } from "../../../next.config";
import { useMemo } from "react";

export interface User {
    username: string;
}

interface UserContextType {
    user: User | null;
    userLoading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children } : {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        setUserLoading(true);
        axios.get(API_CONNECTION_STRING + '/auth/userdata/', {
            withCredentials: true
        })
        .then((response) => {
            setUser({username: response.data.username});
            setUserLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const value = useMemo(() => ({
        user,
        userLoading
    }), [user, userLoading])

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    );
}