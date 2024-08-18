"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Wait from "../modals-status/pickup/wait";
import Success from "../modals-status/pickup/success";
import Cancel from "../modals-status/pickup/cancel";
import Mainpickup from "../mainpickup/page";
import { tr } from "date-fns/locale";
import Slidebar from "../components/slidebarLink"; // Corrected import path
import Bottombar from '../components/bottombarLink';
import Login from "../login/page";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function MainUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(0);
  const [modalName, setModalName] = useState("");
  const dateNow = new Date().toLocaleDateString(); // Declare and initialize the 'dateNow' variable
  const [statusShow, setStatusShow] = useState(0); // Declare and initialize the 'status' variable
  const [packageDetails, setPackageDetails] = useState(null);
  const [rowData, setRowData] = useState(0);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(rowData / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  const user = session?.user as { email?: string };

  const handleClick = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
    // You might want to fetch new data here based on the page
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return packageDetails && Array.isArray(packageDetails) ? (packageDetails as any[]).slice(startIndex, endIndex) : [];
  };

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(process.env.NEXT_USER_DATA || "");
        if (!response.ok) {
          throw new Error("Failed to fetch package details");
        }
        const data = await response.json();
        console.log("data", data.data);
        setRowData(data.data.rows);
        const formattedData = data.data.items.map((item: { userp_date: string | number | Date; }) => ({
          ...item,
          userp_date: new Date(item.userp_date).toLocaleDateString(),
        }));
        setPackageDetails(formattedData); // เก็บข้อมูลลงใน state
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, []);

  const handleToggleModal = (name = "", status = 0) => {
    setIsModalOpen(!isModalOpen);
    setModalName(name);
    setStatus(status);
  };
  if (session) {
    return (
      <div className="font-custom">
        <div className="flex">
          <div className="hidden md:flex">
            <Slidebar />
          </div>
          <div style={{ flex: 1, height: '100vh' }}>
            {
              statusShow === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  {/* <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Image src="/iconwork/pickup.png" alt="" width={400} height={100} />
                  <p className="text-2xl text-gray-400 font-custom">
                    ไม่มีข้อมูลเรียกรับพัสดุ
                  </p>
                </div>
              </div> */}
                  <div className="">
                    <p className="">ตารางเข้ารับพัสดุผู้ใช้งาน</p>


                  </div>
                  <div className="w-full md:max-w-screen-xl">
                    <div className="p-16 bg-white border border-gray-200 rounded-lg shadow">
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                ชื่อ
                              </th>
                              <th scope="col" className="px-6 py-3">
                                ที่อยู่
                              </th>
                              <th scope="col" className="px-6 py-3">
                                วันที่
                              </th>
                              <th scope="col" className="px-6 py-3">
                                จำนวน
                              </th>
                              <th scope="col" className="px-6 py-3">
                                สถานะ
                              </th>
                              <th scope="col" className="px-6 py-3">
                                หมายเหตุ
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {getCurrentPageData().map((item: { user_id: React.Key | null | undefined; userv_name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; userv_address: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; userp_date: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; userp_quantity: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; userp_status: any; }, index: any) => (
                              <tr key={item.user_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.userv_name}</td>
                                <td className="px-6 py-4">{item.userv_address}</td>
                                <td className="px-6 py-4">{item.userp_date}</td>
                                <td className="px-6 py-4">{item.userp_quantity}</td>

                                <td className="px-6 py-4">
                                  <button
                                    onClick={() => handleToggleModal(item.user_id?.toString(), Number(item.userp_status))}
                                    className="hover:underline"
                                  >
                                    <span className={`inline-flex items-center ${Number(item.userp_status) === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                      Number(item.userp_status) === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                        Number(item.userp_status) === 2 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                          Number(item.userp_status) === 3 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                            Number(item.userp_status) === 4 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                              Number(item.userp_status) === 5 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : ''
                                      } text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                                      <span className="w-2 h-2 me-1 rounded-full" style={{
                                        backgroundColor:
                                          Number(item.userp_status) === 0 ? '#FFD700' :
                                            Number(item.userp_status) === 1 ? '#1E90FF' :
                                              Number(item.userp_status) === 2 ? '#FFD700' :
                                                Number(item.userp_status) === 3 ? '#FFD700' :
                                                  Number(item.userp_status) === 4 ? '#008000' :
                                                    Number(item.userp_status) === 5 ? '#FF0000' : ''
                                      }}></span>
                                      {Number(item.userp_status) === 0 ? 'รอเข้ารับพัสดุ' :
                                        Number(item.userp_status) === 1 ? 'เตรียมเข้ารับพัสดุ' :
                                          Number(item.userp_status) === 2 ? 'รอใบเสร็จชำระเงิน' :
                                            Number(item.userp_status) === 3 ? 'รอตรวจสอบในชำระเงิน' :
                                              Number(item.userp_status) === 4 ? 'จัดส่งพัสดุเรียบร้อย' :
                                                Number(item.userp_status) === 5 ? 'แก้ไขหลักฐาน' : ''}
                                    </span>
                                  </button>

                                </td>

                                <td className="px-6 py-4">- ไม่มี -</td>

                              </tr>
                            ))}

                          </tbody>
                        </table>
                      </div>
                      <div className="flex justify-center items-center pt-4">
                        <nav aria-label="Page navigation example">
                          <ul className="inline-flex -space-x-px text-base h-10">
                            <li>
                              <a
                                href="#"
                                onClick={() => handleClick(currentPage - 1)}
                                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                              >
                                Previous
                              </a>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                              <li key={index}>
                                <a
                                  href="#"
                                  onClick={() => handleClick(index + 1)}
                                  className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === index + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                  aria-current={currentPage === index + 1 ? 'page' : undefined}
                                >
                                  {index + 1}
                                </a>
                              </li>
                            ))}
                            <li>
                              <a
                                href="#"
                                onClick={() => handleClick(currentPage + 1)}
                                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                              >
                                Next
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  {isModalOpen && (
                    <>
                      {status === 2 && <Wait handleToggleModal={handleToggleModal} />}
                      {status === 4 && <Success handleToggleModal={handleToggleModal} />}
                      {status === 5 && <Cancel handleToggleModal={handleToggleModal} name={modalName} />}

                    </>
                  )}
                </div>
              ) : (
                <Mainpickup />
              )
            }
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
