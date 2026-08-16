import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            alert("Account created successfully!");

            navigate("/login");

        } catch (error) {
            console.error(
                "REGISTER ERROR:",
                error
            );

            if (error.response) {
                alert(
                    error.response.data?.error ||
                    "Registration failed."
                );
            } else {
                alert(
                    "Unable to connect to the server."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                {/* Logo */}

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold">
                        Project
                        <span className="text-indigo-400">
                            Hub
                        </span>
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Create your workspace and start building.
                    </p>

                </div>


                {/* Register form */}

                <form
                    onSubmit={handleRegister}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-8"
                >

                    {/* Name */}

                    <div className="mb-5">

                        <label className="mb-2 block text-sm text-slate-300">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Your name"
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* Email */}

                    <div className="mb-5">

                        <label className="mb-2 block text-sm text-slate-300">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* Password */}

                    <div className="mb-6">

                        <label className="mb-2 block text-sm text-slate-300">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="••••••••"
                            required
                            minLength={6}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />

                    </div>


                    {/* Create account */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-500 py-3 font-semibold transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Creating account..."
                            : "Create Account"}
                    </button>

                </form>


                {/* Login */}

                <p className="mt-6 text-center text-sm text-slate-400">

                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/login")
                        }
                        className="font-medium text-indigo-400 transition hover:text-indigo-300"
                    >
                        Sign in
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Register;