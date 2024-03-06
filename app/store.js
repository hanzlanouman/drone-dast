import create from 'zustand';

const useDroneStore = create((set) => ({
  drones: [],
  setDrones: (newDrones) =>
    set((state) => {
      const updatedDrones = newDrones.map((newDrone) => {
        const existingDrone = state.drones.find(
          (drone) => drone.properties.serial === newDrone.properties.serial
        );

        if (existingDrone) {
          // Update the existing drone with new properties and updated path
          return {
            ...existingDrone,
            ...newDrone, // Merge new drone properties
            geometry: {
              ...existingDrone.geometry,
              coordinates: newDrone.geometry.coordinates, // Update coordinates
            },
            path: [...existingDrone.path, newDrone.geometry.coordinates], // Maintain path logic
          };
        } else {
          // Add the new drone with its initial path
          return {
            ...newDrone,
            path: [newDrone.geometry.coordinates],
          };
        }
      });

      return { drones: updatedDrones };
    }),
  selectedDroneSerial: null,
  setSelectedDrone: (serial) => set(() => ({ selectedDroneSerial: serial })),
}));

export default useDroneStore;
