"use client"

import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { useContext } from "react";
import { UserContext } from "@/app/contexts/usercontext";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import TaskCheckbox from "./cells/task-checkbox";
import TaskDueDateLabel from "./cells/due-date-label";
import TaskActions from "./cells/task-actions";

export default function TaskList(){
    const { tasks } = useContext(TaskContext)!;
    const user = useContext(UserContext)!;

    const columnHelper = createColumnHelper<Task>();

    const columns = [
        columnHelper.accessor("done", {
            header: "Done",
            cell: (info) => <TaskCheckbox cell={info}/>
        }),
        columnHelper.accessor("name", {
            header: "Task",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("due", {
            header: "Due Date",
            cell: (info) => <TaskDueDateLabel cell={info}/>
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => {
                const task = info.row.original;

                return <TaskActions task={task}/>
            }
        })
    ]

    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if(user === null){
        return (
            <>
                <p>Login or Register!</p>
            </>
        );
    }

    if(tasks.length === 0) {
        return (
            <>
                <p>Add a task!</p>
            </>
        );
    }
    else{
        return(
            <div>
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        <p></p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}