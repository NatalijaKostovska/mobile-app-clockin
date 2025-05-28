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


<table>
  <!-- Header Row: User -->
  <tr>
    <td colspan="4" align="left" style="font-weight: bold; font-size: 16px; padding: 10px 0;">👤 User</td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/11543a44-f604-49b7-940b-cf8a402e84a4" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/13f4c547-6933-4a61-abb7-80a86395c8cc" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/c0f4484a-ddfb-4195-b676-9f4ab6e40ee8" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
      <td align="center">
      <img src="https://github.com/user-attachments/assets/bc91c87c-a6df-4d25-ae8f-73f75accfb90" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/6162d142-0256-4e6b-ac9f-8c22facef282" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
   
  </tr>

  <!-- Header Row: Admin -->
  <tr>
    <td colspan="5" align="left" style="font-weight: bold; font-size: 16px; padding: 10px 0;">🛠️ Admin</td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/35011665-125a-4e54-9c54-6427457ab9a6" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/cbfde9e8-d8b9-4a86-a03e-59b83147085b" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/45054374-0932-4f4e-8478-ca013063ba82" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ef10d2f5-10c6-4a5b-a9e6-0bfea084d72a" width="150" style="border-radius: 10px; margin: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    </td>
  </tr>
</table>




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