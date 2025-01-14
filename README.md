# Fitness Tracker App Task For Runverve

![Layout 1](https://github.com/user-attachments/assets/0f4d82c3-bb00-4886-a3a5-fa5ce5542372)

A mobile fitness tracking app built with **React Native** and **Expo**. This app tracks daily steps, calories burned, heart rate, and more. It also provides a dashboard to visualize your fitness data and progress.

**NOTE**: As per the task details, I have only made the frontend part.

## Mobile View Screen Recording - Expo Go App


https://github.com/user-attachments/assets/60dd9f2b-bb37-4aa2-8552-2257b878329a




## Features

- **Dashboard**: Displays today's progress in steps, calories, and heart rate.
- **Weekly Activity**: Shows a chart of your activity data for the week.
- **Navigation**: Navigate between tabs for Dashboard, History, and Profile.

## Dependencies

This project uses the following dependencies:

- `@expo/vector-icons`: For vector icons
- `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`, `@react-navigation/stack`: For navigation
- `axios`: For making API requests
- `react-native-chart-kit`, `recharts`, `victory-native`: For data visualization
- `react-native-svg`, `react-native-vector-icons`: For icons and SVG support
- `expo`: Expo SDK for building the app
- `react`, `react-native`: Core React and React Native packages

## Installation

To set up the project on your local machine, follow these steps:

### Prerequisites

1. **Node.js**: Ensure you have **Node.js** installed. If not, download and install it from [Node.js official website](https://nodejs.org/).

2. **Expo CLI**: Install Expo CLI globally if you don't have it:

   ```bash
   npm install -g expo-cli
   ```

### Steps to Install

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/fitness-tracker.git
   cd fitness-tracker
   ```

2. **Install dependencies**:

   Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

3. **Start the app**:

   You can start the app in different environments using the following commands:

   - **Start the app in development mode** (Expo client):

     ```bash
     npx expo start -c
     ```

   - **Run the app on an Android device**:

     ```bash
     npm run android
     ```

   - **Run the app on an iOS device**:

     ```bash
     npm run ios
     ```

   - **Run the app in the web browser**:

     ```bash
     npm run web
     ```

### Running in Expo Go (for physical devices)

If you prefer running the app on your physical device using **Expo Go**:

1. Install the [Expo Go](https://expo.dev/client) app on your Android/iOS device.
2. Run the project with `npx expo start -c`.
3. Scan the QR code displayed in your terminal or browser to load the app in Expo Go.

## Development

### Common Commands

- **Run the app on Android**:

  ```bash
  npm run android
  ```

- **Run the app on iOS**:

  ```bash
  npm run ios
  ```

- **Start the app on the web**:

  ```bash
  npm run web
  ```

- **Development server (Expo)**:

  ```bash
  npx expo start -c
  ```

### Additional Notes

- The app uses **React Navigation** for navigating between different tabs (Dashboard, History, Profile).
- The fitness data displayed is hardcoded for now, but you can easily replace it with real data by integrating an API like Google Fit or Apple HealthKit.

## License

This project is licensed under the **0BSD License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This app uses the **Lucide React** icons for the UI.
- **Recharts** and **Victory Native** are used to display activity charts.
- **React Native** and **Expo** were used to build this mobile app.

---

If you encounter any issues or have questions, feel free to open an issue or submit a pull request.
```

This README includes detailed installation instructions, a note about the frontend-only implementation, and how to run the app using `npx expo start -c`. Let me know if you need further adjustments!
