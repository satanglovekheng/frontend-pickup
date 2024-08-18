"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function Sidebar({
  onIconClick,
}: {
  onIconClick: (value: number) => void;
}) {
  const [homeIcon, setHomeIcon] = useState("/iconwork/home.png");
  const [searchIcon, setSearchIcon] = useState("/iconwork/BoxW.png");
  const [notiIcon, setNotiIcon] = useState("/iconwork/noti.png");
  const [dashboardIcon, setDashboardIcon] = useState("/iconwork/checklistW.png");
  const [settingsIcon, setSettingsIcon] = useState("/iconwork/userW.png");
  const [carIcon, setCarIcon] = useState("/iconwork/carW (1).png");
  const [bottomIcon, setBottomIcon] = useState("/iconwork/logout.png");

  const handleHover =
    (setIcon: (path: string) => void, hoverPath: string, defaultPath: string) =>
    () =>
      setIcon(hoverPath);
  const handleLeave =
    (setIcon: (path: string) => void, defaultPath: string) => () =>
      setIcon(defaultPath);
  const handleClick =
    (setIcon: (path: string) => void, clickPath: string, value: number) =>
    () => {
      console.log(`Clicked! Changing icon to ${clickPath}`);
      setIcon(clickPath);
      onIconClick(value);
    };

  const handleBottomIconClick = () => {
    console.log("Clicked bottom icon! Remove it from system.");
    // ทำการปรับปรุง state หรือตัวแปรใดๆ ตามที่คุณใช้สำหรับการควบคุมการแสดงผลของไอคอนด้านล่างสุด
    setBottomIcon(""); // เช่น setBottomIcon(null), setBottomIcon(undefined), เป็นต้น
    // อาจต้องทำการลบ state หรือตัวแปรนี้ออกจากที่เก็บข้อมูลได้
  };
  return (
    <div className="left-0  ">
      <aside
         className="flex flex-col items-center w-20 h-full overflow-hidden text-gray-400"
        style={{ backgroundColor: "#F93A1D" }}
        aria-label="Sidebar"
      >
        <div className="flex flex-col pt-6 ">
          <a className="flex items-center justify-center w-12 h-12 mt-2 rounded ">
            <div className="flex items-center flex-col">
              <Image
                src="/iconwork/iconmain.png"
                alt="Home Icon"
                width={50}
                height={24}
              />
              <p className="text-white text-xs mt-1">Pickup Service</p>
            </div>
          </a>
        </div>

        <div className="flex flex-col items-center mt-3 border-t border-gray-700">
          <a
            className={`flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-white hover:text-gray-300 ${
              homeIcon === "/iconwork/homered.png" ? "bg-white" : ""
            }`}
            href="#"
            aria-label="Home"
            onMouseEnter={handleHover(
              setHomeIcon,
              "/iconwork/homered.png",
              "/iconwork/home.png"
            )}
            onMouseLeave={handleLeave(setHomeIcon, "/iconwork/home.png")}
            onClick={handleClick(setHomeIcon, "/iconwork/homered.png", 1)}
          >
            <Image src={homeIcon} alt="Home Icon" width={24} height={24} />
          </a>

          <a
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-white hover:text-gray-300"
            href="#"
            aria-label="Search"
            onMouseEnter={handleHover(
              setSearchIcon,
              "/iconwork/Boxred.png",
              "/iconwork/BoxW.png"
            )}
            onMouseLeave={handleLeave(setSearchIcon, "/iconwork/BoxW.png")}
            onClick={handleClick(setSearchIcon, "/iconwork/Boxred.png", 2)}
          >
            <Image src={searchIcon} alt="Search Icon" width={24} height={24} />
          </a>
          <a
            className="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 hover:bg-white rounded"
            href="#"
            aria-label="Dashboard"
            onMouseEnter={handleHover(
              setNotiIcon,
              "/iconwork/notired.png",
              "/iconwork/noti.png"
            )}
            onMouseLeave={handleLeave(setNotiIcon, "/iconwork/noti.png")}
            onClick={handleClick(setNotiIcon, "/iconwork/notired.png", 3)}
          >
            <Image
              src={notiIcon}
              alt="Dashboard Icon"
              width={24}
              height={24}
            />
          </a>
          <a
            className="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 hover:bg-white rounded"
            href="#"
            aria-label="Dashboard"
            onMouseEnter={handleHover(
              setCarIcon,
              "/iconwork/carR.png",
              "/iconwork/carW (1).png"
            )}
            onMouseLeave={handleLeave(setCarIcon, "/iconwork/carW (1).png")}
            onClick={handleClick(setCarIcon, "/iconwork/carW (1).png", 5)}
          >
            <Image
              src={carIcon}
              alt="Car Icon"
              width={24}
              height={24}
            />
          </a>
          <a
            className="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 hover:bg-white rounded"
            href="#"
            aria-label="Dashboard"
            onMouseEnter={handleHover(
              setDashboardIcon,
              "/iconwork/checklistR.png",
              "/iconwork/checklistW.png"
            )}
            onMouseLeave={handleLeave(setDashboardIcon, "/iconwork/checklistW.png")}
            onClick={handleClick(setDashboardIcon, "/iconwork/checklistW.png", 6)}
          >
            <Image
              src={dashboardIcon}
              alt="Car Icon"
              width={24}
              height={24}
            />
          </a>
          <a
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-white hover:text-gray-300"
            href="#"
            aria-label="Settings"
            onMouseEnter={handleHover(
              setSettingsIcon,
              "/iconwork/userred.png",
              "/iconwork/userW.png"
            )}
            onMouseLeave={handleLeave(setSettingsIcon, "/iconwork/userW.png")}
            onClick={handleClick(setSettingsIcon, "/iconwork/userred.png", 4)}
          >
            <Image
              src={settingsIcon}
              alt="Settings Icon"
              width={24}
              height={24}
            />
          </a>

        </div>
      </aside>
    </div>
  );
}
