# Task Manager App with Expo

Welcome to your Task Manager app built using **[Expo](https://expo.dev)**, a React Native framework that simplifies mobile app development. This project was created with **[create-expo-app](https://www.npmjs.com/package/create-expo-app)**.

## Overview

This Task Manager app enables users to add, view, and mark tasks as completed, with support for organizing tasks by category. The app structure uses design patterns to enhance code flexibility, maintainability, and scalability.

## System Architecture

The project follows a modular architecture, breaking functionality down into separate components to enhance readability and reusability. Key architectural features:

- **Components:** Task creation, task listing, task completion, and UI enhancements (e.g., marking tasks as done).
- **Patterns:** Design patterns are used for scalable design and future extensibility.

## Implemented Design Patterns

The project incorporates several design patterns to ensure modularity and provide a solid foundation for future features.

- **Creational Patterns:**
  - **Factory Method:** Creates different types of tasks (e.g., personal, work, project) with consistent handling across task categories.
  - **Singleton:** Ensures only one instance of the global task repository to avoid duplications and manage a centralized task list.

- **Structural Patterns:**
  - **Adapter:** Provides flexibility for potential integration with third-party services like Trello or Asana.
  - **Composite:** Represents tasks hierarchically, allowing tasks to be organized with subtasks as a single entity.

- **Behavioral Patterns:**
  - **Observer:** Allows components to react to changes in task status, helping implement notifications or alerts.
  - **Strategy:** Implements multiple sorting and filtering strategies to organize tasks efficiently.
  - **Command:** Enables undo/redo operations for task actions, improving user experience.

## UML Diagrams

Here are some UML diagrams representing the architecture and the design patterns implemented:

1. **Class Diagram:** Illustrates the relationships between different components (e.g., Task Factory, Task Repository).
2. **Sequence Diagram:** Describes the sequence of operations in task creation, deletion, and completion.

*Note*: Please refer to the docs/uml directory in the repository for detailed UML diagrams.

## Usage Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npx expo start
   ```

3. Run the app on your preferred platform:

   - **[Development build](https://docs.expo.dev/develop/development-builds/introduction/)**;
   - **[Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)**
   - **[iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)**
   - **[Expo Go](https://expo.dev/go)** for a quick preview of the app.

4. Develop: Start making changes by editing files in the app directory. This project uses **[file-based routing](https://docs.expo.dev/router/introduction)**.

5. Reset the project (Optional): To start with a fresh app structure, use:

   ```bash
   npm run reset-project
   ```

## Assumptions and Limitations

- **Assumptions:** This app assumes a local environment for task management without external data persistence.
- **Limitations:** The current implementation does not include a backend API for data storage, so tasks are stored temporarily and do not persist between app sessions.

## Additional Resources

To learn more about developing with Expo:

- **[Expo documentation](https://docs.expo.dev/):** Covers both fundamental and advanced topics, including guides for various features.
- **[Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/):** Step-by-step guide to building an app that works across platforms.

## Join the Expo Community

Connect with developers and the Expo team:

- **[Expo on GitHub](https://github.com/expo/expo):** View and contribute to the open-source project.
- **[Discord community](https://chat.expo.dev):** Chat with other developers, ask questions, and get support.
