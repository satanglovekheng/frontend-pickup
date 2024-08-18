// pages/index.tsx
"use client";
import React, { useState } from "react";
import { useSession } from 'next-auth/react';
import Mainuser from "./mainuser/page";
import Mainpickup from "./mainpickup/page";
import Mainemployee from "./mainemployee/page";
import Login from "./login/page";

export default function Page() {
  const { data: session } = useSession();
  const [selectedPage, setSelectedPage] = useState(1);
  const [statusShow, setStatusShow] = useState(0);

  const user = session?.user as { email?: string };

  if (session) {
    console.log("session", session);

    // Determine which component to render based on user.email
    let mainComponent;
    switch (user.email) {
      case '1':
        mainComponent = <Mainuser />;
        break;
      case '2':
        mainComponent = <Mainemployee />;
        break;
      case '3':
        mainComponent = <Mainpickup />;
        break;
      default:
        mainComponent = null; // Handle cases where email doesn't match any condition
        break;
    }

    return (
      <div className="font-custom">
        {mainComponent}
      </div>
    );
  }

  return (
    <>
      <Login />
    </>
  );
}
