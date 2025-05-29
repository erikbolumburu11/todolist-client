import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useForm } from "react-hook-form";
import { taskSchema } from "@/app/schemas/taskschema";
import { useContext } from "react";
import { TaskContext } from "@/app/contexts/taskcontext";

export default function AddTaskDialogContent(){
    const { tasks, setTasks} = useContext(TaskContext)!;


    function onSubmit(values: z.infer<typeof taskSchema>){
        axios.post('http://localhost:8080/tasks/new/', {
            taskName: values.name,
        }, {
            withCredentials: true
        }).then((response) => {
            const data = response.data;
            setTasks(prev => [...prev, {id: data.id, name: data.name, done: data.done}]);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            name: ""
        },
    });

    return (
        <div>
            <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className="my-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Task Title" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogClose asChild>
                        <Button type="submit">Add Task</Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
    );
}