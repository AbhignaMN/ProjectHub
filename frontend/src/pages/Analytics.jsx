import { useEffect, useMemo, useState } from "react";

import {
    BarChart3,
    CheckCircle2,
    Clock3,
    FolderKanban,
    ListTodo,
    Loader2,
    TrendingUp,
    AlertCircle,
} from "lucide-react";

import axios from "axios";


function Analytics() {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);


    const token = localStorage.getItem("token");


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    useEffect(() => {

        loadAnalytics();

    }, []);


    const loadAnalytics = async () => {

        try {

            setLoading(true);


            const projectResponse =
                await axios.get(
                    "http://localhost:8080/api/projects",
                    config
                );


            const projectData =
                projectResponse.data || [];


            setProjects(projectData);


            const taskResults =
                await Promise.all(

                    projectData.map(
                        async (project) => {

                            try {

                                const response =
                                    await axios.get(
                                        `http://localhost:8080/api/projects/${project.id}/tasks`,
                                        config
                                    );

                                return response.data || [];

                            } catch (error) {

                                console.error(
                                    `Failed to fetch tasks for project ${project.id}`,
                                    error
                                );

                                return [];

                            }

                        }
                    )

                );


            setTasks(
                taskResults.flat()
            );


        } catch (error) {

            console.error(
                "Failed to load analytics:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const analytics = useMemo(() => {

        const totalTasks =
            tasks.length;


        const todo =
            tasks.filter(
                (task) =>
                    task.status === "TODO"
            ).length;


        const inProgress =
            tasks.filter(
                (task) =>
                    task.status === "IN_PROGRESS"
            ).length;


        const done =
            tasks.filter(
                (task) =>
                    task.status === "DONE"
            ).length;


        const high =
            tasks.filter(
                (task) =>
                    task.priority === "HIGH"
            ).length;


        const medium =
            tasks.filter(
                (task) =>
                    task.priority === "MEDIUM"
            ).length;


        const low =
            tasks.filter(
                (task) =>
                    task.priority === "LOW"
            ).length;


        const completion =
            totalTasks === 0
                ? 0
                : Math.round(
                    (done / totalTasks) * 100
                );


        const projectStats =
            projects.map((project) => {

                const projectTasks =
                    tasks.filter(
                        (task) =>
                            task.projectId ===
                            project.id ||
                            task.project?.id ===
                            project.id
                    );


                return {
                    ...project,
                    taskCount:
                    projectTasks.length,
                    completed:
                    projectTasks.filter(
                        (task) =>
                            task.status ===
                            "DONE"
                    ).length,
                };

            });


        return {
            totalTasks,
            todo,
            inProgress,
            done,
            high,
            medium,
            low,
            completion,
            projectStats,
        };

    }, [projects, tasks]);


    if (loading) {

        return (

            <div className="min-h-screen bg-[#020617] text-white">

                <main className="flex min-h-screen items-center justify-center lg:ml-64">

                    <Loader2
                        size={34}
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

                    <div>

                        <p className="text-sm font-medium tracking-widest text-violet-300">
                            INSIGHTS
                        </p>

                        <h1 className="mt-2 text-4xl font-bold">
                            Analytics
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Understand your project workload and
                            development progress.
                        </p>

                    </div>


                    {/* Main stats */}

                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                        <AnalyticsCard
                            icon={FolderKanban}
                            label="Projects"
                            value={projects.length}
                        />

                        <AnalyticsCard
                            icon={ListTodo}
                            label="Total Tasks"
                            value={analytics.totalTasks}
                        />

                        <AnalyticsCard
                            icon={CheckCircle2}
                            label="Completed"
                            value={analytics.done}
                        />

                        <AnalyticsCard
                            icon={TrendingUp}
                            label="Completion"
                            value={`${analytics.completion}%`}
                        />

                    </div>


                    {/* Progress */}

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">


                        {/* Task status */}

                        <div className="glass rounded-2xl p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-lg font-semibold">
                                        Task Progress
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Current task distribution
                                    </p>

                                </div>

                                <BarChart3
                                    size={21}
                                    className="text-violet-300"
                                />

                            </div>


                            <div className="mt-7 space-y-5">

                                <ProgressRow
                                    label="To Do"
                                    value={analytics.todo}
                                    total={analytics.totalTasks}
                                />

                                <ProgressRow
                                    label="In Progress"
                                    value={analytics.inProgress}
                                    total={analytics.totalTasks}
                                />

                                <ProgressRow
                                    label="Completed"
                                    value={analytics.done}
                                    total={analytics.totalTasks}
                                />

                            </div>

                        </div>


                        {/* Priority */}

                        <div className="glass rounded-2xl p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-lg font-semibold">
                                        Priority Breakdown
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        How urgent your workload is
                                    </p>

                                </div>

                                <AlertCircle
                                    size={21}
                                    className="text-violet-300"
                                />

                            </div>


                            <div className="mt-7 space-y-5">

                                <ProgressRow
                                    label="High"
                                    value={analytics.high}
                                    total={analytics.totalTasks}
                                />

                                <ProgressRow
                                    label="Medium"
                                    value={analytics.medium}
                                    total={analytics.totalTasks}
                                />

                                <ProgressRow
                                    label="Low"
                                    value={analytics.low}
                                    total={analytics.totalTasks}
                                />

                            </div>

                        </div>

                    </div>


                    {/* Projects workload */}

                    <section className="mt-8">

                        <div className="glass rounded-2xl p-6">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">

                                    <FolderKanban size={20} />

                                </div>

                                <div>

                                    <h2 className="text-lg font-semibold">
                                        Project Workload
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Tasks across your projects
                                    </p>

                                </div>

                            </div>


                            <div className="mt-7 space-y-5">

                                {analytics.projectStats.length === 0 ? (

                                    <div className="py-10 text-center text-sm text-slate-600">
                                        No projects yet.
                                    </div>

                                ) : (

                                    analytics.projectStats.map(
                                        (project) => (

                                            <ProjectBar
                                                key={project.id}
                                                project={project}
                                            />

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    </section>


                    {/* Bottom summary */}

                    <div className="mt-8 grid gap-5 md:grid-cols-3">

                        <MiniStat
                            icon={ListTodo}
                            label="To Do"
                            value={analytics.todo}
                        />

                        <MiniStat
                            icon={Clock3}
                            label="In Progress"
                            value={analytics.inProgress}
                        />

                        <MiniStat
                            icon={CheckCircle2}
                            label="Completed"
                            value={analytics.done}
                        />

                    </div>

                </div>

            </main>

        </div>

    );
}


/* ----------------------------- */
/* Analytics card                */
/* ----------------------------- */

function AnalyticsCard({
                           icon: Icon,
                           label,
                           value,
                       }) {

    return (

        <div className="glass rounded-2xl p-5">

            <div className="flex items-center gap-4">

                <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">

                    <Icon size={21} />

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
/* Progress row                  */
/* ----------------------------- */

function ProgressRow({
                         label,
                         value,
                         total,
                     }) {

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (value / total) * 100
            );


    return (

        <div>

            <div className="mb-2 flex justify-between text-sm">

                <span className="text-slate-400">
                    {label}
                </span>

                <span className="text-slate-500">
                    {value} · {percentage}%
                </span>

            </div>


            <div className="h-2 overflow-hidden rounded-full bg-white/5">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>
    );
}


/* ----------------------------- */
/* Project bar                   */
/* ----------------------------- */

function ProjectBar({
                        project,
                    }) {

    const percentage =
        project.taskCount === 0
            ? 0
            : Math.round(
                (project.completed /
                    project.taskCount) *
                100
            );


    return (

        <div>

            <div className="mb-2 flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium">
                        {project.name}
                    </p>

                    <p className="text-xs text-slate-600">
                        {project.taskCount} task
                        {project.taskCount !== 1
                            ? "s"
                            : ""}
                    </p>

                </div>


                <span className="text-sm text-slate-500">
                    {percentage}%
                </span>

            </div>


            <div className="h-3 overflow-hidden rounded-full bg-white/5">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-700"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>
    );
}


/* ----------------------------- */
/* Mini stat                     */
/* ----------------------------- */

function MiniStat({
                      icon: Icon,
                      label,
                      value,
                  }) {

    return (

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">

            <div className="flex items-center gap-3">

                <Icon
                    size={18}
                    className="text-violet-300"
                />

                <span className="text-sm text-slate-500">
                    {label}
                </span>

                <span className="ml-auto font-semibold">
                    {value}
                </span>

            </div>

        </div>
    );
}


export default Analytics;