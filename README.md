# Task Management - React Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Approach

## Components

There are 2 main components:

### Home.tsx

This component wraps the initial page (`/`). It includes the add button, filters, sorting options, and the task list.

### TaskViewer

This component handles adding new tasks and viewing or updating existing ones.

## Look and feel

For the look and feel, I have chosen Chakra UI, which provides a sleek theme and easy-to-use color mode functionality. For custom styles, I am implementing `css-in-js`, an intuitive approach for React development.

## State management

I am using the `React Context API` for state management. Given the size of this project, it is a suitable approach that scales well.

## Bonus features

- Dark Mode Toggle: A dark mode toggle is implemented, affecting all components used in the application.

- Drag and Drop Functionality: Although drag-and-drop functionalities are often useful, they might conflict with the sorting by created date feature. Therefore, I have opted not to include drag-and-drop to avoid confusion over task ordering.

- Task Navigation: Although it was not a requirement, I have added a task navigation feature to the TaskViewer page. This allows users to easily navigate to the next or previous task in the queue.


