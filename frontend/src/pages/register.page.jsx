import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import api from "@/lib/axios";
import { registerFormSchema } from "@/schemas/register.schema";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationResult = registerFormSchema.safeParse({
            email,
            password,
            confirmPassword,
        });

        if (!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || "",
                confirmPassword: fieldErrors.confirmPassword?.[0] || "",
            });
            return;
        }
        setErrors({});

        try {
            setIsSubmitting(true);
            await api.post("/auth/register", { email, password });
            toast.success("Register successful. Please login.");
            navigate("/login");
        } catch (error) {
            const message = error?.response?.data?.message || "Register failed";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-md rounded-2xl">
                <h1 className="text-2xl font-semibold text-center">Register</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((prev) => ({ ...prev, email: "" }));
                            }}
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-primary"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors((prev) => ({
                                    ...prev,
                                    password: "",
                                    confirmPassword: "",
                                }));
                            }}
                            placeholder="Create a password"
                            className="w-full px-3 py-2 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-primary"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                            }}
                            placeholder="Re-enter your password"
                            className="w-full px-3 py-2 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-primary"
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 font-medium text-white transition rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-60"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-sm text-center text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
