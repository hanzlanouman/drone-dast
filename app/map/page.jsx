'use client';
import MapComponent from '@/components/MapComponent';
import React from 'react';
import { useEffect } from 'react';
import socket from '../socket';
import useDroneStore from '../store';
const Page = () => {
  useEffect(() => {
    socket.on('message', (data) => {
      // Update the Zustand store with the received drone data
      useDroneStore.getState().setDrones(data.features);
    });

    return () => {
      socket.off('message');
    };
  }, []);
  return (
    <div className='w-full relative '>
      <MapComponent />
    </div>
  );
};

export default Page;
