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
import { useMediaQuery } from "@/app/utils/useMediaQuery";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderButton from "./header-button";
import { getGroupName } from "./task-dialog-form";

export default function TaskList(){
    const { groups, tasksByGroup, currentGroupId } = useContext(TaskContext)!;
    const tasks = tasksByGroup[currentGroupId];

    const user = useContext(UserContext)!;
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");

    const columnHelper = createColumnHelper<Task>();

    const columns = [
        columnHelper.accessor("done", {
            header: ({ column }) => {
                return (
                    <HeaderButton title="" center={true} column={column}/>
                )
        },
            cell: (info) => <TaskCheckbox task={info.row.original}/>,
        }),
        columnHelper.accessor("name", {
            header: ({ column }) => {
                return (
                    <HeaderButton title="Task" column={column}/>
                )
        },
            cell: (info) => <TaskTitle name={info.row.original.name}/>,
        }),
        columnHelper.accessor("due", {
            header: ({ column }) => {
                return (
                    <HeaderButton title="Due Date" column={column}/>
                )
        },
            cell: (info) => <TaskDueDateLabel date={info.row.original.due}/>,
            sortingFn: 'datetime',
        }),
        columnHelper.accessor("groupid", {
            header: ({ column }) => {
                return (
                    <HeaderButton title="Group" column={column}/>
                )
        },
            cell: (info) => getGroupName(groups[info.row.original.groupid - 1]),
        }),
        columnHelper.display({
            id: "actions",
            header: "",
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
    if(!tasks || tasks.length === 0) return ( <> <p>Add a task!</p> </>);

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
        <div className="min-w-fit w-full shadow-xl border border-accent-400">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead className="bg-background-100" key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="hover:bg-secondary-100 border-background-400">
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

}

function TaskTitle({name} : {name: string}){
    return (
        <div className="font-semibold">{name}</div>
    );
}