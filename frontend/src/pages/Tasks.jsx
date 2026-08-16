import { useEffect, useState } from "react";
import axios from "axios";
import {
    CheckCircle2,
    Clock3,
    Circle,
    RefreshCw,
    ListTodo,
} from "lucide-react";

const API = "http://localhost:8080";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const projectsResponse = await axios.get(
                `${API}/api/projects`,
                config
            );

            const projects = projectsResponse.data || [];

            const taskResults = await Promise.all(
                projects.map(async (project) => {
                    try {
                        const response = await axios.get(
                            `${API}/api/projects/${project.id}/tasks`,
                            config
                        );

                        return (response.data || []).map((task) => ({
                            ...task,
                            projectName: project.name,
                            projectId: project.id,
                        }));
                    } catch (err) {
                        console.error(
                            `Failed to load tasks for project ${project.id}`,
                            err
                        );

                        return [];
                    }
                })
            );

            setTasks(taskResults.flat());
        } catch (err) {
            console.error("Failed to load tasks:", err);

            setError(
                "Unable to load your tasks. Make sure the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        if (status === "DONE") {
            return (
                <CheckCircle2
                    size={20}
                    className="text-emerald-400"
                />
            );
        }

        if (status === "IN_PROGRESS") {
            return (
                <Clock3
                    size={20}
                    className="text-cyan-400"
                />
            );
        }

        return (
            <Circle
                size={20}
                className="text-violet-300"
            />
        );
    };

    const getPriorityStyle = (priority) => {
        if (priority === "HIGH") {
            return "bg-red-500/10 text-red-300 border-red-500/20";
        }

        if (priority === "MEDIUM") {
            return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
        }

        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
    };

    const todoTasks = tasks.filter(
        (task) => task.status === "TODO"
    );

    const inProgressTasks = tasks.filter(
        (task) => task.status === "IN_PROGRESS"
    );

    const completedTasks = tasks.filter(
        (task) => task.status === "DONE"
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] text-white">
                <main className="flex min-h-screen items-center justify-center lg:ml-64">
                    <RefreshCw
                        size={30}
                        className="animate-spin text-violet-400"
                    />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <main className="px-6 py-10 lg:ml-64 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}

                    <div className="flex flex-wrap items-end justify-between gap-5">

                        <div>
                            <p className="text-sm font-medium tracking-widest text-violet-300">
                                WORKSPACE
                            </p>

                            <h1 className="mt-2 text-4xl font-bold">
                                Tasks
                            </h1>

                            <p className="mt-2 text-slate-500">
                                Everything that needs to get done,
                                across your projects.
                            </p>
                        </div>

                        <button
                            onClick={loadTasks}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500/30 hover:text-white"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </button>

                    </div>


                    {/* Error */}

                    {error && (
                        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
                            {error}
                        </div>
                    )}


                    {/* Stats */}

                    <div className="mt-8 grid gap-5 md:grid-cols-3">

                        <TaskStat
                            icon={Circle}
                            label="To Do"
                            value={todoTasks.length}
                            iconClass="text-violet-300"
                        />

                        <TaskStat
                            icon={Clock3}
                            label="In Progress"
                            value={inProgressTasks.length}
                            iconClass="text-cyan-300"
                        />

                        <TaskStat
                            icon={CheckCircle2}
                            label="Completed"
                            value={completedTasks.length}
                            iconClass="text-emerald-300"
                        />

                    </div>


                    {/* Task board */}

                    <div className="mt-8 grid gap-6 xl:grid-cols-3">

                        <TaskColumn
                            title="To Do"
                            count={todoTasks.length}
                            icon={<Circle size={20} />}
                            tasks={todoTasks}
                            iconClass="text-violet-300"
                            getPriorityStyle={getPriorityStyle}
                            getStatusIcon={getStatusIcon}
                        />

                        <TaskColumn
                            title="In Progress"
                            count={inProgressTasks.length}
                            icon={<Clock3 size={20} />}
                            tasks={inProgressTasks}
                            iconClass="text-cyan-300"
                            getPriorityStyle={getPriorityStyle}
                            getStatusIcon={getStatusIcon}
                        />

                        <TaskColumn
                            title="Done"
                            count={completedTasks.length}
                            icon={<CheckCircle2 size={20} />}
                            tasks={completedTasks}
                            iconClass="text-emerald-300"
                            getPriorityStyle={getPriorityStyle}
                            getStatusIcon={getStatusIcon}
                        />

                    </div>

                </div>
            </main>
        </div>
    );
}


/* ----------------------------- */
/* Task statistics               */
/* ----------------------------- */

function TaskStat({
                      icon: Icon,
                      label,
                      value,
                      iconClass,
                  }) {
    return (
        <div className="glass rounded-2xl p-5">

            <div className="flex items-center gap-4">

                <div className="rounded-xl bg-white/5 p-3">
                    <Icon
                        size={21}
                        className={iconClass}
                    />
                </div>

                <div>
                    <p className="text-sm text-slate-500">
                        {label}
                    </p>

                    <p className="mt-1 text-3xl font-bold">
                        {value}
                    </p>
                </div>

            </div>

        </div>
    );
}


/* ----------------------------- */
/* Task column                   */
/* ----------------------------- */

function TaskColumn({
                        title,
                        count,
                        icon,
                        tasks,
                        iconClass,
                        getPriorityStyle,
                        getStatusIcon,
                    }) {
    return (
        <section className="glass rounded-2xl p-5">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className={`rounded-xl bg-white/5 p-3 ${iconClass}`}>
                        {icon}
                    </div>

                    <h2 className="font-semibold">
                        {title}
                    </h2>

                </div>

                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {count}
                </span>

            </div>


            <div className="mt-5 space-y-3">

                {tasks.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">

                        <ListTodo
                            size={24}
                            className="mx-auto text-slate-700"
                        />

                        <p className="mt-3 text-sm text-slate-600">
                            No tasks here
                        </p>

                    </div>

                ) : (

                    tasks.map((task) => (

                        <div
                            key={task.id}
                            className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 transition hover:border-violet-500/20"
                        >

                            <div className="flex items-start gap-3">

                                <div className="mt-0.5">
                                    {getStatusIcon(task.status)}
                                </div>

                                <div className="min-w-0 flex-1">

                                    <h3 className="font-semibold">
                                        {task.title}
                                    </h3>

                                    {task.description && (
                                        <p className="mt-2 text-sm leading-5 text-slate-500">
                                            {task.description}
                                        </p>
                                    )}

                                </div>

                            </div>


                            <div className="mt-4 flex flex-wrap items-center gap-2">

                                <span
                                    className={`rounded-full border px-2.5 py-1 text-xs ${getPriorityStyle(
                                        task.priority
                                    )}`}
                                >
                                    {task.priority}
                                </span>

                                {task.projectName && (
                                    <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs text-violet-300">
                                        {task.projectName}
                                    </span>
                                )}

                            </div>


                            {task.assignee && (
                                <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3">

                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold">
                                        {task.assignee.name
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>

                                    <span className="text-xs text-slate-500">
                                        {task.assignee.name}
                                    </span>

                                </div>
                            )}

                        </div>

                    ))

                )}

            </div>

        </section>
    );
}

export default Tasks;