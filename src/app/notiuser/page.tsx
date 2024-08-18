"use client";
import React, { useState } from "react";
import Slidebar from "../components/slidebarLink"; // Corrected import path
import Bottombar from '../components/bottombarLink';
import Login from "../login/page";
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Notiuser() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as { email?: string };
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (session) {
    return (
      <div className="font-custom">
        <div className="flex">
          <div className="hidden md:flex">
            <Slidebar />
          </div>
          <div style={{ flex: 1, height: '100vh' }}>
            <div className="" >
              <h1 className="text-4xl font-bold text-gray-800">Pickup Service</h1>

              <React.Fragment>
                <button
                  onClick={handleToggleModal}
                  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Toggle modal
                </button>

                {isModalOpen && (
                  <>
                    <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
                    <div
                      id="default-modal"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto"
                    >
                      <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              Terms of Service
                            </h3>
                            <button
                              onClick={handleToggleModal}
                              type="button"
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                          </div>

                          <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                              With less than a month to go before the European Union enacts
                              new consumer privacy laws for its citizens, companies around
                              the world are updating their terms of service agreements to
                              comply.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                              The European Union’s General Data Protection Regulation
                              (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                              common set of data rights in the European Union. It requires
                              organizations to notify users as soon as possible of high-risk
                              data breaches that could personally affect them.
                            </p>
                          </div>

                          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                              onClick={handleToggleModal}
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              I accept
                            </button>
                            <button
                              onClick={handleToggleModal}
                              type="button"
                              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
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