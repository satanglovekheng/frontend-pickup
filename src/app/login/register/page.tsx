"use client";
import React from 'react';
import Link from 'next/link';

export default function Register() {
    return (
        <>
            <section
                className=" min-h-screen flex items-center justify-center"
                style={{ 
                    backgroundImage: 'url("/iconwork/loginPage.png")', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}
            >
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">

                    <div className="px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">สมัครสมาชิก</h2>
                        <p className="text-xs mt-4 text-[#002D74]">สมัครสมาชิกเข้าใช้งานระบบ</p>

                        <form action="" className="flex flex-col gap-4">
                            <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" />
                            <div className="relative">
                                <input className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" />
                            </div>
                            <div className="relative">
                                <input className="p-2 rounded-xl border w-full" type="password" name="confirmPassword" placeholder="Confirm Password" />
                            </div>
                            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
                        </form>

                        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm">หรือ</p>
                            <hr className="border-gray-400" />
                        </div>

                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>มีสมาชิก</p>
                            <Link href="/login">
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
