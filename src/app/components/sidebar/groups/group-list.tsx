import { Group, TaskContext } from "@/app/contexts/taskcontext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSidebar } from "@/components/ui/sidebar";
import { Pen, Plus, Trash2 } from "lucide-react";
import { useContext } from "react";
import AddGroupDialogContent from "./add-group-dialog-content";
import axios from "axios";
import EditGroupDialogContent from "./edit-group-dialog-content";

export default function GroupList(){
    const { groups, setGroups} = useContext(TaskContext)!;

    const groupListEntries = groups.map((group) => (
        <div key={group.id}>
            <div className="flex items-center w-full text-xl rounded hover:bg-secondary-200 cursor-pointer">
                <GroupListEntry name={group.name} groupid={group.id}/>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mx-1 ml-auto hover:bg-accent-200 shadow bg-background-100 rounded">
                            <Pen/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <EditGroupDialogContent group={group}/>
                    </DialogContent>
                </Dialog>
                <Button
                    className="flex mx-1 hover:bg-accent-200 shadow bg-background-100 rounded items-center"
                    onClick={() => deleteGroup(group)}
                >
                    <Trash2/>
                </Button>
            </div>
        </div>
    ));

    function deleteGroup(group: Group){
        axios.post('http://localhost:8080/tasks/delete/group/', {
            groupid: group.id
        }, {
            withCredentials: true
        }).then(() => {
            setGroups(groups.filter((obj) => {return obj !== group}));
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="">
            <div className="flex items-center">
                <span className="mx-4 text-3xl font-semibold">Task Groups</span>
                    <Dialog>
                        <DialogTrigger asChild className="ml-auto items-center">
                            <Button className="mx-1 ml-auto hover:bg-accent-200 shadow bg-background-100 rounded">
                                <Plus/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <AddGroupDialogContent/>
                        </DialogContent>
                    </Dialog>
            </div>
            <div>
                <GroupListEntry name={"All Tasks"} groupid={-1}/>
            </div>
            <div className="items-center">
                {groupListEntries}
            </div>
        </div>

    );
}

function GroupListEntry({name, groupid} : {name: string, groupid: number}){
    const { setCurrentGroupId } = useContext(TaskContext)!;
    const { setOpenMobile } = useSidebar();


    return (
        <span 
            className="flex items-center max-w-full p-2 px-5 text-xl rounded hover:bg-secondary-200 cursor-pointer"
            onClick={() => { 
                setCurrentGroupId(groupid);
                setOpenMobile(false);
            }}
        >
            {name}
        </span>
    );
}