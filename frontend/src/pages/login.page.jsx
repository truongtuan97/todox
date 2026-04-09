import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import api from "@/lib/axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await api.post("/auth/login", { email, password });
            const token = res?.data?.token;

            if (!token) {
                toast.error("Login failed: token not found");
                return;
            }

            localStorage.setItem("token", token);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            const message = error?.response?.data?.message || "Login failed";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-md rounded-2xl">
                <h1 className="text-2xl font-semibold text-center">Login</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            className="w-full px-3 py-2 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 font-medium text-white transition rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-60"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-center text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="font-medium text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
