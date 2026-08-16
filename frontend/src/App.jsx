import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Github from "./pages/Github";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Notes from "./pages/Notes";
import Achievements from "./pages/Achievements";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";

function SimplePage({ title, description }) {
    return (
        <div className="relative min-h-screen bg-[#020617] px-6 py-12 text-white lg:ml-64 lg:px-10">

            <div className="page-glow left-1/3 top-1/4" />

            <div className="relative z-10">

                <p className="mb-2 text-sm font-medium tracking-widest text-violet-300">
                    PROJECTHUB
                </p>

                <h1 className="text-4xl font-bold">
                    {title}
                </h1>

                <p className="mt-3 max-w-2xl text-slate-400">
                    {description}
                </p>

                <div className="glass mt-8 rounded-2xl p-8">

                    <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-violet-500/20">

                        <p className="text-sm text-slate-500">
                            This section is ready to be built.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white">

            <div className="text-center">

                <h1 className="text-5xl font-bold">
                    Project<span className="text-violet-400">Hub</span>
                </h1>

                <p className="mt-4 text-slate-400">
                    Manage, organize and showcase your projects.
                </p>

                <div className="mt-8 flex justify-center gap-4">

                    <a
                        href="/login"
                        className="rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500"
                    >
                        Login
                    </a>

                    <a
                        href="/register"
                        className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
                    >
                        Get Started
                    </a>

                </div>

            </div>

        </div>
    );
}


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Public pages */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Main application */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/projects"
                    element={<Projects />}
                />


                <Route
                    path="/projects/:id"
                    element={<ProjectDetails />}
                />

                <Route
                    path="/tasks"
                    element={<Tasks />}
                />

                <Route
                    path="/github"
                    element={<Github />}
                />


                <Route
                    path="/analytics"
                    element={<Analytics />}
                />



                <Route
                    path="/calendar"
                    element={<Calendar />}
                />

                <Route
                    path="/notes"
                    element={<Notes />}
                />

                <Route
                    path="/achievements"
                    element={<Achievements />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

                {/* Unknown URL */}

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;