"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ModalEmBill from "../modals-status/employee/bill";
import ModalEmCancel from "../modals-status/employee/verify";
import Wait from "../modals-status/pickup/wait";
import Success from "../modals-status/pickup/success";
import Cancel from "../modals-status/pickup/cancel";
import Mainpickup from "../mainpickup/page";
import Slidebar from "../components/slidebarLink"; // Corrected import path
import Bottombar from '../components/bottombarLink';
import Login from "../login/page";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function MainUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(0);
    const [modalName, setModalName] = useState("");
    const dateNow = new Date().toLocaleDateString();
    const [statusShow, setStatusShow] = useState(0);
    const [packageDetails, setPackageDetails] = useState<any[]>([]);
    const [rowData, setRowData] = useState(null);
    const rowsPerPage = 5;
    const totalPages = rowData ? Math.ceil(rowData / rowsPerPage) : 0;
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
        return packageDetails && Array.isArray(packageDetails) ? (packageDetails as Array<any>).slice(startIndex, endIndex) : [];
    };

    const updateStatus = (status : any) => {
        setIsModalOpen(!isModalOpen);
        // Call API /api/update-status with name
        fetch(process.env.NEXT_EMPLOYEE_UPDATE || '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ modalName , status }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('name response:', modalName);
                console.log('API response:', data);
                // Update item.userp_status based on API response
                const updatedPackageDetails = (packageDetails as unknown as Array<any>)?.map(item => {
                    if (item.userv_id === modalName) {
                        return {
                            ...item,
                            userp_status: data.userp_status, // Assuming API returns userp_status
                        };
                    }
                    return item;
                });
                setPackageDetails(updatedPackageDetails);
            })
            .catch(error => {
                console.error('Error calling API:', error);
                // Handle error
            });
    };

    const ModalService = (name: any, status: number) => {


        return (
            <>
                <div className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? "" : "hidden"}`}>
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div id="popup-modal" tabIndex={-1} className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => {
                                    handleToggleModal("",9);}}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">ปิด</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">เข้ารับพัสดุสำเร็จ?</h3>
                            <p>{name}</p>
                            <button
                                onClick={() => {
                                    updateStatus(2);
                                    handleToggleModal("",9);
                                }}
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                เข้ารับพัสดุ
                            </button>

                            <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => {
                                    handleToggleModal("",9);}}>ปิด</button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const ModalImage = ({ imageUrl }: { imageUrl: string }) => {
        return (
            <>
                <div className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen ? "" : "hidden"}`}>
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div id="popup-modal" tabIndex={-1} className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => {
                                    handleToggleModal("",9);}}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">ปิด</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <div className="flex justify-center p-4">
                                <Image
                                    src={imageUrl}
                                    alt="User Image"
                                    width={300}
                                    height={200}
                                />
                            </div>
                            <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => {
                                    handleToggleModal("",9);}}>ปิด</button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await fetch(process.env.NEXT_PICKUP_DATA || '');
                if (!response.ok) {
                    throw new Error("Failed to fetch package details");
                }
                const data = await response.json();
                console.log("Package details:", data);
                setRowData(data.data.rows);
                const formattedData = data.data.items.map((item: { userp_date: string | number | Date; }) => ({
                    ...item,
                    userp_date: new Date(item.userp_date).toLocaleDateString(),
                }));
                setPackageDetails(formattedData);
            } catch (error) {
                console.error("Error fetching package details:", error);
            }
        };

        fetchPackageDetails();
    }, []);

    const handleToggleModal = (userv_id: string, userp_status: number) => {
        setIsModalOpen(!isModalOpen);
        setModalName(userv_id);
        setStatus(userp_status);
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
                                    <p className="">ตารางเข้ารับพัสดุรับของ</p>
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
                                                                ภาพ
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
                                                        {getCurrentPageData().map((item, index) => (
                                                            <tr key={item.userv_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.userv_name}</td>
                                                                <td className="px-6 py-4">{item.userv_address}</td>
                                                                <td className="px-6 py-4">{item.userp_date}</td>
                                                                <td className="px-6 py-4">{item.userp_quantity}</td>
                                                                <td className="px-6 py-4">
                                                                    <img src={`/${item.userp_image}`} alt="User Package Image" className="h-16 w-16 object-cover" />
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <button
                                                                        onClick={() => handleToggleModal(item.userv_id, Number(item.userp_status))}
                                                                        className="hover:underline"
                                                                    >
                                                                        <span className={`inline-flex items-center ${Number(item.userp_status) === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                                            Number(item.userp_status) === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                                                                Number(item.userp_status) === 2 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                                                    Number(item.userp_status) === 3 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                                                        Number(item.userp_status) === 4 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : ''
                                                                            } text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                                                                            <span className="w-2 h-2 me-1 rounded-full" style={{
                                                                                backgroundColor:
                                                                                    Number(item.userp_status) === 0 ? '#FFD700' :
                                                                                        Number(item.userp_status) === 1 ? '#1E90FF' :
                                                                                            Number(item.userp_status) === 2 ? '#FFD700' :
                                                                                                Number(item.userp_status) === 3 ? '#008000' :
                                                                                                    Number(item.userp_status) === 4 ? '#FF0000' : ''
                                                                            }}></span>
                                                                            {Number(item.userp_status) === 0 ? 'รอเข้ารับพัสดุ' :
                                                                                Number(item.userp_status) === 1 ? 'เตรียมเข้ารับพัสดุ' :
                                                                                    Number(item.userp_status) === 2 ? 'ชำระเงิน' :
                                                                                        Number(item.userp_status) === 3 ? 'จัดส่งพัสดุเรียบร้อย' :
                                                                                            Number(item.userp_status) === 4 ? 'แก้ไขหลักฐาน' : ''}
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
                                            {status === 1 && ModalService(modalName, status)}
                                            
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
