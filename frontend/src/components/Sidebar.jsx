import {
    Home,
    FolderKanban,
    CheckSquare,
    GitBranch,
    Trophy,
    BarChart3,
    CalendarDays,
    FileText,
    Settings,
    Sparkles,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";


function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();


    const navigation = [
        {
            label: "Home",
            icon: Home,
            path: "/dashboard",
        },
        {
            label: "Projects",
            icon: FolderKanban,
            path: "/projects",
        },
        {
            label: "Tasks",
            icon: CheckSquare,
            path: "/tasks",
        },
        {
            label: "GitHub",
            icon: GitBranch,
            path: "/github",
        },
        {
            label: "Achievements",
            icon: Trophy,
            path: "/achievements",
        },
        {
            label: "Analytics",
            icon: BarChart3,
            path: "/analytics",
        },
        {
            label: "Calendar",
            icon: CalendarDays,
            path: "/calendar",
        },
        {
            label: "Notes",
            icon: FileText,
            path: "/notes",
        },
        {
            label: "Settings",
            icon: Settings,
            path: "/settings",
        },
    ];


    const handleNavigation = (path) => {
        navigate(path);
    };


    return (
        <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-white/5 bg-[#030712]/95 backdrop-blur-xl lg:flex lg:flex-col">

            {/* Logo */}

            <div className="flex items-center gap-3 border-b border-white/5 px-6 py-6">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-900/30">

                    <Sparkles
                        size={22}
                        className="text-white"
                    />

                </div>

                <div className="text-xl font-bold">

                    Project<span className="text-violet-400">
                        Hub
                    </span>

                </div>

            </div>


            {/* Navigation */}

            <nav className="flex-1 space-y-2 px-3 py-6">

                {navigation.map((item) => {

                    const Icon = item.icon;

                    const isActive =
                        location.pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() =>
                                handleNavigation(item.path)
                            }
                            className={`group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-violet-600/20 text-white shadow-lg shadow-violet-900/10"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >

                            <Icon
                                size={20}
                                className={
                                    isActive
                                        ? "text-violet-300"
                                        : "text-slate-500 group-hover:text-violet-300"
                                }
                            />

                            <span>
                                {item.label}
                            </span>

                            {item.label === "Tasks" && (
                                <span className="ml-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-violet-500 px-2 text-xs font-semibold text-white">
                                    3
                                </span>
                            )}

                        </button>
                    );

                })}

            </nav>


            {/* Bottom quote */}

            <div className="border-t border-white/5 p-4">

                <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 text-center">

                    <div className="mb-3 text-2xl">
                        ✦
                    </div>

                    <p className="text-sm italic leading-6 text-slate-400">
                        Build something worth showing.
                    </p>

                    <p className="mt-2 text-xs text-violet-300">
                        ProjectHub
                    </p>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;