## Project Overview

*   **Type:** cursor_project_rules
*   **Description:** I want to build a React app that shows the current population of the world on an abacus. Data would need to be scraped from the worldometer web site. Abacus should continually update every second. Data should be scraped progressively less as time goes on.
*   **Primary Goal:** Create a demo React application that visually displays the current world population (and toggles to display the national debt) using a vintage abacus interface with smooth, real-time animations, dynamic data fetching intervals, and robust error handling via a virtual LED indicator.

## Project Structure

### Framework-Specific Routing

*   **Directory Rules:**

    *   **React Router 6 (assumed latest):** Use a conventional structure under `src/routes/` with components defined for each major view (e.g., main display, error display pop-up).
    *   Example: `src/routes/Home.jsx` for the main abacus display and toggle functionality.

### Core Directories

*   **Versioned Structure:**

    *   **src/components:** Contains UI components such as the Abacus, LED Indicator, and Toggle Button.
    *   **src/api:** Contains modules for interacting with the Worldometer API (data fetching with dynamic intervals).
    *   **src/state:** Houses global state management files leveraging Zustand or React’s Context API.

### Key Files

*   **Stack-Versioned Patterns:**

    *   **src/App.jsx:** Main application component that sets up routing, global state providers, and overall layout.
    *   **src/index.js:** Entry point to initialize and render the React app.

## Tech Stack Rules

*   **Version Enforcement:**

    *   **react@latest:** Use functional components with hooks and maintain a single-page application architecture.
    *   **framer-motion@latest / react-spring@latest:** Use for smooth and responsive animations; ensure that only one animation library is used per specific animation flow to avoid conflicts.
    *   **zustand@latest:** Leverage for lightweight and intuitive state management of real-time data and error statuses.
    *   **Worldometer API:** Strictly use the official API as documented at [Worldometer API Documentation](https://worldometer.readthedocs.io/en/latest/); adhere to its usage guidelines and rate limits.

## PRD Compliance

*   **Non-Negotiable:**

    *   "This project is a demo React application that visually displays the current world population using an animated abacus. The core idea is to mimic real-time population changes by fetching data from the official Worldometer API at different intervals..." : The app must fetch data every second initially, then adjust to every 5 seconds for the first 15 seconds, once per minute for the first 5 minutes, once every 15 minutes for the next hour, and finally once every hour thereafter. It must also include error handling (LED indicator turning orange or red) and a toggle between world population and national debt.

## App Flow Integration

*   **Stack-Aligned Flow:**

    *   Example: "React App Flow → `src/routes/Home.jsx` displays the abacus with a LED status indicator and a toggle button. The data fetching logic is managed by modules in `src/api` and state updates are coordinated by Zustand/Context API."

## Best Practices

*   **React**

    *   Use functional components and hooks for cleaner and more maintainable code.
    *   Structure components to separate presentation from logic.
    *   Ensure that components are reusable and properly encapsulated with prop validations where necessary.

*   **Framer Motion / React Spring**

    *   Use declarative animation patterns for clear and maintainable animation sequences.
    *   Optimize animations for performance by minimizing unnecessary re-renders.
    *   Apply spring-based animations to simulate smooth and natural abacus bead movements.

*   **Zustand**

    *   Keep state minimal and scoped to where it’s needed.
    *   Use actions to update state in a predictable manner.
    *   Leverage middleware for logging or persistence if required for debugging.

*   **Worldometer API**

    *   Respect API rate limits by strictly adhering to the dynamic fetching intervals.
    *   Implement robust error handling: change LED indicator colors (orange for one failure, red for three consecutive failures) and provide detailed error logs in a pop-up window.
    *   Ensure fallback strategies are in place to maintain smooth abacus animations even if a data fetch fails.

## Rules

*   Derive folder/file patterns **directly** from the techStackDoc versions and maintain consistency across the project.
*   If using a React Router-based structure: ensure the project utilizes the `src/routes/` directory and avoids mixing with other routing patterns.
*   For wrapping animations and state management, keep dependencies such as Framer Motion/React Spring and Zustand separate to prevent version conflicts.
*   Never mix framework-specific patterns (e.g., avoid using Next.js pages in a React Router project).
