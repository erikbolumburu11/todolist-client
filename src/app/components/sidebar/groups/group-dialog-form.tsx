/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group } from "@/app/contexts/taskcontext";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn} from "react-hook-form";

export default function GroupDialogForm(
    {form} : 
    {
        form: UseFormReturn<any>,
        group?: Group
    })
{
    return (
        <div className="my-3">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Group Title</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Task Title" 
                                {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    );
}