import { TaskContext } from "@/app/contexts/taskcontext";
import { useSidebar } from "@/components/ui/sidebar";
import { useContext } from "react";

export default function GroupList(){
    const { groups } = useContext(TaskContext)!;

    const groupListEntries = groups.map((group) => (
        <div key={group.id}>
            <GroupListEntry name={group.name} groupid={group.id}/>
        </div>
    ));

    return (
        <div className="">
            <span className="mx-4 text-3xl font-semibold">Task Groups</span>
            <div>
                <GroupListEntry name={"All Tasks"} groupid={-1}/>
            </div>
            {groupListEntries}
        </div>

    );
}

function GroupListEntry({name, groupid} : {name: string, groupid: number}){
    const { setCurrentGroupId } = useContext(TaskContext)!;
    const { setOpenMobile } = useSidebar();


    return (
        <span 
            className="flex p-2 text-xl mx-3 rounded hover:bg-secondary-200 cursor-pointer"
            onClick={() => { 
                setCurrentGroupId(groupid);
                setOpenMobile(false);
            }}
        >
            {name}
        </span>
    );
}