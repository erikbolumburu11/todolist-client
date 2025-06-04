/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { Group, TaskContext } from "@/app/contexts/taskcontext";
import { groupSchema } from "@/app/schemas/groupschema";
import GroupDialogForm from "./group-dialog-form";
import { API_CONNECTION_STRING } from "../../../../../next.config";

export default function EditGroupDialogContent({group} : {group: Group}){
    const { groups, setGroups } = useContext(TaskContext)!;

    function onSubmit(values: z.infer<typeof groupSchema>){
        const updates: any = {};
        if(values.name !== group.name) updates.name = values.name;

        axios.post(API_CONNECTION_STRING + '/tasks/update/group/', {
            groupid: group.id,
            updates
        }, {
            withCredentials: true
        }).then((response) => {
            const data = response.data.data;

            setGroups(groups.map(group => {
                if(group.id === data.id) {
                    group.name = data.name;
                }
                return group;
            }));
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

    useEffect(() => {
        form.reset({
            name: group.name,
        });
    }, [group, form])

    return (
        <div>
            <DialogHeader>
                <DialogTitle>Edit Group</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <GroupDialogForm form={form} />
                    <DialogClose asChild>
                        <Button type="submit">Edit Group</Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
    );
}