import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useForm } from "react-hook-form";
import { taskSchema } from "@/app/schemas/taskschema";
import { useContext } from "react";
import { TaskContext } from "@/app/contexts/taskcontext";
import { adjustForTimezone } from "./edit-task-dialog-content";
import TaskDialogForm from "./task-dialog-form";

export default function AddTaskDialogContent(){
    const { tasksByGroup, currentGroupId, setTasksForGroup } = useContext(TaskContext)!;
    const tasks = tasksByGroup[currentGroupId];

    function onSubmit(values: z.infer<typeof taskSchema>){
        console.log(values.due);
        axios.post('http://localhost:8080/tasks/new/task/', {
            taskName: values.name,
            due: adjustForTimezone(values.due),
            groupid: values.groupid
        }, {
            withCredentials: true
        }).then((response) => {
            const data = response.data;
            const newTask = {
                id: data.id,
                name: data.name,
                done: data.done,
                due: data.due,
                groupid: data.groupid
            };
            const updatedTasks = [...(tasks || []), newTask];
            setTasksForGroup(currentGroupId, updatedTasks);
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

    return (
        <div>
            <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <TaskDialogForm form={form} />
                    <DialogClose asChild>
                        <Button type="submit">Add Task</Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
    );
}