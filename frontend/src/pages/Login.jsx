import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");

        }catch (error) {
            console.error("LOGIN ERROR:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
                alert(JSON.stringify(error.response.data));
            } else {
                console.log("Message:", error.message);
                alert(error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
                        Project<span className="text-indigo-400">Hub</span>
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Welcome back. Sign in to continue.
                    </p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-8"
                >

                    <div className="mb-5">
                        <label className="mb-2 block text-sm text-slate-300">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm text-slate-300">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-500 py-3 font-semibold hover:bg-indigo-600"
                    >
                        Sign In
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <span className="cursor-pointer text-indigo-400 hover:text-indigo-300">
            Create one
          </span>
                </p>

            </div>
        </div>
    );
}

export default Login;