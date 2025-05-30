import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { CalendarIcon, Pen, Trash2 } from "lucide-react";
import { useContext } from "react";
import EditTaskDialogContent from "./edit-task-dialog-content";
import { format, formatDistanceStrict, isFuture, isToday, isTomorrow } from "date-fns";

export default function TaskListItem({task} : {task: Task}){

    const { tasks, setTasks } = useContext(TaskContext)!;

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
        <div className="flex rounded-2xl p-3 hover:bg-background-200 my-3">
            <div className="flex items-center gap-2">
                <input 
                    className="mx-2 accent-primary w-5 h-5" 
                    type="checkbox"
                    checked={done}
                    onChange={handleChecked}
                />
                <span className="break-words text-xl max-w-3/4">{task.name}</span>
            </div>

            <div className="flex items-center ms-auto gap-1 text-sm">
                <DueDateLabel date={task.due}/>
                <DistanceFromDateLabel date={task.due}/>
            </div>

            <div className="flex gap-1">
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