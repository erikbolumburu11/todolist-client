"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { userSchema } from "../../schemas/userschema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { API_CONNECTION_STRING } from "../../../../next.config";
import { useState } from "react";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState("");

    function onSubmit(values: z.infer<typeof userSchema>){
        axios.post(API_CONNECTION_STRING + '/auth/register/', {
            username: values.username,
            password: values.password
        }, {
            withCredentials: true
        }).then(() => {
            axios.post(API_CONNECTION_STRING + '/auth/login/', {
                username: values.username,
                password: values.password
            }, {
                withCredentials: true
            }).then((response) => {
                localStorage.setItem('token', response.data.token);
                router.push('/tasks');
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
            setError(error.response.data);
        });
    }

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });

    return (
        <div className="m-10 max-w-100">
        <h1>Register</h1>
        <div className="mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="my-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-700 font-semibold"/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="my-3">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="password"
                                                autoComplete="off"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-700 font-semibold"/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button 
                            className="rounded cursor-pointer shadow-lg bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-300 hover:to-primary-500"
                            type="submit"
                        >
                            Register
                        </Button>
                        <p className="text-red-700 font-semibold mt-3">{error}</p>
                    </form>
                </Form>
        </div>
    </div>
  );
}
