import TaskList from "./components/task-list";

export default function Tasks() {
    return(
        <div className="m-10">
            <h1 className="md:text-start text-center">Tasks</h1>
            <div className="mt-3">
                <TaskList/>
            </div>
        </div>
    );
}