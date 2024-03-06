# Drone Tracking Application

# Frontend Interaction for Drone Tracking

## Implemented features and technologies:

    Real-time Communication: Established a WebSocket connection using socket.io-client for real-time updates.
    State Management: Utilized Zustand for simple and efficient state management to track and update drone data.
    Interactive Mapping: Integrated react-map-gl for interactive map visualization, allowing users to view drone locations and paths.
    UI Components:
        Markers and Tooltips: Employed markers to represent drones on the map, with tooltips for additional information.
        Navigation Controls: Included map navigation controls for zooming and panning.
        Tabbed Interface: Implemented a tabbed interface for switching between drone data and flight history.
    Responsive Design: Tailwind CSS facilitated a responsive and modern UI design, enhancing the visual appeal and usability across devices.
    Conditional Rendering: The application highlights selected drones on both the map and list, providing visual cues for user interaction.
    React Functional Components: Used React functional components with hooks (useState, useEffect) for component state and lifecycle management, leveraging the latest features of React (assumed to be Next.js 14 and above).
    Next.js for SSR/SSG: Ensured SEO and performance benefits by leveraging Next.js's capabilities for server-side rendering or static site generation.

Overall, the frontend dynamically displays drone positions and details, allowing users to interact with a live-updating map and detailed list of drones, showcasing each drone's flight path and current status.

## Problem:

The initial implementation of the backend had a significant limitation: it generated and emitted data for only one drone, and each emission contained entirely new drone details, including the serial and registration. This led to two major issues on the frontend:

    Lack of Persistent Identity: Since each update involved changing the serial and registration, we couldn't track the movement or update the state of a specific drone. It was as if a new drone appeared with each update, making continuity impossible.

    No Multiple Drone Support: With only one drone's data being sent, we lacked the ability to show a fleet of drones. Additionally, treating each update as a new drone entry in the frontend resulted in a static list with no actual movement or state updates.

## Solution:

To address these problems, we updated the backend to generate data for multiple drones with constant serial and registration numbers. Each drone's unique identifiers remain unchanged across data emissions, allowing for consistent tracking on the frontend. Their coordinates, altitude, and other changeable details are updated to reflect movement and state changes.
