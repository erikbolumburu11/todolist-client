import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TaskContext } from "@/app/contexts/taskcontext";
import { groupSchema } from "@/app/schemas/groupschema";
import GroupDialogForm from "./group-dialog-form";
import 'dotenv/config'

export default function AddGroupDialogContent(){
    const { addGroup } = useContext(TaskContext)!;

    function onSubmit(values: z.infer<typeof groupSchema>){
        axios.post(process.env.NEXT_PUBLIC_API_URL + '/tasks/new/group/', {
            groupName: values.name,
        }, {
            withCredentials: true
        }).then((response) => {
            const data = response.data;
            const newGroup = {
                id: data.id,
                name: data.name,
            };
            addGroup(newGroup); // MAY NOT WORK, SEE TASKCONTEXT
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const form = useForm<z.infer<typeof groupSchema>>({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            name: "",
        },
    });

    return (
        <div>
            <DialogHeader>
                <DialogTitle>Add Group</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <GroupDialogForm form={form} />
                    <DialogClose asChild>
                        <Button type="submit">Add Group</Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
    );
}