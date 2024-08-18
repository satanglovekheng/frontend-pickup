"use client";
import React from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Slidebar from "../components/slidebarLink"; // Corrected import path
import Bottombar from '../components/bottombarLink';
import Login from "../login/page";

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user as { email?: string };
  const handleLogout = async () => {
    console.log("Logout");
    await signOut();
    // Redirect to login or home page after logout if necessary
  };

  if(session){
    return (
      <div className="font-custom">
        <div className="flex">
          <div className="hidden md:flex">
            <Slidebar />
          </div>
          <div style={{ flex: 1, height: '100vh' }}>
            <div className="">
              <div className="flex flex-col justify-center text-center h-">
                <p className="justify-start py-6 font-custom text-2xl">หน้าโปรไฟล์</p>
                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                  <div className="flex flex-col">
                    <div className=" flex flex-col md:flex-row   ">
                      <div className="w-full bg-white grid place-items-center flex-col md:w-1/3 bg-white grid place-items-center bg-blue-600 rounded-2xl">
                        <div className="text-center">
                          <div className="">
                            <img
                              src="iconwork/profileUserlow.png"
                              alt="tailwind logo"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="text-center mt-2">
                            <h2 className="font-semibold">จักรพล รุ่งเรือง</h2>
                            <p className="text-gray-500">012-3456789</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-white flex flex-col space-y-2 p-3">
                        <div className="w-full  bg-gray-200 flex flex-col space-y-2 p-3 rounded-2xl">
                          <div className="p-4">
                            <div className="flex-col space-x-1">
                              <div className="w-full">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ชื่อ-สกุล
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
  
                              <div className="w-full">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ที่อยู่
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
  
                              <div className="w-full">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  เบอร์โทร
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
  
                              <div className="w-full">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  รายละเอียด
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    id="first-name"
                                    name="first-name"
                                    rows={3}
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div className="p-4 w-full">
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        บันทึก
                      </button>
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        ยกเลิก
                      </button>

                      <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={handleLogout}
                      >
                        ออกจากระบบ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <Bottombar />
        </div>
      </div>
  
    );
  }
  return (
    <>
      <Login />
    </>
  );
}
