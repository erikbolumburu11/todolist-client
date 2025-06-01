/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export default function HeaderButton({title, center, column } : {title: string, center?: boolean, column: Column<Task, any>}){
    const buttonClassName = center ? 
        "flex mx-auto hover:bg-secondary-200 rounded cursor-pointer" :
        "hover:bg-secondary-200 rounded cursor-pointer";

    const arrowClassname = title ? "ml-2 h-4 w-4" : "h-4 w-4";
    return (
        <Button
            className={buttonClassName}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className={arrowClassname} />
        </Button>
    );
}