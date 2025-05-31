/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export default function HeaderButton({title, column } : {title: string, column: Column<Task, any>}){
    return (
        <Button
            className="hover:bg-secondary-200 rounded"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
}