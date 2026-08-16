import { useEffect, useState } from "react";

import {
    Bell,
    Search,
    Sun,
    FolderKanban,
    Plus,
    ArrowRight,
    Clock3,
    CheckCircle2,
    ListTodo,
} from "lucide-react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:8080/api/projects",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setProjects(response.data);

            } catch (error) {

                console.error(
                    "Failed to fetch projects:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProjects();

    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

            {/* Animated stars */}

            <div className="star-field">

                {Array.from({ length: 100 }).map((_, index) => (
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

            {/* Background glow */}

            <div className="page-glow left-1/3 top-1/4" />

            {/* Sidebar */}

            <Sidebar />

            {/* Main application */}

            <main className="relative z-10 min-h-screen lg:ml-64">

                {/* Top navigation */}

                <header className="flex items-center justify-between border-b border-white/5 px-6 py-5 lg:px-10">

                    <div className="relative hidden w-full max-w-md md:block">

                        <Search
                            size={18}
                            className="absolute left-4 top-3.5 text-slate-500"
                        />

                        <input
                            type="text"
                            placeholder="Search projects, tasks..."
                            className="w-full rounded-xl border border-violet-500/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60"
                        />

                    </div>

                    <div className="ml-auto flex items-center gap-5">

                        <button
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                            title="Notifications"
                        >
                            <Bell size={20} />
                        </button>

                        <button
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                            title="Appearance"
                        >
                            <Sun size={20} />
                        </button>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold shadow-lg shadow-violet-900/30">
                            U
                        </div>

                    </div>

                </header>

                {/* Dashboard content */}

                <section className="px-6 py-8 lg:px-10">

                    {/* Welcome section */}

                    <div className="glass relative mb-7 overflow-hidden rounded-3xl p-7">

                        <div className="absolute -right-10 -top-20 text-[180px] opacity-10">
                            ✦
                        </div>

                        <div className="relative z-10">

                            <p className="mb-2 text-sm font-medium tracking-widest text-violet-300">
                                PROJECTHUB WORKSPACE
                            </p>

                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                                Your workspace.
                            </h1>

                            <p className="mt-3 max-w-2xl text-slate-400">
                                Organize projects, manage tasks, track progress,
                                and showcase the work you're building.
                            </p>

                        </div>

                    </div>

                    {/* Overview cards */}

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        <OverviewCard
                            icon={FolderKanban}
                            title="Projects"
                            value={projects.length}
                            description="Projects in your workspace"
                            iconStyle="text-violet-300 bg-violet-500/10"
                        />

                        <OverviewCard
                            icon={ListTodo}
                            title="Tasks"
                            value="—"
                            description="Task tracking coming next"
                            iconStyle="text-cyan-300 bg-cyan-500/10"
                        />

                        <OverviewCard
                            icon={CheckCircle2}
                            title="Completed"
                            value="—"
                            description="Completion analytics coming next"
                            iconStyle="text-emerald-300 bg-emerald-500/10"
                        />

                    </div>

                    {/* Projects section */}

                    <section className="mt-10">

                        <div className="mb-5 flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-semibold">
                                    Your Projects
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Everything you're building in one place.
                                </p>

                            </div>

                            <button
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5 hover:shadow-violet-900/40"
                            >
                                <Plus size={18} />
                                New Project
                            </button>

                        </div>

                        {loading ? (

                            <div className="glass rounded-2xl p-12 text-center">

                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />

                                <p className="mt-4 text-sm text-slate-500">
                                    Loading your projects...
                                </p>

                            </div>

                        ) : projects.length === 0 ? (

                            <EmptyProjects />

                        ) : (

                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                                {projects.map((project) => (

                                    <ProjectCard
                                        key={project.id}
                                        name={project.name}
                                        description={project.description}
                                        category="Project"
                                    />

                                ))}

                            </div>

                        )}

                    </section>

                    {/* Workspace information */}

                    <section className="mt-10 grid gap-5 md:grid-cols-2">

                        <WorkspaceCard
                            icon={Clock3}
                            title="Recent Activity"
                            description="Your project and task activity will appear here as you work."
                        />

                        <WorkspaceCard
                            icon={ArrowRight}
                            title="Project Showcase"
                            description="Turn your projects into polished public pages that you can share with others."
                        />

                    </section>

                </section>

            </main>

        </div>
    );
}


/* -------------------------------- */
/* Overview Card                    */
/* -------------------------------- */

function OverviewCard({
                          icon: Icon,
                          title,
                          value,
                          description,
                          iconStyle,
                      }) {

    return (
        <div className="glass rounded-2xl p-5 transition duration-300 hover:-translate-y-1">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-slate-400">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {value}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                        {description}
                    </p>

                </div>

                <div className={`rounded-xl p-3 ${iconStyle}`}>
                    <Icon size={22} />
                </div>

            </div>

        </div>
    );
}


/* -------------------------------- */
/* Empty Projects                   */
/* -------------------------------- */

function EmptyProjects() {

    return (
        <div className="glass rounded-2xl border-dashed p-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">

                <FolderKanban size={30} />

            </div>

            <h3 className="mt-5 text-xl font-semibold">
                No projects yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Create your first project and start organizing your
                work in ProjectHub.
            </p>

            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500">

                <Plus size={18} />

                Create Project

            </button>

        </div>
    );
}


/* -------------------------------- */
/* Workspace Card                   */
/* -------------------------------- */

function WorkspaceCard({
                           icon: Icon,
                           title,
                           description,
                       }) {

    return (
        <div className="glass rounded-2xl p-6 transition hover:border-violet-500/30">

            <div className="flex items-start gap-4">

                <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">
                    <Icon size={21} />
                </div>

                <div>

                    <h3 className="font-semibold">
                        {title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        {description}
                    </p>

                </div>

            </div>

        </div>
    );
}


export default Dashboard;