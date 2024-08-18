"use client";
import React, { useEffect } from 'react';
import { longdo, map, LongdoMap } from '../longdo-map/LongdoMap'; // Corrected import path
import Slidebar from "../components/slidebarLink"; // Corrected import path
import Bottombar from '../components/bottombarLink';
import Login from "../login/page";
import { useSession, signIn, signOut } from 'next-auth/react';

const App = () => {
  const initMap = () => {
    if (map && longdo) {
      map.Layers.setBase(longdo.Layers.GRAY);
    } else {
      console.error('Map or Longdo is not defined');
    }
  }

  useEffect(() => {
    initMap();
  }, []);

  const mapKey = '33f7afb9885e9fbd4cc26b96b75dfed3';
  const { data: session } = useSession();
  const user = session?.user as { email?: string };
  if (session) {
    return (
      <div className="font-custom">
        <div className="flex">
          <div className="hidden md:flex">
            <Slidebar />
          </div>
          <div style={{ flex: 1, height: '100vh' }}>
            <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
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

export default App;
