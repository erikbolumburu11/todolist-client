"use client"

import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface User {
    username: string;
}

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children } : {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/auth/userdata/', {
            withCredentials: true
        })
        .then((response) => {
            setUser({username: response.data.username});
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    );
}