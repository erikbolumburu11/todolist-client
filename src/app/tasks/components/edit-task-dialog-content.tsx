import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useForm } from "react-hook-form";
import { taskSchema } from "@/app/schemas/taskschema";
import { useContext } from "react";
import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { addMinutes, subMinutes } from "date-fns";
import TaskDialogForm from "./task-dialog-form";

export function adjustForTimezone(date: Date | undefined | null){
    if(date === null || date === undefined) return;
    const offset = date.getTimezoneOffset();
    return offset > 0 ? subMinutes(date, offset) : addMinutes(date, Math.abs(offset));
}

export default function AddTaskDialogContent({task} : {task: Task}){
    const { tasks, setTasks} = useContext(TaskContext)!;


    function onSubmit(values: z.infer<typeof taskSchema>){
        axios.post('http://localhost:8080/tasks/update/', {
            taskid: task.id,
            "updates": {
                "name": values.name,
                "due": adjustForTimezone(values.due)
            }
        }, {
            withCredentials: true
        }).then((response) => {
            const data = response.data.data;

            setTasks(tasks.map(task => {
                if(task.id === data.id) {
                    console.log(data.due);
                    task.name = data.name;
                    task.done = data.done;
                    task.due = data.due;
                }
                return task;
            }));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            name: "",
            due: undefined
        },
    });

    form.setValue('name', task.name);
    form.setValue('due', task.due);

    return (
        <div>
            <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <TaskDialogForm form={form} />
                    <DialogClose asChild>
                        <Button type="submit">Save Changes</Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
    );
}