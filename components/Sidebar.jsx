'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DroneList from './DroneList';

const Sidebar = () => {
  //   Retrieve the current pathname
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    {
      img: '/icon/dashboard-svgrepo-com-2.svg',
      name: 'Dashboard',
      link: '/',
    },
    {
      img: '/icon/location-svgrepo-com-2.svg',
      name: 'MAP',
      link: '/map',
    },
  ];

  const [showDroneList, setShowDroneList] = useState(true);

  const handleNav = (item) => {
    if (item.name === 'MAP' && pathname === '/map') {
      // Toggle the DroneList visibility
      setShowDroneList(!showDroneList);
    } else {
      router.push(item.link);
    }
  };

  // Function to close the DroneList
  const closeDroneList = () => {
    setShowDroneList(false);
  };

  return (
    <div className='flex'>
      <div className='w-24 h-[91.3vh] bg-[#111]'>
        <div className='py-4'>
          {/* Dashboard Items */}
          <nav className='flex flex-col items-center justify-center  w-full'>
            {navItems.map((item, index) => (
              <div
                onClick={() => {
                  handleNav(item);
                }}
                key={index}
                className={`flex flex-col cursor-pointer items-center justify-center gap-2 py-5 hover:bg-[#272727] p-4 w-full   duration-300 ease-in-out ${
                  pathname === item.link
                    ? 'bg-[#272727] border-l-4 border-red-600'
                    : ''
                }`}
              >
                <Image src={item.img} alt={item.name} width={30} height={24} />
                <span className='text-sm font-light text-[#ccc] uppercase'>
                  {item.name}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Include DroneList if on the MAP page and it should be visible */}
      </div>
      <div
        className='
        w-full
       
        transition-all
        duration-300
        ease-in-out
        relative
      '
      >
        <div
          className={`absolute z-50 inset-y-0 left-2 transform bg-[#111] mt-2
                    transition-transform duration-300 ease-in-out
                    ${showDroneList ? 'translate-x-0' : '-translate-x-[300%]'}`}
        >
          {pathname === '/map' && <DroneList closeDroneList={closeDroneList} />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
