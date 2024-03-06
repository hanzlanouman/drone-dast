'use client';
import React from 'react';
import DroneDetail from './DroneDetail';
import { RiCloseCircleFill } from 'react-icons/ri';
import useDroneStore from '@/app/store';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DroneList = ({ closeDroneList }) => {
  const droneList = useDroneStore((state) => state.drones);
  const droneData = droneList.map((drone) => drone.properties);

  return (
    <div className='flex flex-col border border-black bg-[#111] w-72'>
      <Tabs defaultValue='drone-data'>
        <TabsList className='w-full'>
          <TabsTrigger value='drone-data'>Drones</TabsTrigger>
          <TabsTrigger value='drone-history'>Flights History</TabsTrigger>
        </TabsList>
        <TabsContent value='drone-data'>
          <ScrollArea>
            <div className='flex justify-between items-center p-4'>
              <div className='flex flex-col gap-4'>
                <h1 className='text-xl font-bold text-white uppercase'>
                  Drone Flying
                </h1>
              </div>
              <div>
                <RiCloseCircleFill
                  className='text-[#777] text-2xl cursor-pointer'
                  onClick={closeDroneList}
                />
              </div>
            </div>
            {droneData.map((drone, idx) => {
              return <DroneDetail key={idx} drone={drone} />;
            })}
          </ScrollArea>
        </TabsContent>
        <TabsContent value='drone-history'>
          <h1>Nothing to see here</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DroneList;
