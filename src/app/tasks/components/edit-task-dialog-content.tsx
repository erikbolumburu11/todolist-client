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
import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { Calendar } from "@/components/ui/calendar";
import { addMinutes, subMinutes } from "date-fns";

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
                    <div className="my-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Task Title" 
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="my-3">
                        <FormField
                            control={form.control}
                            name="due"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button 
                                                variant={"outline"}
                                                className="justify-start text-left font"
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                className="bg-background-100"
                                                mode="single"
                                                selected={field.value!}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogClose asChild>
                        <Button type="submit">Save Changes</Button>
                    </DialogClose>
                </form>
            </Form>
    </div>
    );
}