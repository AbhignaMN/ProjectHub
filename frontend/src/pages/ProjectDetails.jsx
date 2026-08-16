
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    FolderKanban,
    GitBranch,
    ExternalLink,
    Pencil,
    Trash2,
    CheckCircle2,
    Clock3,
    ListTodo,
    Loader2,
    Plus,
    X,
    Circle,
} from "lucide-react";

import axios from "axios";


function ProjectDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [tasksLoading, setTasksLoading] = useState(true);

    const [deleting, setDeleting] = useState(false);
    const [creatingTask, setCreatingTask] = useState(false);

    const [showTaskModal, setShowTaskModal] = useState(false);

    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        assigneeId: "",
    });


    // --------------------------------
    // Authentication
    // --------------------------------

    const getToken = () => {
        return localStorage.getItem("token");
    };


    const authConfig = () => ({
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });


    // --------------------------------
    // Fetch project
    // --------------------------------

    const fetchProject = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/projects/${id}`,
                authConfig()
            );

            setProject(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch project:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------
    // Fetch project tasks
    // --------------------------------

    const fetchTasks = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/projects/${id}/tasks`,
                authConfig()
            );

            setTasks(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch tasks:",
                error
            );

        } finally {

            setTasksLoading(false);

        }
    };


    useEffect(() => {

        fetchProject();
        fetchTasks();

    }, [id]);


    // --------------------------------
    // Task form
    // --------------------------------

    const handleTaskChange = (event) => {

        setTaskForm({
            ...taskForm,
            [event.target.name]: event.target.value,
        });

    };


    // --------------------------------
    // Create task
    // --------------------------------

    const createTask = async (event) => {

        event.preventDefault();

        if (!taskForm.title.trim()) {
            return;
        }

        try {

            setCreatingTask(true);

            await axios.post(
                `http://localhost:8080/api/projects/${id}/tasks`,
                {
                    title: taskForm.title,
                    description: taskForm.description,
                    status: taskForm.status,
                    priority: taskForm.priority,
                    assigneeId: taskForm.assigneeId
                        ? Number(taskForm.assigneeId)
                        : null,
                },
                authConfig()
            );

            setTaskForm({
                title: "",
                description: "",
                status: "TODO",
                priority: "MEDIUM",
                assigneeId: "",
            });

            setShowTaskModal(false);

            await fetchTasks();

        } catch (error) {

            console.error(
                "Failed to create task:",
                error
            );

            alert(
                error.response?.data?.error ||
                "Failed to create task."
            );

        } finally {

            setCreatingTask(false);

        }
    };


    // --------------------------------
    // Delete task
    // --------------------------------

    const deleteTask = async (taskId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/api/tasks/${taskId}`,
                authConfig()
            );

            await fetchTasks();

        } catch (error) {

            console.error(
                "Failed to delete task:",
                error
            );

            alert(
                error.response?.data?.error ||
                "Failed to delete task."
            );

        }
    };


    // --------------------------------
    // Delete project
    // --------------------------------

    const deleteProject = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setDeleting(true);

            await axios.delete(
                `http://localhost:8080/api/projects/${id}`,
                authConfig()
            );

            navigate("/projects");

        } catch (error) {

            console.error(
                "Failed to delete project:",
                error
            );

            alert(
                error.response?.data?.error ||
                "Failed to delete project."
            );

        } finally {

            setDeleting(false);

        }
    };


    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {

        return (
            <PageWrapper>

                <div className="flex min-h-[70vh] items-center justify-center">

                    <Loader2
                        size={32}
                        className="animate-spin text-violet-400"
                    />

                </div>

            </PageWrapper>
        );

    }


    // --------------------------------
    // Project not found
    // --------------------------------

    if (!project) {

        return (
            <PageWrapper>

                <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">

                    <FolderKanban
                        size={50}
                        className="text-slate-700"
                    />

                    <h1 className="mt-5 text-2xl font-bold">
                        Project not found
                    </h1>

                    <p className="mt-2 text-slate-500">
                        This project may have been deleted or you
                        don't have access to it.
                    </p>

                    <button
                        onClick={() => navigate("/projects")}
                        className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"
                    >
                        Back to Projects
                    </button>

                </div>

            </PageWrapper>
        );

    }


    // --------------------------------
    // Task calculations
    // --------------------------------

    const todoTasks = tasks.filter(
        (task) => task.status === "TODO"
    );

    const progressTasks = tasks.filter(
        (task) => task.status === "IN_PROGRESS"
    );

    const completedTasks = tasks.filter(
        (task) => task.status === "DONE"
    );


    return (

        <PageWrapper>

            {/* Back */}

            <button
                onClick={() => navigate("/projects")}
                className="mb-7 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >

                <ArrowLeft size={18} />

                Back to Projects

            </button>


            {/* Project hero */}

            <div className="glass overflow-hidden rounded-3xl">

                {/* Cover */}

                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 via-slate-900 to-fuchsia-950">

                    <div className="absolute left-20 top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

                    <div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />

                    <FolderKanban
                        size={80}
                        className="relative text-violet-300 opacity-80"
                    />

                </div>


                {/* Project information */}

                <div className="p-7">

                    <div className="flex flex-col justify-between gap-6 md:flex-row">

                        <div>

                            <p className="text-sm font-medium tracking-widest text-violet-300">
                                PROJECT
                            </p>

                            <h1 className="mt-2 text-4xl font-bold">
                                {project.name}
                            </h1>

                            <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                                {project.description ||
                                    "No description provided."}
                            </p>

                        </div>


                        {/* Actions */}

                        <div className="flex items-start gap-2">

                            <button
                                className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                            >

                                <Pencil size={17} />

                                Edit

                            </button>


                            <button
                                onClick={deleteProject}
                                disabled={deleting}
                                className="flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                            >

                                {deleting ? (
                                    <Loader2
                                        size={17}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <Trash2 size={17} />
                                )}

                                Delete

                            </button>

                        </div>

                    </div>


                    {/* Owner */}

                    <div className="mt-7 flex items-center gap-3 border-t border-white/5 pt-5">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold">
                            {project.owner?.name?.charAt(0) || "U"}
                        </div>

                        <div>

                            <p className="text-xs text-slate-600">
                                Project owner
                            </p>

                            <p className="text-sm text-slate-300">
                                {project.owner?.name || "Unknown"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Project statistics */}

            <div className="mt-6 grid gap-5 md:grid-cols-3">

                <ProjectStat
                    icon={ListTodo}
                    title="Total Tasks"
                    value={tasks.length}
                    description="Tasks in this project"
                />

                <ProjectStat
                    icon={CheckCircle2}
                    title="Completed"
                    value={completedTasks.length}
                    description="Finished tasks"
                />

                <ProjectStat
                    icon={Clock3}
                    title="In Progress"
                    value={progressTasks.length}
                    description="Currently being worked on"
                />

            </div>


            {/* Tasks */}

            <section className="mt-10">

                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div>

                        <p className="text-sm font-medium tracking-widest text-violet-300">
                            WORKSPACE
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            Tasks
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage everything that needs to be done.
                        </p>

                    </div>


                    <button
                        onClick={() => setShowTaskModal(true)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5"
                    >

                        <Plus size={18} />

                        New Task

                    </button>

                </div>


                {tasksLoading ? (

                    <div className="glass rounded-2xl p-12 text-center">

                        <Loader2
                            size={30}
                            className="mx-auto animate-spin text-violet-400"
                        />

                        <p className="mt-4 text-sm text-slate-500">
                            Loading tasks...
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-5 lg:grid-cols-3">

                        {/* TODO */}

                        <TaskColumn
                            title="To Do"
                            count={todoTasks.length}
                            icon={Circle}
                            tasks={todoTasks}
                            onDelete={deleteTask}
                        />


                        {/* IN PROGRESS */}

                        <TaskColumn
                            title="In Progress"
                            count={progressTasks.length}
                            icon={Clock3}
                            tasks={progressTasks}
                            onDelete={deleteTask}
                        />


                        {/* DONE */}

                        <TaskColumn
                            title="Done"
                            count={completedTasks.length}
                            icon={CheckCircle2}
                            tasks={completedTasks}
                            onDelete={deleteTask}
                        />

                    </div>

                )}

            </section>


            {/* Project links */}

            <section className="mt-10 grid gap-6 lg:grid-cols-2">

                <div className="glass rounded-2xl p-6">

                    <h2 className="text-xl font-semibold">
                        Project Overview
                    </h2>

                    <p className="mt-4 leading-7 text-slate-400">
                        Keep your project description, technologies,
                        milestones and other important information here.
                    </p>

                </div>


                <div className="glass rounded-2xl p-6">

                    <h2 className="text-xl font-semibold">
                        Project Links
                    </h2>

                    <div className="mt-5 space-y-3">

                        <button className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-sm text-slate-500 transition hover:border-violet-500/20 hover:text-violet-300">

                            <GitBranch size={18} />

                            Connect GitHub repository

                            <ExternalLink
                                size={15}
                                className="ml-auto"
                            />

                        </button>


                        <button className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-sm text-slate-500 transition hover:border-violet-500/20 hover:text-violet-300">

                            <ExternalLink size={18} />

                            Add live project URL

                            <ExternalLink
                                size={15}
                                className="ml-auto"
                            />

                        </button>

                    </div>

                </div>

            </section>


            {/* Create task modal */}

            {showTaskModal && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

                    <div className="glass w-full max-w-lg rounded-2xl p-6 shadow-2xl shadow-violet-950/40">

                        {/* Header */}

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-violet-300">
                                    TASK
                                </p>

                                <h2 className="mt-1 text-2xl font-bold">
                                    Create a task
                                </h2>

                            </div>


                            <button
                                onClick={() =>
                                    setShowTaskModal(false)
                                }
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={createTask}
                            className="mt-7 space-y-5"
                        >

                            {/* Title */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Task title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={taskForm.title}
                                    onChange={handleTaskChange}
                                    placeholder="e.g. Build authentication"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/60"
                                />

                            </div>


                            {/* Description */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={taskForm.description}
                                    onChange={handleTaskChange}
                                    placeholder="Describe the task..."
                                    rows="3"
                                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/60"
                                />

                            </div>


                            {/* Status */}

                            <div className="grid gap-4 sm:grid-cols-2">

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={taskForm.status}
                                        onChange={handleTaskChange}
                                        className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60"
                                    >

                                        <option value="TODO">
                                            To Do
                                        </option>

                                        <option value="IN_PROGRESS">
                                            In Progress
                                        </option>

                                        <option value="DONE">
                                            Done
                                        </option>

                                    </select>

                                </div>


                                {/* Priority */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Priority
                                    </label>

                                    <select
                                        name="priority"
                                        value={taskForm.priority}
                                        onChange={handleTaskChange}
                                        className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60"
                                    >

                                        <option value="LOW">
                                            Low
                                        </option>

                                        <option value="MEDIUM">
                                            Medium
                                        </option>

                                        <option value="HIGH">
                                            High
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* Assignee */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Assignee ID
                                </label>

                                <input
                                    type="number"
                                    name="assigneeId"
                                    value={taskForm.assigneeId}
                                    onChange={handleTaskChange}
                                    placeholder="User ID"
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/60"
                                />

                                <p className="mt-2 text-xs text-slate-600">
                                    Enter the ID of the user who should work on this task.
                                </p>

                            </div>


                            {/* Buttons */}

                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowTaskModal(false)
                                    }
                                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={creatingTask}
                                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    {creatingTask && (
                                        <Loader2
                                            size={17}
                                            className="animate-spin"
                                        />
                                    )}

                                    {creatingTask
                                        ? "Creating..."
                                        : "Create Task"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </PageWrapper>
    );
}


/* -------------------------------- */
/* Task column                      */
/* -------------------------------- */

function TaskColumn({
                        title,
                        count,
                        icon: Icon,
                        tasks,
                        onDelete,
                    }) {

    return (

        <div className="glass min-h-[350px] rounded-2xl p-4">

            {/* Column header */}

            <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-violet-500/10 p-2 text-violet-300">

                        <Icon size={17} />

                    </div>

                    <h3 className="font-semibold">
                        {title}
                    </h3>

                </div>


                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-500">
                    {count}
                </span>

            </div>


            {/* Tasks */}

            <div className="space-y-3">

                {tasks.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-white/5 p-7 text-center">

                        <p className="text-xs text-slate-600">
                            No tasks here
                        </p>

                    </div>

                ) : (

                    tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={onDelete}
                        />

                    ))

                )}

            </div>

        </div>
    );
}


/* -------------------------------- */
/* Task card                        */
/* -------------------------------- */

function TaskCard({
                      task,
                      onDelete,
                  }) {

    const priorityClass = {

        LOW:
            "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

        MEDIUM:
            "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",

        HIGH:
            "bg-red-500/10 text-red-300 border-red-500/20",

    };


    return (

        <div className="group rounded-xl border border-white/5 bg-black/20 p-4 transition hover:border-violet-500/20">

            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                    <h4 className="font-medium text-white">
                        {task.title}
                    </h4>

                    {task.description && (

                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                            {task.description}
                        </p>

                    )}

                </div>


                <button
                    onClick={() => onDelete(task.id)}
                    className="shrink-0 text-slate-700 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
                    title="Delete task"
                >

                    <Trash2 size={16} />

                </button>

            </div>


            <div className="mt-4 flex items-center justify-between gap-2">

                <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                        priorityClass[task.priority] ||
                        priorityClass.MEDIUM
                    }`}
                >
                    {task.priority || "MEDIUM"}
                </span>


                {task.assignee && (

                    <div className="flex items-center gap-2">

                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[10px] font-bold">
                            {task.assignee.name?.charAt(0) || "U"}
                        </div>

                        <span className="max-w-[100px] truncate text-[10px] text-slate-600">
                            {task.assignee.name}
                        </span>

                    </div>

                )}

            </div>

        </div>
    );
}


/* -------------------------------- */
/* Page wrapper                     */
/* -------------------------------- */

function PageWrapper({ children }) {

    return (

        <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

            {/* Stars */}

            <div className="star-field">

                {Array.from({ length: 80 }).map((_, index) => (

                    <span
                        key={index}
                        className="star"
                        style={{
                            left: `${(index * 37) % 100}%`,
                            top: `${(index * 53) % 100}%`,
                            animationDelay: `${(index % 6) * 0.5}s`,
                        }}
                    />

                ))}

            </div>


            <div className="page-glow left-1/3 top-1/4" />


            <main className="relative z-10 px-6 py-8 lg:ml-64 lg:px-10">

                <div className="mx-auto max-w-7xl">

                    {children}

                </div>

            </main>

        </div>
    );
}


/* -------------------------------- */
/* Project stat                     */
/* -------------------------------- */

function ProjectStat({
                         icon: Icon,
                         title,
                         value,
                         description,
                     }) {

    return (

        <div className="glass rounded-2xl p-5">

            <div className="flex items-center gap-4">

                <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">

                    <Icon size={21} />

                </div>

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                        {description}
                    </p>

                </div>

            </div>

        </div>
    );
}


export default ProjectDetails;