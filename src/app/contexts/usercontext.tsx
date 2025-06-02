"use client"

import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import 'dotenv/config'

export interface User {
    username: string;
}

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children } : {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + '/auth/userdata/', {
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