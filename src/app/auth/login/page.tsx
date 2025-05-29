"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { userSchema } from "../../schemas/userschema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

function onSubmit(values: z.infer<typeof userSchema>){
    axios.post('http://localhost:8080/auth/login/', {
        username: values.username,
        password: values.password
    }, {
        withCredentials: true
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        redirect('/tasks');
    });
}

export default function Login() {
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });
  return (
    <div className="m-10 max-w-100">
      <h1>Login</h1>
      <div className="mt-5">
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
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">Log in</Button>
                </form>
            </Form>
      </div>
    </div>
  );
}
