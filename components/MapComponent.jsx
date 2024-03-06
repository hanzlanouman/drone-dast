import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useDroneStore from '@/app/store';
import Image from 'next/image';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 31.83131881204147,
    longitude: 37.94878648036645,
    zoom: 7,
  });

  const drones = useDroneStore((state) => state.drones);
  // Counter component for the number of red drones
  const setSelectedDrone = useDroneStore((state) => state.setSelectedDrone);
  const RedDronesCounter = () => {
    const drones = useDroneStore((state) => state.drones);
    const redDronesCount = drones.filter(
      (drone) => !drone.properties.registration.split('-')[1].startsWith('B')
    ).length;

    // Effect to update viewport when a drone is selected from the list
    const selectedDroneSerial = useDroneStore(
      (state) => state.selectedDroneSerial
    );

    useEffect(() => {
      if (selectedDroneSerial) {
        const selectedDrone = drones.find(
          (drone) => drone.properties.serial === selectedDroneSerial
        );
        if (
          selectedDrone &&
          (selectedDrone.geometry.coordinates[1] !== viewport.latitude ||
            selectedDrone.geometry.coordinates[0] !== viewport.longitude)
        ) {
          setViewport({
            ...viewport,
            latitude: selectedDrone.geometry.coordinates[1],
            longitude: selectedDrone.geometry.coordinates[0],
            zoom: 9, // Adjust zoom level as needed
            transitionDuration: 500, // Smooth transition to the selected drone
          });
        }
      }
      // Only run this effect if `selectedDroneSerial` changes. The effect won't run just because `viewport` changes.
    }, [selectedDroneSerial, drones]);

    return (
      <div className='absolute bottom-5 right-5 bg-white items-center justify-center text-black py-2 px-4 rounded-full shadow-md flex gap-x-2'>
        <div className='font-bold h-6 w-6 flex  items-center justify-center rounded-full bg-black text-white'>
          <h2 className='text-base'>{redDronesCount}</h2>
        </div>{' '}
        Drone
        {redDronesCount !== 1 ? 's' : ''} Flying
      </div>
    );
  };

  return (
    <div className='h-full w-full relative'>
      <Map
        {...viewport}
        width='100%'
        height='100vh'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle='mapbox://styles/hanzlanouman/cltety5yr006c01nrf6d558dp'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        dragPan={true}
      >
        {drones.map((drone, index) => (
          <React.Fragment key={index}>
            <Marker
              latitude={drone.geometry.coordinates[1]}
              longitude={drone.geometry.coordinates[0]}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`
            w-9 h-9 rounded-full flex items-center justify-center shadow-2xl relative cursor-pointer
            ${
              drone.properties.registration.split('-')[1].startsWith('B')
                ? 'bg-[#0f0]'
                : 'bg-[#f00]'
            }
          `}
                    >
                      <div
                        onClick={() => {
                          setSelectedDrone(drone.properties.serial);
                        }}
                        style={{
                          transform: `rotate(${drone.properties.yaw}deg)`,
                          transformOrigin: 'center',
                        }}
                      >
                        <Image
                          src='/Icon/drone.svg'
                          alt='drone'
                          width={20}
                          height={30}
                        />
                      </div>
                      <div
                        className='absolute bottom-[-6px] left-1/2 transform -translate-x-1/2'
                        style={{
                          width: '0',
                          height: '0',
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderTop: '5px solid white',
                        }}
                      ></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className='bg-[#111] border-none p-3 px-6'>
                    <div className='flex flex-col gap-2'>
                      {/* Name */}
                      <div>
                        <h2 className='text-lg text-white font-semibold'>
                          {drone.properties.Name}
                        </h2>
                      </div>
                      {/* Properties */}
                      <div className='flex gap-x-6'>
                        <div className='flex flex-col items-center'>
                          <h3 className='text-sm font-light text-gray-400'>
                            Altitude
                          </h3>
                          <h3 className='text-sm font-bold text-white'>
                            {drone.properties.altitude}
                          </h3>
                        </div>
                        <div className='flex flex-col items-center'>
                          <h3 className='text-sm font-light text-gray-400'>
                            Flight Time
                          </h3>
                          <h3 className='text-sm font-bold text-white'>
                            {/* Start counting from the page load, its arbitrart */}
                            {Math.floor(Math.random() * 60)} min
                          </h3>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Marker>
            {drone.path && drone.path.length > 1 && (
              <Source
                id={`path-${index}`}
                type='geojson'
                data={{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: drone.path,
                  },
                }}
              >
                <Layer
                  id={`layer-path-${index}`}
                  type='line'
                  source={`path-${index}`}
                  layout={{
                    'line-join': 'round',
                    'line-cap': 'round',
                  }}
                  paint={{
                    'line-color': drone.properties.registration
                      .split('-')[1]
                      .startsWith('B')
                      ? '#0f0'
                      : '#f00',
                    'line-width': 3,
                  }}
                />
              </Source>
            )}
          </React.Fragment>
        ))}
        <RedDronesCounter />
      </Map>
    </div>
  );
};

export default MapComponent;
