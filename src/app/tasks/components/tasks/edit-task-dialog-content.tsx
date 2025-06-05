/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useForm } from "react-hook-form";
import { taskSchema } from "@/app/schemas/taskschema";
import { useContext, useEffect } from "react";
import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { addMinutes, subMinutes } from "date-fns";
import TaskDialogForm from "./task-dialog-form";
import { API_CONNECTION_STRING } from "../../../../../next.config";

export function adjustForTimezone(date: Date | undefined | null){
    if(date === null || date === undefined) return;
    const offset = date.getTimezoneOffset();
    return offset > 0 ? subMinutes(date, offset) : addMinutes(date, Math.abs(offset));
}

export default function EditTaskDialogContent({task} : {task: Task}){
    const { tasksByGroup, currentGroupId, setTasksForGroup } = useContext(TaskContext)!;
    const tasks = tasksByGroup[currentGroupId];

    function onSubmit(values: z.infer<typeof taskSchema>){
        const updates: any = {};
        if(values.name !== task.name) updates.name = values.name;
        if(adjustForTimezone(values.due) !== task.due) updates.due = adjustForTimezone(values.due);
        if(values.due === undefined || values.due === null) updates.due = null;
        updates.groupid = values.groupid;

        axios.post(API_CONNECTION_STRING + '/tasks/update/task/', {
            taskid: task.id,
            updates
        }, {
            withCredentials: true
        }).then((response) => {
            const data = response.data.data;

            setTasksForGroup(currentGroupId, tasks.map(task => {
                if(task.id === data.id) {
                    task.name = data.name;
                    task.done = data.done;
                    task.due = data.due;
                    task.groupid = data.groupid;
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
            due: undefined,
        },
    });

    // Set form defaults
    useEffect(() => {
        form.reset({
            name: task.name,
            due: task.due ? new Date(task.due) : undefined,
            groupid: task.groupid
        });
    }, [task, form])

    return (
        <div>
            <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <TaskDialogForm form={form} task={task}/>
                    <DialogClose asChild>
                        <Button 
                        className="rounded shadow-lg bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-300 hover:to-primary-500"
                        type="submit"
                    >
                        Save Changes
                    </Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
    );
}