"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type WaitProps = {
  handleToggleModal: (name: string) => void;
  name: string;
};

const Wait: React.FC<WaitProps> = ({ handleToggleModal, name }) => {
  const [image, setImage] = useState("/iconwork/wantimage.png");
  const [data, setData] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cost, setCost] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/employee/datapickup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
        const result = await response.json();
        setData(result.data.items[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [name]);

  useEffect(() => {
    // Enable button only if there's an image and a non-empty cost
    setIsButtonEnabled(image !== "/iconwork/wantimage.png" && cost.trim() !== "");
  }, [image, cost]);

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedFile = event.target.files;
    if (selectedFile && selectedFile.length > 0) {
      setFile(selectedFile[0]);
      const imageUrl = URL.createObjectURL(selectedFile[0]);
      setImage(imageUrl);
    }
  };

  const handleUpload = async () => {
    if (file && data) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pickup_id', data.pickup_id);
      formData.append('bill_cost', cost);

      try {
        const response = await fetch('http://localhost:3001/api/upload/bill', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          alert('Upload successful');
        } else {
          alert('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-50 font-custom"></div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white p-2 rounded-lg shadow dark:bg-gray-700">
            <div className="border-2 border-black rounded-lg">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  ใบแจ้งชำระเงิน
                </h3>

                <button
                  onClick={() => handleToggleModal("")}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  &times;
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <div className="flex flex-row">
                    <div className="flex-grow">ชื่อ : {data ? data.userv_name : 'N/A'}</div>
                    <div className="md:justify-end text-end">
                      วันที่ : {data ? new Date(data.userp_date).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </p>

                <div className="relative overflow-x-auto">
                  <div>
                    <div className="flex flex-col items-center justify-center space-x-2">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Image
                          src={image}
                          alt="รูปภาพพัสดุที่เรียกเข้ารับ"
                          width={150}
                          height={200}
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
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className="flex-grow text-end border-b text-red-500 pb-3">
                      <span>**จำนวนที่ต้องชำระ :</span>
                      <span>
                        <input
                          type="text"
                          id="bill_cost"
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="กรอกจำนวนเงิน"
                          required
                        />
                      </span>
                      <span> บาท**</span>
                    </div>
                    <div className="flex-grow flex-row">
                      <p>ธนาคารที่ทำรายการ : กรุงไทย</p>
                      <p>เลขที่บัญชี : 020-123456</p>
                      <p>เบอร์ติดต่อ : 012-3456789</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    handleUpload();
                    handleToggleModal("");
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled={!isButtonEnabled} // Disable or enable based on the state
                >
                  อัพโหลดหลักฐานการชำระเงิน
                </button>
                <button
                  onClick={() => handleToggleModal("")}
                  type="button"
                  className="text-red-300 py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"

                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wait;
