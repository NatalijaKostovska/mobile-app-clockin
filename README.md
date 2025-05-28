# Employee Time Tracking App

Employee Time Tracking App is a mobile application designed to help employers and employees manage work hours, schedules, and time-off requests.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Employee time tracking: employees can clock in and out, and view their work hours
- Schedule management: employers can create and manage employee schedules
- Time-off requests: employees can request time off, and employers can approve or deny requests
- Dashboard: employers can view employee work hours, schedules, and time-off requests in a single dashboard
- Calendar integration: schedules and time-off requests are integrated with a calendar view

## Tech Stack

- Frontend: React Native, Expo
- Backend: Firebase (Firestore, Authentication)
- Database: Firebase Firestore
- APIs: Firebase APIs

## Getting Started

To get started with the Employee Time Tracking App, follow these steps:

- Clone the repository: `git clone https://github.com/your-username/employee-time-tracking-app.git`
- Install dependencies: `npm install` or `yarn install`
- Set up Firebase: create a new Firebase project and enable Firestore and Authentication
- Configure Firebase: update `firebaseConfig.js` with your Firebase project settings
- Start the app: `npm start` or `yarn start`

## Project Structure

The project is structured as follows:

- `components`: reusable UI components
- `screens`: app screens (e.g. login, dashboard, employee list)
- `firebase`: Firebase configuration and API wrappers
- `hooks`: custom React hooks for managing state and side effects
- `navigation`: app navigation configuration
- `utils`: utility functions for formatting data and handling errors

## Installation

To install the Employee Time Tracking App, follow these steps:

- Clone the repository: `git clone https://github.com/your-username/employee-time-tracking-app.git`

- Ensure you are using Node.js 18 (otherwise install nvm install 18)

- nvm use 18

- Install dependencies: `npm install` or `yarn install`
  Navigate to the project directory:

- Start the app in development mode:

`npx expo start` press `a` for Android press `i` for IOS simulator or scan the code from the console with camera app to open on your mobile phone

## Usage

To use the Employee Time Tracking App, follow these steps:

- Launch the app on your mobile device
- Log in with your employer or employee credentials
- Use the app to clock in and out, view schedules, and request time off

## Contributing

Contributions to the Employee Time Tracking App are welcome. To contribute, follow these steps:

- Fork the repository: `git fork https://github.com/your-username/employee-time-tracking-app.git`
- Make changes to the code
- Submit a pull request

## License

The Employee Time Tracking App is licensed under the MIT License.
