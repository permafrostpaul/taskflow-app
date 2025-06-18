# TaskFlow - A React To-Do List & Calendar App

TaskFlow is a modern, single-page application designed to help users manage their daily productivity. It features a clean, intuitive interface for creating, tracking, and filtering tasks, along with an integrated calendar view to visualize deadlines. This project was built to demonstrate a strong command of modern frontend technologies, state management, and component-based architecture in React.

## 🚀 Live Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_BADGE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)

This project is deployed and live on Netlify. You can try it out here:

**[https://YOUR_NETLIFY_SITE_NAME.netlify.app/](https://YOUR_NETLIFY_SITE_NAME.netlify.app/)**

---

![TaskFlow Screenshot](https://placehold.co/800x400/0f172a/ffffff?text=TaskFlow+App+Screenshot)

## ✨ Features

- **Full CRUD Functionality:** Create, Read, Update, and Delete tasks through a user-friendly modal.
- **Advanced Filtering:** Filter tasks by status (All, Active, Completed, Overdue) and by priority (High, Medium, Low).
- **Interactive Calendar:** A full-page calendar that displays tasks on their due dates, providing a clear visual overview of your schedule.
- **Responsive Design:** A mobile-first design that ensures a seamless experience on all devices, from phones to desktops.
- **Persistent State:** Uses the browser's `localStorage` to save your tasks, so your data is still there when you return.
- **Component-Based Architecture:** The application is broken down into logical, reusable components for clean and maintainable code.

## 🚀 Tech Stack

- **Frontend:** [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)
- **Date & Time:** [date-fns](https://date-fns.org/)
- **Modals:** [react-modal](https://github.com/reactjs/react-modal)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Netlify](https://www.netlify.com/)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (which includes npm) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/permafrostpaul/taskflow-app.git](https://github.com/permafrostpaul/taskflow-app.git) 
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd taskflow-app
    ```

3.  **Install dependencies using Yarn:**
    ```sh
    yarn install
    ```

### Running the Development Server

Once the dependencies are installed, you can start the local development server:

```sh
yarn dev
Open http://localhost:5173 (or the address shown in your terminal) to view the project in your browser.
