import { TaskProvider } from "../contexts/taskcontext";
import TaskList from "./components/task-list";

export default function Tasks() {

    return(
        <TaskProvider>
            <div className="m-10">
                <h1>Tasks</h1>
                <TaskList/>
            </div>
        </TaskProvider>
    );
}