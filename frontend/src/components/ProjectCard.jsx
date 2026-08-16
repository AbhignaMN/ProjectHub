import {
    FolderKanban,
    ArrowUpRight,
} from "lucide-react";

function ProjectCard({
                         name,
                         description,
                         category,
                     }) {

    return (
        <div className="group glass overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-violet-500/40">

            {/* Project preview */}

            <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 via-slate-900 to-fuchsia-950">

                <div className="absolute inset-0 opacity-30">

                    <div className="absolute left-10 top-8 h-24 w-24 rounded-full bg-violet-500 blur-3xl" />

                    <div className="absolute bottom-0 right-10 h-24 w-24 rounded-full bg-fuchsia-500 blur-3xl" />

                </div>

                <FolderKanban
                    size={48}
                    className="relative text-violet-300 transition duration-300 group-hover:scale-110"
                />

                <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-violet-200 backdrop-blur">
                    {category}
                </span>

            </div>

            {/* Project information */}

            <div className="p-5">

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <h3 className="text-lg font-semibold text-white">
                            {name}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                            {description || "No description provided."}
                        </p>

                    </div>

                    <button
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-violet-300"
                        title="Open project"
                    >
                        <ArrowUpRight size={18} />
                    </button>

                </div>

                <div className="mt-5 border-t border-white/5 pt-4">

                    <button className="text-sm font-medium text-violet-300 transition hover:text-violet-200">
                        Open project →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProjectCard;