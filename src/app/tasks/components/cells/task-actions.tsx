import { Task, TaskContext } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pen, Trash2 } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import EditTaskDialogContent from "../tasks/edit-task-dialog-content";

export default function TaskActions({task} : {task: Task}){
    const { tasksByGroup, currentGroupId, setTasksForGroup } = useContext(TaskContext)!;
    const tasks = tasksByGroup[currentGroupId];

    function deleteTask(){
        axios.post('http://localhost:8080/tasks/delete/task/', {
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
        <div className="flex ml-auto items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mx-1 ml-auto hover:bg-accent-200 shadow bg-background-100 rounded">
                        <Pen/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <EditTaskDialogContent task={task}/>
                </DialogContent>
            </Dialog>
            <Button
                className="mx-1 hover:bg-accent-200 shadow bg-background-100 rounded"
                onClick={deleteTask}
            >
                <Trash2/>
            </Button>
        </div>
    );
}