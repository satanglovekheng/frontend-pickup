"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Bottombar() {
  const [homeIcon, setHomeIcon] = useState("/iconwork/home.png");
  const [searchIcon, setSearchIcon] = useState("/iconwork/BoxW.png");
  const [dashboardIcon, setDashboardIcon] = useState("/iconwork/noti.png");
  const [settingsIcon, setSettingsIcon] = useState("/iconwork/userW.png");
  const [carIcon, setCarIcon] = useState("/iconwork/carW (1).png");

  const handleHover = (setIcon: (path: string) => void, hoverPath: string) => () => setIcon(hoverPath);
  const handleLeave =
    (setIcon: (path: string) => void, defaultPath: string) => () =>
      setIcon(defaultPath);
  return (
    <div className="pd-16">
      <div className="fixed bottom-0 left-0 w-full h-14 mt-16 " style={{ backgroundColor: "#F93A1D" }}>
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">


          <Link href="/map">
            <div
              className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${homeIcon === "/iconwork/homered.png" ? "bg-white" : ""}`}
              onMouseEnter={handleHover(setHomeIcon, "/iconwork/homered.png")}

            >
              <Image src={homeIcon} alt="Home Icon" width={24} height={24} />

            </div>
          </Link>


          <a
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${homeIcon === "/iconwork/homered.png" ? "bg-white" : ""}`}
            onMouseEnter={handleHover(setHomeIcon, "/iconwork/homered.png")}
            onMouseLeave={handleLeave(setHomeIcon, "/iconwork/home.png")}

          >
            <Image src={homeIcon} alt="Home Icon" width={24} height={24} />

          </a>

          <a

            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${searchIcon === "/iconwork/Boxred.png" ? "bg-white" : ""}`}
            onMouseEnter={handleHover(setSearchIcon, "/iconwork/Boxred.png")}
            onMouseLeave={handleLeave(setSearchIcon, "/iconwork/BoxW.png")}

          >
            <Image src={searchIcon} alt="Search Icon" width={24} height={24} />
          </a>

          <a

            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${dashboardIcon === "/iconwork/notired.png" ? "bg-white" : ""}`}
            onMouseEnter={handleHover(setDashboardIcon, "/iconwork/notired.png")}
            onMouseLeave={handleLeave(setDashboardIcon, "/iconwork/noti.png")}

          >
            <Image src={dashboardIcon} alt="Dashboard Icon" width={24} height={24} />
          </a>

          <a

            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${settingsIcon === "/iconwork/userred.png" ? "bg-white" : ""}`}
            onMouseEnter={handleHover(setSettingsIcon, "/iconwork/userred.png")}
            onMouseLeave={handleLeave(setSettingsIcon, "/iconwork/userW.png")}

          >
            <Image src={settingsIcon} alt="Settings Icon" width={24} height={24} />
          </a>



        </div>
      </div>
    </div>
  );
}
