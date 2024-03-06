import React from 'react';
import useDroneStore from '@/app/store';

const DroneDetail = ({ drone }) => {
  const setSelectedDrone = useDroneStore((state) => state.setSelectedDrone);
  const selectedDroneSerial = useDroneStore(
    (state) => state.selectedDroneSerial
  );

  const handleDroneClick = () => {
    // Set selected drone
    setSelectedDrone(drone.serial);
    // You could also include logic to update the map viewport here,
    // or you can handle it within the map coqmponent as the store changes
  };
  return (
    <div
      onClick={handleDroneClick}
      className={`flex gap-x-6 items-center cursor-pointer z-50 hover:bg-[#272727] justify-center bg-[#111111] border border-black p-2 px-4 gap-4  ${
        drone.serial === selectedDroneSerial ? 'bg-[#272727]' : ''
      }`}
    >
      <div className='flex flex-col gap-2'>
        {/* Name */}
        <div>
          <h2 className='text-base font-bold text-white'>{drone.Name}</h2>
        </div>
        {/* Info */}
        <div>
          {/* Info */}
          <div>
            <div className='flex flex-col gap-2  items-stretch'>
              <div className='flex text-xs justify-between gap-x-10'>
                <h3 className=' font-light text-gray-400'>
                  Serial#{' '}
                  <span className='font-medium text-[#ccc] block'>
                    {drone.serial}
                  </span>
                </h3>
                <h3 className=' font-light text-gray-400 '>
                  Registration#{' '}
                  <span className='font-medium text-[#ccc] block'>
                    {drone.registration}
                  </span>
                </h3>
              </div>
              <div className='flex text-xs justify-between gap-x-8'>
                <h3 className=' font-light text-gray-400'>
                  Pilot{' '}
                  <span className='font-medium text-[#cccccc] block'>
                    {drone.pilot}
                  </span>
                </h3>
                <h3 className=' font-light text-gray-400'>
                  Organization{' '}
                  <span className='font-medium text-[#ccc] block'>
                    {drone.organization}
                  </span>
                </h3>
              </div>
            </div>
          </div>
          {/* Status */}
        </div>
      </div>
      <div>
        {' '}
        <div>
          {drone.registration.split('-')[1].startsWith('B') ? (
            <div className='w-5 h-5 bg-green-500 rounded-full border-2'></div>
          ) : (
            <div className='w-5 h-5 bg-red-500 rounded-full border-2'></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DroneDetail;
