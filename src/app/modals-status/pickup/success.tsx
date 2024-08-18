type SuccessProps = {
  handleToggleModal: (name: string) => void;
};
"use client";
import Image from "next/image";
import react, { useState } from "react";
const Wait: React.FC<SuccessProps> = ({ handleToggleModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto font-custom"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                ใบเสร็จ
              </h3>
              <button
                onClick={() => handleToggleModal("")}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                &times;
              </button>
            </div>

            <div className="relative p-4 w-full max-w-2xl max-h-full flex items-center justify-center border">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                <Image
                  src="/bill.png"
                  alt="Success"
                  width={200}
                  height={200} />
              </div>
            </div>
            <div className="flex justify-end text-gray-400 px-16">
              <a href="/bill.png" download="bill.png" className="flex items-center no-underline text-current">
                <Image
                  src={"/iconwork/dowload.png"}
                  alt="Download"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <p className="hover:text-blue-500">ดาวโหลดรูปภาพ</p>
              </a>
            </div>

            <div className="flex-grow justify-center text-center pt-7 pb-4">
              สอบถามเพิ่มเติม 0123456789
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => handleToggleModal("")}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                onClick={() => handleToggleModal("")}
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
  );
};

export default Wait;