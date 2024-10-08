"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Sidebar() {
  const [homeIcon, setHomeIcon] = useState("/iconwork/home.png");
  const [searchIcon, setSearchIcon] = useState("/iconwork/BoxW.png");
  const [notiIcon, setNotiIcon] = useState("/iconwork/noti.png");
  const [dashboardIcon, setDashboardIcon] = useState("/iconwork/checklistW.png");
  const [settingsIcon, setSettingsIcon] = useState("/iconwork/userW.png");
  const [carIcon, setCarIcon] = useState("/iconwork/carW (1).png");
  const [bottomIcon, setBottomIcon] = useState("/iconwork/logout.png");
  const [statusUser, setStatusUser] = useState(0);
  const { data: session } = useSession()
  const handleHover = (setIcon: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): any; }, hoverPath: string, defaultPath: string) => () => setIcon(hoverPath);
  const handleLeave =
    (setIcon: (path: string) => void, defaultPath: string) => () =>
      setIcon(defaultPath);
  const handleBottomIconClick = () => {
    console.log("Clicked bottom icon! Remove it from system.");
    setBottomIcon("");
  };
  const user = session?.user as { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; status?: string | null | undefined; };
  if (session) {
    console.log("session", session);
    const handleIconClick = (value: React.SetStateAction<number>) => {
      setStatusUser(Number(user.email))
    };
  }

  return (
    <div className="left-0">
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
          <Link href={user?.email === '1' ? "/mainuser" : user?.email === '2' ? "/mainemployee": user?.email === '3' ? "/mainemployee" : "/login"}>
            <div
              className={`flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-white hover:text-gray-300 ${homeIcon === "/iconwork/homered.png" ? "bg-white" : ""
                }`}
              aria-label="Home"
              onMouseEnter={handleHover(
                setHomeIcon,
                "/iconwork/homered.png",
                "/iconwork/home.png"
              )}
              onMouseLeave={handleLeave(setHomeIcon, "/iconwork/home.png")}
            >
              <Image src={homeIcon} alt="Home Icon" width={24} height={24} />
            </div>
          </Link>

          {
            user?.email === '1' && (
              <Link href="/pickupuser">
                <div
                  className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-white hover:text-gray-300"
                  aria-label="Search"
                  onMouseEnter={() =>
                    handleHover(
                      setSearchIcon,
                      "/iconwork/Boxred.png",
                      "/iconwork/BoxW.png"
                    )
                  }
                  onMouseLeave={() => handleLeave(setSearchIcon, "/iconwork/BoxW.png")}
                >
                  <Image src={searchIcon} alt="Search Icon" width={24} height={24} />
                </div>
              </Link>
            )
          }

          <Link href="/notiuser">
            <div
              className="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 hover:bg-white rounded"

              aria-label="Dashboard"
              onMouseEnter={handleHover(
                setNotiIcon,
                "/iconwork/notired.png",
                "/iconwork/noti.png"
              )}
              onMouseLeave={handleLeave(setNotiIcon, "/iconwork/noti.png")}
            >
              <Image
                src={notiIcon}
                alt="Dashboard Icon"
                width={24}
                height={24}
              />
            </div>
          </Link>

          <Link href="/map">
            <div
              className="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 hover:bg-white rounded"

              aria-label="Dashboard"
              onMouseEnter={handleHover(
                setCarIcon,
                "/iconwork/carR.png",
                "/iconwork/carW (1).png"
              )}
              onMouseLeave={handleLeave(setCarIcon, "/iconwork/carW (1).png")}
            >
              <Image
                src={carIcon}
                alt="Car Icon"
                width={24}
                height={24}
              />
            </div>
          </Link>

          <Link href="/map">
            <div
              className="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 hover:bg-white rounded"

              aria-label="Dashboard"
              onMouseEnter={handleHover(
                setDashboardIcon,
                "/iconwork/checklistR.png",
                "/iconwork/checklistW.png"
              )}
              onMouseLeave={handleLeave(setDashboardIcon, "/iconwork/checklistW.png")}
            >
              <Image
                src={dashboardIcon}
                alt="Car Icon"
                width={24}
                height={24}
              />
            </div>
          </Link>

          <Link href="/profile">
            <div
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-white hover:text-gray-300"
              aria-label="Settings"
              onMouseEnter={handleHover(
                setSettingsIcon,
                "/iconwork/userred.png",
                "/iconwork/userW.png"
              )}
              onMouseLeave={handleLeave(setSettingsIcon, "/iconwork/userW.png")}
            >
              <Image
                src={settingsIcon}
                alt="Settings Icon"
                width={24}
                height={24}
              />
            </div>
          </Link>


        </div>
      </aside>
    </div>
  );
}
