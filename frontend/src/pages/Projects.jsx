import { useEffect, useState } from "react";

import {
    Plus,
    Search,
    FolderKanban,
    X,
    Loader2,
    ArrowUpRight,
} from "lucide-react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";


function Projects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });


    // --------------------------------
    // Fetch projects
    // --------------------------------

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


    useEffect(() => {

        fetchProjects();

    }, []);


    // --------------------------------
    // Form handling
    // --------------------------------

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

    };


    // --------------------------------
    // Create project
    // --------------------------------

    const createProject = async (event) => {

        event.preventDefault();

        if (!formData.name.trim()) {
            return;
        }

        try {

            setCreating(true);

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:8080/api/projects",
                {
                    name: formData.name,
                    description: formData.description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFormData({
                name: "",
                description: "",
            });

            setShowModal(false);

            await fetchProjects();

        } catch (error) {

            console.error(
                "Failed to create project:",
                error
            );

            alert(
                error.response?.data?.error ||
                "Failed to create project."
            );

        } finally {

            setCreating(false);

        }
    };


    // --------------------------------
    // Search projects
    // --------------------------------

    const filteredProjects = projects.filter((project) => {

        const name = project.name?.toLowerCase() || "";
        const description =
            project.description?.toLowerCase() || "";

        const searchTerm = search.toLowerCase();

        return (
            name.includes(searchTerm) ||
            description.includes(searchTerm)
        );

    });


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


            {/* Main content */}

            <main className="relative z-10 min-h-screen lg:ml-64">

                {/* Top bar */}

                <header className="flex items-center border-b border-white/5 px-6 py-5 lg:px-10">

                    <div className="relative w-full max-w-md">

                        <Search
                            size={18}
                            className="absolute left-4 top-3.5 text-slate-500"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search projects..."
                            className="w-full rounded-xl border border-violet-500/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60"
                        />

                    </div>

                </header>


                {/* Page */}

                <section className="px-6 py-8 lg:px-10">

                    {/* Heading */}

                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                        <div>

                            <p className="text-sm font-medium tracking-widest text-violet-300">
                                WORKSPACE
                            </p>

                            <h1 className="mt-2 text-4xl font-bold">
                                Projects
                            </h1>

                            <p className="mt-2 text-slate-500">
                                Create, organize and showcase your work.
                            </p>

                        </div>


                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5 hover:shadow-violet-900/40"
                        >

                            <Plus size={18} />

                            New Project

                        </button>

                    </div>


                    {/* Project count */}

                    <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">

                        <FolderKanban size={17} />

                        <span>
                            {projects.length} project
                            {projects.length !== 1 ? "s" : ""}
                        </span>

                    </div>


                    {/* Loading */}

                    {loading ? (

                        <div className="glass mt-6 rounded-2xl p-16 text-center">

                            <Loader2
                                size={30}
                                className="mx-auto animate-spin text-violet-400"
                            />

                            <p className="mt-4 text-sm text-slate-500">
                                Loading projects...
                            </p>

                        </div>

                    ) : filteredProjects.length === 0 ? (

                        /* Empty state */

                        <div className="glass mt-6 rounded-2xl border-dashed p-16 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">

                                <FolderKanban size={30} />

                            </div>

                            <h2 className="mt-5 text-xl font-semibold">

                                {search
                                    ? "No projects found"
                                    : "No projects yet"}

                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                                {search
                                    ? "Try a different search."
                                    : "Create your first project and start building your workspace."}

                            </p>


                            {!search && (

                                <button
                                    onClick={() =>
                                        setShowModal(true)
                                    }
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
                                >

                                    <Plus size={18} />

                                    Create Project

                                </button>

                            )}

                        </div>

                    ) : (

                        /* Project grid */

                        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {filteredProjects.map((project) => (

                                <ProjectItem
                                    key={project.id}
                                    project={project}
                                    onOpen={() =>
                                        navigate(
                                            `/projects/${project.id}`
                                        )
                                    }
                                />

                            ))}

                        </div>

                    )}

                </section>

            </main>


            {/* Create project modal */}

            {showModal && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

                    <div className="glass w-full max-w-lg rounded-2xl p-6 shadow-2xl shadow-violet-950/40">

                        {/* Modal header */}

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-violet-300">
                                    PROJECT
                                </p>

                                <h2 className="mt-1 text-2xl font-bold">
                                    Create a project
                                </h2>

                            </div>


                            <button
                                onClick={() =>
                                    setShowModal(false)
                                }
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={createProject}
                            className="mt-7 space-y-5"
                        >

                            {/* Name */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Project name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. ProjectHub"
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
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="What are you building?"
                                    rows="4"
                                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/60"
                                />

                            </div>


                            {/* Buttons */}

                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    {creating && (
                                        <Loader2
                                            size={17}
                                            className="animate-spin"
                                        />
                                    )}

                                    {creating
                                        ? "Creating..."
                                        : "Create Project"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}


/* -------------------------------- */
/* Project card                     */
/* -------------------------------- */

function ProjectItem({
                         project,
                         onOpen,
                     }) {

    return (

        <div
            className="group cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-slate-950/70 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/20"
            onClick={onOpen}
        >

            {/* Project preview */}

            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 via-slate-900 to-fuchsia-950">

                <div className="absolute left-10 top-8 h-24 w-24 rounded-full bg-violet-500/20 blur-3xl" />

                <div className="absolute bottom-0 right-10 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-3xl" />

                <FolderKanban
                    size={52}
                    className="relative text-violet-300 transition duration-300 group-hover:scale-110"
                />

            </div>


            {/* Project information */}

            <div className="p-5">

                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                        <h3 className="truncate text-lg font-semibold">
                            {project.name}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                            {project.description ||
                                "No description provided."}
                        </p>

                    </div>


                    <button
                        onClick={(event) => {

                            event.stopPropagation();

                            onOpen();

                        }}
                        className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-violet-300"
                        title="Open project"
                    >

                        <ArrowUpRight size={18} />

                    </button>

                </div>


                {/* Footer */}

                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">

                    <span className="text-xs text-slate-600">
                        Project #{project.id}
                    </span>

                    <button
                        onClick={(event) => {

                            event.stopPropagation();

                            onOpen();

                        }}
                        className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
                    >
                        Open project →
                    </button>

                </div>

            </div>

        </div>
    );
}


export default Projects;