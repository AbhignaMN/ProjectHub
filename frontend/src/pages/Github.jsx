import { useState } from "react";

import {
    Search,
    Users,
    GitFork,
    Star,
    BookOpen,
    ExternalLink,
    Loader2,
    Code2,
    GitBranch,
} from "lucide-react";


const GITHUB_API = "https://api.github.com";


function Github() {

    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [repositories, setRepositories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const searchGithub = async (event) => {

        event.preventDefault();

        const cleanUsername = username.trim();

        if (!cleanUsername) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            setProfile(null);
            setRepositories([]);

            const profileResponse = await fetch(
                `${GITHUB_API}/users/${cleanUsername}`
            );

            if (!profileResponse.ok) {

                if (profileResponse.status === 404) {
                    throw new Error("GitHub user not found.");
                }

                throw new Error(
                    "Unable to fetch GitHub profile."
                );
            }

            const profileData =
                await profileResponse.json();


            const repoResponse = await fetch(
                `${GITHUB_API}/users/${cleanUsername}/repos?per_page=100&sort=updated`
            );

            if (!repoResponse.ok) {
                throw new Error(
                    "Unable to fetch repositories."
                );
            }

            const repoData =
                await repoResponse.json();


            setProfile(profileData);
            setRepositories(repoData);

        } catch (err) {

            console.error(
                "GitHub integration error:",
                err
            );

            setError(
                err.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };


    const totalStars = repositories.reduce(
        (total, repo) =>
            total + (repo.stargazers_count || 0),
        0
    );


    const totalForks = repositories.reduce(
        (total, repo) =>
            total + (repo.forks_count || 0),
        0
    );


    return (

        <div className="min-h-screen bg-[#020617] text-white">

            <main className="px-6 py-10 lg:ml-64 lg:px-10">

                <div className="mx-auto max-w-7xl">


                    {/* Header */}

                    <div>

                        <p className="text-sm font-medium tracking-widest text-violet-300">
                            DEVELOPER PROFILE
                        </p>

                        <h1 className="mt-2 text-4xl font-bold">
                            GitHub
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Connect your GitHub profile and showcase
                            your development activity.
                        </p>

                    </div>


                    {/* Search */}

                    <form
                        onSubmit={searchGithub}
                        className="mt-8 flex max-w-2xl gap-3"
                    >

                        <div className="relative flex-1">

                            <Code2
                                size={18}
                                className="absolute left-4 top-3.5 text-slate-500"
                            />

                            <input
                                value={username}
                                onChange={(event) =>
                                    setUsername(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter GitHub username"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-11 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/50"
                            />

                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-50"
                        >

                            {loading ? (
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                            ) : (
                                <Search size={18} />
                            )}

                            {loading
                                ? "Loading..."
                                : "Connect"}

                        </button>

                    </form>


                    {/* Error */}

                    {error && (

                        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
                            {error}
                        </div>

                    )}


                    {/* Profile */}

                    {profile && (

                        <>

                            <div className="glass mt-8 rounded-3xl p-7">

                                <div className="flex flex-col gap-6 md:flex-row md:items-center">

                                    <img
                                        src={profile.avatar_url}
                                        alt={profile.login}
                                        className="h-24 w-24 rounded-2xl border border-violet-500/20"
                                    />


                                    <div className="flex-1">

                                        <div className="flex flex-wrap items-center gap-3">

                                            <h2 className="text-2xl font-bold">
                                                {profile.name ||
                                                    profile.login}
                                            </h2>

                                            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                                                @{profile.login}
                                            </span>

                                        </div>


                                        {profile.bio && (

                                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                                                {profile.bio}
                                            </p>

                                        )}


                                        <a
                                            href={profile.html_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200"
                                        >

                                            View GitHub profile

                                            <ExternalLink size={14} />

                                        </a>

                                    </div>

                                </div>

                            </div>


                            {/* Stats */}

                            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                                <Stat
                                    icon={BookOpen}
                                    label="Repositories"
                                    value={profile.public_repos}
                                />

                                <Stat
                                    icon={Users}
                                    label="Followers"
                                    value={profile.followers}
                                />

                                <Stat
                                    icon={Star}
                                    label="Total Stars"
                                    value={totalStars}
                                />

                                <Stat
                                    icon={GitFork}
                                    label="Total Forks"
                                    value={totalForks}
                                />

                            </div>


                            {/* Repositories */}

                            <section className="mt-10">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm font-medium tracking-widest text-violet-300">
                                            DEVELOPMENT
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold">
                                            Repositories
                                        </h2>

                                    </div>

                                    <span className="text-sm text-slate-600">
                                        {repositories.length} shown
                                    </span>

                                </div>


                                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                                    {repositories.map(
                                        (repo) => (

                                            <RepositoryCard
                                                key={repo.id}
                                                repo={repo}
                                            />

                                        )
                                    )}

                                </div>

                            </section>

                        </>

                    )}


                    {/* Empty state */}

                    {!profile &&
                        !loading &&
                        !error && (

                            <div className="glass mt-10 rounded-3xl p-16 text-center">

                                <Code2
                                    size={55}
                                    className="mx-auto text-violet-400"
                                />

                                <h2 className="mt-5 text-2xl font-bold">
                                    Your code. Your work. Your story.
                                </h2>

                                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                                    Enter a GitHub username to bring
                                    real repositories and development
                                    statistics into ProjectHub.
                                </p>

                            </div>

                        )}

                </div>

            </main>

        </div>
    );
}


/* ----------------------------- */
/* Stat                          */
/* ----------------------------- */

function Stat({
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

                    <p className="mt-1 text-2xl font-bold">
                        {value ?? 0}
                    </p>

                </div>

            </div>

        </div>
    );
}


/* ----------------------------- */
/* Repository card               */
/* ----------------------------- */

function RepositoryCard({ repo }) {

    return (

        <div className="group rounded-2xl border border-white/5 bg-slate-950/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30">

            <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">

                        <Code2 size={19} />

                    </div>

                    <h3 className="font-semibold">
                        {repo.name}
                    </h3>

                </div>


                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) =>
                        event.stopPropagation()
                    }
                    className="text-slate-600 transition hover:text-violet-300"
                >

                    <ExternalLink size={17} />

                </a>

            </div>


            <p className="mt-4 line-clamp-3 min-h-[60px] text-sm leading-5 text-slate-500">
                {repo.description ||
                    "No repository description."}
            </p>


            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">

                {repo.language && (

                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-300">
                        {repo.language}
                    </span>

                )}

                <span className="flex items-center gap-1 text-slate-500">

                    <Star size={13} />

                    {repo.stargazers_count}

                </span>

                <span className="flex items-center gap-1 text-slate-500">

                    <GitFork size={13} />

                    {repo.forks_count}

                </span>

            </div>


            <div className="mt-5 border-t border-white/5 pt-4">

                <div className="flex items-center gap-2 text-xs text-slate-600">

                    <GitBranch size={14} />

                    {repo.default_branch}

                    <span className="ml-auto">

                        Updated{" "}
                        {new Date(
                            repo.updated_at
                        ).toLocaleDateString()}

                    </span>

                </div>

            </div>

        </div>
    );
}


export default Github;