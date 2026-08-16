import { GitBranch, GitCommit, GitPullRequest, Star } from "lucide-react";

function GithubStats() {
    return (
        <div className="glass rounded-2xl p-6">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <GitBranch size={22} />

                    <h2 className="font-semibold">
                        GitHub Stats
                    </h2>
                </div>

                <button className="text-xs text-violet-300 hover:text-violet-200">
                    View profile →
                </button>

            </div>

            <div className="mt-7 grid grid-cols-3 gap-4">

                <div>
                    <GitCommit className="mb-2 text-violet-400" size={18} />

                    <p className="text-2xl font-bold">
                        248
                    </p>

                    <p className="text-xs text-slate-500">
                        Commits
                    </p>
                </div>

                <div>
                    <GitPullRequest className="mb-2 text-cyan-400" size={18} />

                    <p className="text-2xl font-bold">
                        18
                    </p>

                    <p className="text-xs text-slate-500">
                        PRs
                    </p>
                </div>

                <div>
                    <Star className="mb-2 text-yellow-400" size={18} />

                    <p className="text-2xl font-bold">
                        42
                    </p>

                    <p className="text-xs text-slate-500">
                        Stars
                    </p>
                </div>

            </div>

            {/* Contribution heatmap */}

            <div className="mt-7">

                <p className="mb-3 text-xs text-slate-500">
                    Contribution activity
                </p>

                <div className="grid grid-cols-14 gap-1">

                    {Array.from({ length: 70 }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-3 w-3 rounded-sm ${
                                index % 7 === 0
                                    ? "bg-violet-500"
                                    : index % 5 === 0
                                        ? "bg-violet-800"
                                        : "bg-slate-800"
                            }`}
                        />
                    ))}

                </div>

            </div>

            <div className="mt-5 text-sm text-violet-300">
                🔥 12 day contribution streak
            </div>

        </div>
    );
}

export default GithubStats;