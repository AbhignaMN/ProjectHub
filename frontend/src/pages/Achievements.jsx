import { useState } from "react";

const defaultAchievements = [
    {
        id: 1,
        title: "ProjectHub Builder",
        description: "Built a full-stack project management platform.",
        category: "Projects",
        icon: "🚀",
    },
    {
        id: 2,
        title: "GitHub Developer",
        description: "Connected GitHub development activity to ProjectHub.",
        category: "Development",
        icon: "💻",
    },
    {
        id: 3,
        title: "DSA Progress",
        description: "Consistently solving data structures and algorithms problems.",
        category: "Coding",
        icon: "🧠",
    },
];

function Achievements() {

    const [achievements, setAchievements] =
        useState(defaultAchievements);

    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Development");
    const [icon, setIcon] = useState("🏆");

    const addAchievement = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        const achievement = {
            id: Date.now(),
            title: title.trim(),
            description:
                description.trim() ||
                "A milestone worth celebrating.",
            category,
            icon,
        };

        setAchievements([
            ...achievements,
            achievement,
        ]);

        setTitle("");
        setDescription("");
        setCategory("Development");
        setIcon("🏆");
        setShowForm(false);
    };

    const deleteAchievement = (id) => {
        setAchievements(
            achievements.filter(
                (achievement) =>
                    achievement.id !== id
            )
        );
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white">

            <main className="px-6 py-10 lg:ml-64 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    <p className="text-sm font-medium tracking-widest text-violet-300">
                        MILESTONES
                    </p>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-4">

                        <div>

                            <h1 className="text-4xl font-bold">
                                Achievements
                            </h1>

                            <p className="mt-2 text-slate-500">
                                Track the work you're proud of.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                setShowForm(!showForm)
                            }
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-semibold"
                        >
                            + Add Achievement
                        </button>

                    </div>


                    {/* Add achievement */}

                    {showForm && (

                        <form
                            onSubmit={addAchievement}
                            className="glass mt-8 rounded-3xl p-6"
                        >

                            <h2 className="text-xl font-semibold">
                                New Achievement
                            </h2>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">

                                <input
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    placeholder="Achievement title"
                                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-violet-500"
                                />

                                <input
                                    value={icon}
                                    onChange={(e) =>
                                        setIcon(e.target.value)
                                    }
                                    placeholder="Emoji"
                                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-violet-500"
                                />

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
                                >
                                    <option>
                                        Development
                                    </option>

                                    <option>
                                        Projects
                                    </option>

                                    <option>
                                        Coding
                                    </option>

                                    <option>
                                        Career
                                    </option>

                                    <option>
                                        Learning
                                    </option>
                                </select>

                                <input
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                    placeholder="What did you accomplish?"
                                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-violet-500"
                                />

                            </div>

                            <div className="mt-5 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                    className="rounded-xl border border-white/10 px-5 py-3 text-sm"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold"
                                >
                                    Save Achievement
                                </button>

                            </div>

                        </form>
                    )}


                    {/* Summary */}

                    <div className="glass mt-8 rounded-3xl p-7">

                        <div className="flex items-center gap-5">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl">
                                🏆
                            </div>

                            <div>

                                <p className="text-sm text-slate-500">
                                    Your milestones
                                </p>

                                <p className="text-3xl font-bold">
                                    {achievements.length}
                                </p>

                            </div>

                            <div className="ml-auto hidden text-right md:block">

                                <p className="text-sm text-slate-500">
                                    Keep building.
                                </p>

                                <p className="mt-1 text-sm text-violet-300">
                                    Every project counts.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Achievement cards */}

                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {achievements.map(
                            (achievement) => (

                                <div
                                    key={achievement.id}
                                    className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30"
                                >

                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl" />

                                    <div className="relative">

                                        <div className="flex items-start justify-between">

                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
                                                {achievement.icon}
                                            </div>

                                            <button
                                                onClick={() =>
                                                    deleteAchievement(
                                                        achievement.id
                                                    )
                                                }
                                                className="text-sm text-slate-700 transition hover:text-red-400"
                                            >
                                                🗑
                                            </button>

                                        </div>

                                        <span className="mt-6 inline-block rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-300">
                                            {achievement.category}
                                        </span>

                                        <h2 className="mt-4 text-xl font-bold">
                                            {achievement.title}
                                        </h2>

                                        <p className="mt-3 text-sm leading-6 text-slate-500">
                                            {achievement.description}
                                        </p>

                                        <div className="mt-6 border-t border-white/5 pt-4 text-xs text-slate-600">
                                            Milestone
                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>
            </main>
        </div>
    );
}

export default Achievements;