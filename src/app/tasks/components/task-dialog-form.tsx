import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns/format";
import { CalendarIcon, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export default function TaskDialogForm({form} : {form: UseFormReturn<{ name: string; due?: Date | null | undefined; }, { name: string; due?: Date | null | undefined; }>}){
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
        </>
    );
}