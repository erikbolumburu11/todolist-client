import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pen, Trash2 } from "lucide-react";
import EditTaskDialogContent from "../edit-task-dialog-content";
import axios from "axios";
import { useContext } from "react";

export default function TaskActions({task} : {task: Task}){
    const { tasksByGroup, currentGroupId, setTasksForGroup } = useContext(TaskContext)!;
    const tasks = tasksByGroup[currentGroupId];

    function deleteTask(){
        axios.post('http://localhost:8080/tasks/delete/', {
            taskid: task.id
        }, {
            withCredentials: true
        }).then(() => {
            setTasksForGroup(currentGroupId, tasks.filter((obj) => {return obj !== task}));
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
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
        </>
    );
}