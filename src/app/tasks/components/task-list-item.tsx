import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { CalendarIcon, Pen, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import EditTaskDialogContent from "./edit-task-dialog-content";
import { format, formatDistanceStrict, isFuture, isToday, isTomorrow } from "date-fns";

export default function TaskListItem({task} : {task: Task}){
    const [done, setDone] = useState(task.done);

    const { tasks, setTasks } = useContext(TaskContext)!;

    const handleChecked = () => {
        const isDone: boolean = !done;

        setDone(isDone);

        axios.post('http://localhost:8080/tasks/setdone/', {
            taskid: task.id,
            done: isDone 
        }, {
            withCredentials: true
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function deleteTask(){
        axios.post('http://localhost:8080/tasks/delete/', {
            taskid: task.id
        }, {
            withCredentials: true
        }).then(() => {
            setTasks(tasks.filter((obj) => {return obj !== task}));
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="flex items-center hover:bg-background-200">
            <input 
                className="mx-2 accent-primary" 
                type="checkbox"
                checked={done}
                onChange={handleChecked}
            />
            {task.name}
            <DueDateLabel date={task.due}/>
            <DistanceFromDateLabel date={task.due}/>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-inherit hover:bg-background-300 shadow-none">
                        <Pen/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <EditTaskDialogContent task={task}/>
                </DialogContent>
            </Dialog>
            <Button
                className="bg-inherit hover:bg-background-300 shadow-none"
                onClick={deleteTask}
            >
                <Trash2/>
            </Button>
        </div>
    );
}

function DueDateLabel({date} : {date: Date}){
    if(!date) return null;

    return (
        <>
            <span className="ms-5 me-2"><CalendarIcon size={20}/></span> {format(date, 'P')}
        </>
    );
}

function DistanceFromDateLabel({date} : {date: Date}) {
    if(!date) return null;

    if(isToday(date)){
        return(
            <span className="px-1">(Today)</span>
        );
    }

    if(isTomorrow(date)){
        return(
            <span className="px-1">(Tomorrow)</span>
        );
    }

    if(isFuture(date)){
        return(
            <span className="px-1">(Due in {formatDistanceStrict(date, new Date().toDateString())})</span>
        );
    }

    return(
        <span className="px-1">(Due {formatDistanceStrict(new Date().toDateString(), date)} ago)</span>
    );
}