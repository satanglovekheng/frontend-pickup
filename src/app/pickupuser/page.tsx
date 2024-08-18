"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import axios from "axios";
import Slidebar from "../components/slidebarLink"; // Corrected import path
import Bottombar from '../components/bottombarLink';
import Login from "../login/page";
import { useSession, signIn, signOut } from 'next-auth/react';

interface PackageDetail {
  pk_id: number;
  pk_name: string;
  // Add any other properties if needed
}

export default function PickupUser() {
  const { data: session } = useSession();
  const user = session?.user as { email?: string };
  const [startDate, setStartDate] = useState(new Date());
  const [image, setImage] = useState("/iconwork/wantimage.png");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [packageDetails, setPackageDetails] = useState<PackageDetail[]>([]);
  const [userDetails, setUserDetails] = useState({
    userp_userv: "",
    userp_tel: "",
    userp_address: "",
    userv_detail: "",
    userp_package: {}, // Initial empty object for packages
    userp_image: "",
    userp_status: "",
  });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(process.env.NEXT_PACKAGE_DATA || '');
        if (!response.ok) {
          throw new Error("Failed to fetch package details");
        }
        const data: PackageDetail[] = await response.json();
        setPackageDetails(data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handlePackageChange = (pkgId: number, quantity: string) => {
    setUserDetails({
      ...userDetails,
      userp_package: {
        ...userDetails.userp_package,
        [pkgId]: quantity,
      },
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUserDetails({
        ...userDetails,
        userp_image: file.name, // Update to handle file upload logic
      });
      setImage(URL.createObjectURL(file));
    }
  };

  const handleIconClick = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const InsetService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.NEXT_USER_SERVICE || '', {
        ...userDetails,
        user_id: 1,
        userv_name: userDetails.userp_userv,
        userv_tel: userDetails.userp_tel,
        userv_letlong: location,
        userv_address: userDetails.userp_address,
        userv_detail: userDetails.userv_detail,
      });

      const userv_id = response.data.userv_id; // Assuming the response contains userv_id

      // Now you can use userv_id for your next API call
      handleSubmit(userv_id);

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = async (userv_id: number) => {
    try {
      const totalQuantity = Object.values(userDetails.userp_package).reduce(
        (acc: number, qty: any) => acc + Number(qty),
        0
      );

      const response = await axios.post(process.env.NEXT_USER_PICKUP || '', {
        ...userDetails,
        userp_date: startDate,
        userv_id: userv_id, // Use the retrieved userv_id here
        userp_package: JSON.stringify(userDetails.userp_package),
        userp_quantity: totalQuantity, // Add the total quantity
        userp_image: userDetails.userp_image,
        userp_status: "0",
      });
      window.location.href = "/";
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (session) {
    return (
      <div className="font-custom">
        <div className="flex">
          <div className="hidden md:flex">
            <Slidebar />
          </div>
          <div style={{ flex: 1, height: '100vh' }}>
            <div className="flex flex-col items-center justify-center">
              <p className="justify-start py-6 font-custom text-2xl ">เรียกรับพัสดุ</p>
              <div className="bg-gray-100 border-2 border-indigo-600 rounded-3xl w-full max-w-screen-lg">
                <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                    <form className="space-y-3" onSubmit={InsetService}>
                      <p>ที่อยู่ในการเข้ารับ</p>

                      <div className="flex space-x-10">
                        {/* First Name */}
                        <div className="w-2/3">
                          <div className="flex-col">
                            <div className="flex space-x-2">
                              <div className="w-1/2">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ชื่อ-สกุล
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="first-name"
                                    name="userp_userv"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                                  />
                                </div>
                              </div>

                              <div className="w-1/2">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  เบอร์โทร
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="first-name"
                                    name="userp_tel"
                                    type="phone"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="w-1/7 pt-7" onClick={handleIconClick}>
                                <Image
                                  src={"/iconwork/Map.png"}
                                  alt="Map"
                                  className="h-8 w-8 cursor-pointer"
                                  height={32}
                                  width={32}
                                />
                              </div>

                              <div className="w-1/2">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ตำแหน่ง
                                </label>
                                <div className="mt-2 relative">
                                  <input
                                    id="first-name"
                                    name="userp_letlong"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    value={location}
                                    onChange={(e) => {
                                      setLocation(e.target.value);
                                      handleInputChange(e);
                                    }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {loading && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                      <svg
                                        className="animate-spin h-5 w-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                        ></circle>
                                        <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.963 7.963 0 014 12H2c0 3.042 1.135 5.824 3 7.938l1-1.647z"
                                        ></path>
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="w-1/2">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ที่อยู่
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="first-name"
                                    name="userp_address"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex space-x-4">
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
                                    name="userv_detail"
                                    rows={5}
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Last Name */}
                        <div className="w-1/3 ">
                          <div className="relative ">
                            <label
                              htmlFor="pickup-date"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Select Date
                            </label>
                            <div className="mt-2">
                              <DatePicker
                                selected={startDate}
                                inline
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(date) => date && setStartDate(date)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ประเภทวัสดุ (ชิ้น)
                        </label>
                        <div className="bg-gray-100 border-2 border-indigo-600 rounded-3xl">
                          <div className="p-8">
                            <div className="w-full flex gap-3 mb-6 md:grid-cols-5">
                              {packageDetails.map((pkg) => (
                                <input
                                  key={pkg.pk_id}
                                  id={`pk-${pkg.pk_id}`}
                                  name={`pk-${pkg.pk_id}`}
                                  type="number" // Changed to number for quantity input
                                  autoComplete="off"
                                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder={`${pkg.pk_name}`} // Added quantity placeholder
                                  onChange={(e) => handlePackageChange(pkg.pk_id, e.target.value)}
                                />
                              ))}
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                              <label htmlFor="file-upload" className="cursor-pointer">
                                <Image
                                  src={image} // Use the `image` state which holds the URL
                                  alt="รูปภาพพัสดุที่เรียกเข้ารับ"
                                  width={64}
                                  height={64}
                                  className="mr-2"
                                  onClick={() => console.log("Image clicked")}
                                />
                              </label>
                              <input
                                id="file-upload"
                                type="file"
                                onChange={handleImageChange}
                                className="hidden"

                              />
                              <span className="text-blue-500">
                                แนบรูปพัสดุที่เรียกเข้ารับ
                              </span>
                            </div>
                          </div>

                        </div>


                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md text-black bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          เรียกเข้ารับพัสดุ
                        </button>
                      </div>
                    </form>
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
