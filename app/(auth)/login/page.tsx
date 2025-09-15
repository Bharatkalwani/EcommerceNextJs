"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";


export default function page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const handleSubmit = async() => {
        console.log(email, password)
        const data= await  loginUser({email,password})
       localStorage.setItem("token", data.token);
        router.push("/")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-sky-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                        <Link
                            href="/forget-password"
                            className="text-blue-500 hover:underline"
                        >
                            Forgot Password
                        </Link>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}

                    <Link
                        href="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Sign Up
                    </Link>

                </p>
            </div>
        </div>
    );
}