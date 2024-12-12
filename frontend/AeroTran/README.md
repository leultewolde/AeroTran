# AeroTran Flight Booking System

## Description
AeroTran is a Flight Booking System designed to simplify the flight reservation process. It enables users to efficiently book flights, manage their bookings, and conveniently access e-tickets.

## Getting Started

### Prerequisites
- Node.js (version 12 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/AeroTran.git
   ```
2. Navigate to the project directory:
   ```
   cd AeroTran
   ```
3. Install the dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application
To start the development server, run:
```
npm run dev
```
or
```
yarn dev
```
The application will be available at `http://localhost:3000`.

### Building for Production
To build the application for production, run:
```
npm run build
```
or
```
yarn build
```

### Running in Docker
To build and run the application in a Docker container, use the following commands:
1. Build the Docker image:
   ```
   docker build -t aerotran .
   ```
2. Run the Docker container:
   ```
   docker run -p 3000:3000 aerotran
   ```

## Scripts
- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `type-check`: Runs TypeScript type checking.
- `lint`: Lints the codebase using ESLint.
- `format`: Formats the codebase using Prettier.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.