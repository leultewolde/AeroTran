# AeroTran

The Flight Booking System aims to simplify the flight reservation process, enabling users to book flights efficiently, manage their bookings, and access e-tickets conveniently.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Building the Docker Image](#building-the-docker-image)
- [Contributing](#contributing)
- [License](#license)

## Features

- **TypeScript**: Type-safe development with TypeScript.
- **Next.js**: The React framework for production.
- **ESLint**: Linting with ESLint.
- **Prettier**: Code formatting with Prettier.
- **Jest**: Testing with Jest.
- **Husky**: Git hooks with Husky.
- **Lint-Staged**: Run linters on git staged files.
- **Axios**: Promise based HTTP client for the browser and node.js.
- **Tailwind CSS**: Utility-first CSS framework.

## Getting Started

### Prerequisites

- Node.js (>= 12.0.0)
- npm or yarn
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)


## Scripts

1. Clone the repository:


   ``` bash
   cd frontend
  ```

2. Install dependencies:

  ```
  npm install
  # or
  yarn install
  ```

3. Run the development server:

  ```
  npm run dev
  # or
  yarn dev
  ```

  Open http://localhost:3000 with your browser to see the result.

  Scripts
  dev: Runs the development server.
  build: Builds the application for production.
  start: Starts the production server.
  type-check: Runs TypeScript type checks.
  lint: Runs ESLint.
  format: Formats code with Prettier.
  test: Runs tests with Jest.
  commit: Runs commitizen for conventional commits.

## Project Structure
```aiignore


aerotran/
├── components/         # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   │   ├── users.ts
│   │   └── ...
│   ├── index.tsx
│   └── ...
├── services/           # Service layer for API calls
│   ├── apiClient.ts    # Axios or Fetch client setup
│   ├── userService.ts  # User-related API calls
│   └── ...
├── styles/             # Global and component-specific styles
│   ├── globals.css
│   └── ...
├── types/              # Universal types
│   ├── user.ts         # User-related types
│   └── ...
├── utils/              # Utility functions
│   ├── helpers.ts
│   └── ...
├── public/             # Static files
│   ├── images/
│   └── ...
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── jest.config.js      # Jest configuration
├── tsconfig.json       # TypeScript configuration
├── next.config.js      # Next.js configuration
├── .gitignore          # Git ignore file
└── package.json        # Project dependencies and scripts
```

## Building the Docker Image

Navigate to the project directory and run:

```bash
docker-compose build
```

### Running the Application
Start the application in development mode with live reload:

```bash
docker-compose up
```

The application will be available at http://localhost:3000.

### Stopping the Application
To stop the application, press Ctrl+C in the terminal and run:

```bash
docker-compose down
```


## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs, improvements, or features.

## License
This project is licensed under the MIT License. See the LICENSE file for details.