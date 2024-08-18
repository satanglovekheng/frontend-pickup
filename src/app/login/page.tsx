"use client";
// Import useRef and other necessary components
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { ca } from 'date-fns/locale';

// Define your component
export default function Login() {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleLogin = () => {
        console.log("username", username.current?.value);
        console.log("password", password.current?.value);
        signIn("credentials", {
            username: username.current?.value,
            password: password.current?.value,
            redirect: true,
            callbackUrl: "/",
        })
    }

    return (
        <>
            <section className="min-h-screen flex items-center justify-center"
                style={{
                    backgroundImage: 'url("/iconwork/loginPage.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:block hidden w-1/2">
                        <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" className="rounded-2xl" alt="page img" />
                    </div>

                    <div className="md:w-1/2 px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">เข้าสู่ระบบ</h2>
                        <p className="text-xs mt-4 text-[#002D74]">ถ้ามีสมัครชิกแล้วเข้าสู่ระบบเพื่อช้งาน</p>

                        <div className="flex flex-col gap-4">
                            <input ref={username} className="p-2 mt-8 rounded-xl border" type="text" name="username" placeholder="username" />
                            <div className="relative">
                                <input ref={password} className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" />
                            </div>
                           
                           {/* Use Next.js Link for client-side navigation */}

                                <button type="submit" onClick={handleLogin} className="bg-[#002D74] w-full rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>

                        </div>

                        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm">หรือ</p>
                            <hr className="border-gray-400" />
                        </div>

                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>ยังไม่มีสมาชิก</p>
                            <Link href="/login/register">
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
