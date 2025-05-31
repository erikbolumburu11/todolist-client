"use client"

import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { useContext } from "react";
import { UserContext } from "@/app/contexts/usercontext";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import TaskCheckbox from "./cells/task-checkbox";
import TaskDueDateLabel from "./cells/due-date-label";
import TaskActions from "./cells/task-actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useMediaQuery } from "@/app/utils/useMediaQuery";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderButton from "./header-button";

export default function TaskList(){
    const { tasks } = useContext(TaskContext)!;
    const user = useContext(UserContext)!;
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");

    const columnHelper = createColumnHelper<Task>();

    const columns = [
        columnHelper.accessor("done", {
            header: ({ column }) => {
                return (
                    <HeaderButton title="" column={column}/>
                )
        },
            cell: (info) => <TaskCheckbox task={info.row.original}/>,
        }),
        columnHelper.accessor("name", {
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Task
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
        },
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("due", {
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Due Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
        },
            cell: (info) => <TaskDueDateLabel date={info.row.original.due}/>,
            sortingFn: 'datetime',
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

    const [ sorting, setSorting ] = useState<SortingState>([]);

    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    if(user === null) return ( <> <p>Login or Register!</p> </>); 
    if(tasks.length === 0) return ( <> <p>Add a task!</p> </>);

    if(isMobile){
        const taskCards = tasks.map((task) => (
            <div key={task.id} className="">
                <Card className="rounded-2xl my-3 shadow">
                    <CardHeader>
                        <div className="flex items-center">
                            <TaskCheckbox task={task}/>
                            <CardTitle className="mx-3 text-xl">{task.name}</CardTitle>
                        </div>
                        <CardAction>
                            <TaskActions task={task}/>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <TaskDueDateLabel date={task.due}/>
                    </CardContent>
                </Card>
            </div>
        ));
        return (
            <div className="">
                {taskCards}
            </div>
        );
    }

    return(
        <div className="w-fit">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="hover:bg-secondary-100">
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    <p></p>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

}