# Vintage Abacus React Demo App

A React application that displays the current world population using an animated vintage abacus interface. The application fetches data from the Worldometer API and provides a toggle to switch between displaying world population and national debt.

## Features

- Vintage-styled abacus visualization of real-time world population data
- Smooth animations using Framer Motion
- Progressive data fetching intervals (starts with frequent updates, gradually decreases)
- Error handling with visual LED indicator
- Toggle between world population and national debt displays
- Responsive design for desktop browsers

## Tech Stack

- React with TypeScript
- Framer Motion for animations
- Tailwind CSS for styling
- Axios for API calls
- Docker for containerized development

## Getting Started

### Prerequisites

- Docker and Docker Desktop
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vintage-abacus-demo.git
   cd vintage-abacus-demo
   ```

2. Start the Docker container:
   ```bash
   docker-compose up
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Development

The application is set up with Docker for a consistent development environment. The Docker container includes:

- Node.js environment
- Hot-reloading for development
- All necessary dependencies

### Project Structure

```
vintage-abacus-demo/
├── src/
│   ├── components/     # UI components (Abacus, StatusLED, DataToggle)
│   ├── services/       # Data fetching and processing
│   ├── context/        # Global state management
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Application entry point
├── public/             # Static assets
├── documentation/      # Project documentation
├── docker-compose.yml  # Docker configuration
└── Dockerfile          # Docker build instructions
```

## Data Fetching Strategy

The application fetches data from the Worldometer API with a progressive schedule:
- Every second initially
- Every 5 seconds for the first 15 seconds
- Once per minute for the first 5 minutes
- Once every 15 minutes for the next hour
- Once every hour thereafter

## License

[MIT License](LICENSE)

## Acknowledgments

- Worldometer for providing the API
- Inspiration from vintage calculating tools 