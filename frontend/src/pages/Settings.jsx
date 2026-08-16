import { useEffect, useState } from "react";
import axios from "axios";
import {
    User,
    Shield,
    Bell,
    Palette,
    LogOut,
    Save,
    CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadUser();

        const savedNotifications =
            localStorage.getItem("projecthub_notifications");

        const savedTheme =
            localStorage.getItem("projecthub_dark_mode");

        if (savedNotifications !== null) {
            setNotifications(
                savedNotifications === "true"
            );
        }

        if (savedTheme !== null) {
            setDarkMode(
                savedTheme === "true"
            );
        }
    }, []);

    const loadUser = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                "http://localhost:8080/api/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data);
            setName(response.data.name || "");
            setEmail(response.data.email || "");
        } catch (error) {
            console.error(
                "Failed to load user:",
                error
            );

            /*
             * If your backend doesn't have /api/auth/me yet,
             * we'll handle that separately instead of breaking
             * the rest of Settings.
             */
        }
    };

    const savePreferences = () => {
        localStorage.setItem(
            "projecthub_notifications",
            notifications
        );

        localStorage.setItem(
            "projecthub_dark_mode",
            darkMode
        );

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    const logout = () => {
        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white">

            <main className="px-6 py-10 lg:ml-64 lg:px-10">

                <div className="mx-auto max-w-5xl">

                    {/* Header */}

                    <div>

                        <p className="text-sm font-medium tracking-widest text-violet-300">
                            ACCOUNT
                        </p>

                        <h1 className="mt-2 text-4xl font-bold">
                            Settings
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Manage your ProjectHub account and preferences.
                        </p>

                    </div>


                    {/* Profile */}

                    <section className="glass mt-8 rounded-3xl p-7">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-bold">

                                {name
                                    ? name.charAt(0).toUpperCase()
                                    : "U"}

                            </div>

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Profile
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your ProjectHub account information.
                                </p>

                            </div>

                        </div>


                        <div className="mt-7 grid gap-5 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-sm text-slate-400">
                                    Name
                                </label>

                                <div className="relative">

                                    <User
                                        size={17}
                                        className="absolute left-4 top-3.5 text-slate-600"
                                    />

                                    <input
                                        value={name}
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-violet-500/50"
                                    />

                                </div>

                            </div>


                            <div>

                                <label className="mb-2 block text-sm text-slate-400">
                                    Email
                                </label>

                                <input
                                    value={email}
                                    readOnly
                                    className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-500 outline-none"
                                />

                            </div>

                        </div>

                    </section>


                    {/* Preferences */}

                    <section className="glass mt-6 rounded-3xl p-7">

                        <div className="flex items-center gap-4">

                            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">
                                <Palette size={20} />
                            </div>

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Preferences
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Customize your ProjectHub experience.
                                </p>

                            </div>

                        </div>


                        <div className="mt-7 divide-y divide-white/5">

                            {/* Dark mode */}

                            <SettingRow
                                icon={Palette}
                                title="Dark interface"
                                description="Keep the ProjectHub developer interface in dark mode."
                            >

                                <Toggle
                                    enabled={darkMode}
                                    setEnabled={setDarkMode}
                                />

                            </SettingRow>


                            {/* Notifications */}

                            <SettingRow
                                icon={Bell}
                                title="Notifications"
                                description="Receive notifications about your workspace activity."
                            >

                                <Toggle
                                    enabled={notifications}
                                    setEnabled={setNotifications}
                                />

                            </SettingRow>

                        </div>


                        <div className="mt-6 flex items-center justify-end gap-4">

                            {saved && (

                                <div className="flex items-center gap-2 text-sm text-emerald-400">

                                    <CheckCircle2 size={17} />

                                    Preferences saved

                                </div>

                            )}

                            <button
                                onClick={savePreferences}
                                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
                            >

                                <Save size={17} />

                                Save Preferences

                            </button>

                        </div>

                    </section>


                    {/* Security */}

                    <section className="glass mt-6 rounded-3xl p-7">

                        <div className="flex items-center gap-4">

                            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
                                <Shield size={20} />
                            </div>

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Security
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your account uses JWT-based authentication.
                                </p>

                            </div>

                        </div>


                        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5">

                            <div className="flex items-center justify-between gap-5">

                                <div>

                                    <p className="font-medium">
                                        Authentication
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Your current session is protected by a JWT token.
                                    </p>

                                </div>

                                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                                    Active
                                </span>

                            </div>

                        </div>

                    </section>


                    {/* Logout */}

                    <section className="mt-6 rounded-3xl border border-red-500/10 bg-red-500/[0.02] p-7">

                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                            <div>

                                <h2 className="font-semibold">
                                    Sign out
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Sign out of this ProjectHub account on this browser.
                                </p>

                            </div>

                            <button
                                onClick={logout}
                                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                            >

                                <LogOut size={17} />

                                Sign Out

                            </button>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}


/* -------------------------------- */
/* Setting row                      */
/* -------------------------------- */

function SettingRow({
                        icon: Icon,
                        title,
                        description,
                        children,
                    }) {
    return (
        <div className="flex items-center justify-between gap-6 py-5">

            <div className="flex items-center gap-4">

                <div className="rounded-xl bg-white/5 p-3 text-slate-400">
                    <Icon size={18} />
                </div>

                <div>

                    <p className="font-medium">
                        {title}
                    </p>

                    <p className="mt-1 max-w-xl text-sm leading-5 text-slate-500">
                        {description}
                    </p>

                </div>

            </div>

            {children}

        </div>
    );
}


/* -------------------------------- */
/* Toggle                           */
/* -------------------------------- */

function Toggle({
                    enabled,
                    setEnabled,
                }) {
    return (
        <button
            type="button"
            onClick={() =>
                setEnabled(!enabled)
            }
            className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                enabled
                    ? "bg-violet-600"
                    : "bg-slate-700"
            }`}
        >

            <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    enabled
                        ? "left-6"
                        : "left-1"
                }`}
            />

        </button>
    );
}


export default Settings;