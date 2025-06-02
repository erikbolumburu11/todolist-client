/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Task, TaskContext } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns/format";
import { CalendarIcon, GroupIcon, X } from "lucide-react";
import { useContext } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

export default function TaskDialogForm(
    {form} : 
    {
        form: UseFormReturn<any>,
        task?: Task
    })
{
    return (
        <>
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
                                <div className="w-1/1">
                                    <PopoverTrigger asChild>
                                        <Button 
                                            variant={"outline"}
                                            className="justify-start text-left w-9/10"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {field.value ? format(field.value, "PPP") : <span>No Date Selected</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <Button 
                                        type="button"
                                        onClick={() => {form.setValue("due", undefined)}}
                                        className="w-1/10"
                                    >
                                        <X/>
                                    </Button>
                                </div>
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
            <div className="my-3">
                <FormField
                    control={form.control}
                    name="groupid"
                    render={() => (
                        <FormItem>
                            <FormLabel>Task Group</FormLabel>
                            <DropdownMenu>
                                <GroupDropdownTrigger form={form}/>
                                <DropdownMenuContent className="bg-background-100">
                                    <DropdownMenuRadioGroup>
                                        <DropDropdownEntries form={form}/>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </FormItem>
                    )}
                />
            </div>
        </>
    );
}

export function getGroupName(group: Group): string {
    if(group === null || group === undefined) return "None";
    return group.name;
}

function DropDropdownEntries({form} : {
        form: UseFormReturn<any>
}){ 
    const { groups } = useContext(TaskContext)!;
    
    const groupEntries = groups.map((group, index) => (
        <DropdownMenuItem 
            key={group.id}
            className="hover:bg-accent-300 my-1" 
            onClick={() => {
                form.setValue("groupid", group.id);
            }}
        >
            {getGroupName(groups[index])}
        </DropdownMenuItem>
    ))
    return (
        <div>
            <DropdownMenuItem
                className="hover:bg-accent-300 my-1" 
                onClick={() => {
                    form.setValue("groupid", -1);
                }}
            >
                No Group
            </DropdownMenuItem>
            {groupEntries}
        </div>
    );
};



function GroupDropdownTrigger({form} : {
    form: UseFormReturn<any>
}){
    const { groups } = useContext(TaskContext)!;

    const selectedGroupId = useWatch({
        control: form.control,
        name: "groupid",
    })

    let dropdownLabel = "None"
    const group = groups.find((group) => group.id === selectedGroupId);

    if(group) dropdownLabel = group.name;

    return (
        <DropdownMenuTrigger className="border h-9 hover:bg-secondary">
            <div className="flex items-center">
                <GroupIcon className="ms-3" size={20}/>
                <span className="font-semibold ms-3 text-sm">{dropdownLabel}</span>
            </div>
        </DropdownMenuTrigger>
    );
}