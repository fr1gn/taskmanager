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
   
## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
