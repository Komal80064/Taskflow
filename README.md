# TaskFlow — Full-Stack Task Management App

TaskFlow is a full-stack task management application built to help users organize tasks, manage projects, track progress, and stay productive.

The project combines a responsive React frontend with a Node.js and Express backend, MongoDB database integration, authentication, real-time communication, and browser push notifications.

## 🚀 Live Demo

**[View TaskFlow](https://taskflow-three-ashen-23.vercel.app/)**

## 📌 About the Project

TaskFlow was built as a real-world full-stack project to practice and demonstrate modern frontend and backend development.

The application focuses on providing a clean and responsive interface while implementing practical backend functionality such as authentication, task and project APIs, database operations, real-time communication, and push notifications.

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Secure password hashing with bcryptjs
* JWT-based authentication
* HTTP-only session cookies
* Protected API routes
* Persistent authenticated sessions

### 📋 Task Management

* Create tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Track task status
* Set task priority
* Add due dates
* Assign tasks to projects
* View task details
* Track completed and pending tasks

### 📁 Project Management

* Create projects
* Edit projects
* Delete projects
* View project-specific tasks
* Track project completion
* Calculate project progress

### 📊 Dashboard

The dashboard provides an overview of task activity, including:

* Total tasks
* Completed tasks
* Pending tasks
* In-progress tasks
* Overdue tasks
* Overall task progress
* Recent tasks
* Project information

### 📅 Today

A dedicated Today section helps users focus on tasks that are due today.

It provides:

* Today's tasks
* Completed tasks
* Remaining tasks
* Today's progress

### 🔔 Push Notifications

TaskFlow supports browser push notifications for task reminders.

* Browser notification permission
* Push subscription handling
* Task due notifications
* Upcoming task reminders
* Web Push integration
* VAPID configuration

### ⚡ Real-Time Communication

TaskFlow uses Socket.IO for real-time communication between the client and server.

### 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The layout adapts to smaller screens with responsive navigation, task cards, project cards, and dashboard components.

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* HTML5
* CSS3
* Vite
* Lucide React

### Backend

* Node.js
* Express.js
* JWT
* bcryptjs
* Socket.IO
* Web Push

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* npm

## 🏗️ Architecture

TaskFlow follows a client-server architecture.

```text
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │                      │
                    │  Dashboard           │
                    │  Tasks               │
                    │  Projects            │
                    │  Today               │
                    │  Authentication      │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               │
                    ┌──────────▼───────────┐
                    │    Express Backend   │
                    │                      │
                    │  Auth APIs           │
                    │  Task APIs           │
                    │  Project APIs        │
                    │  User APIs           │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               │
                    ┌──────────▼───────────┐
                    │       MongoDB        │
                    │                      │
                    │  Users               │
                    │  Tasks               │
                    │  Projects            │
                    └──────────────────────┘

              Socket.IO → Real-time communication
              Web Push  → Browser notifications
```

## 🔐 Authentication Flow

TaskFlow uses JWT-based authentication with HTTP-only cookies.

```text
User
 │
 ├── Signup
 │
 ▼
Backend validates user data
 │
 ▼
Password hashed with bcryptjs
 │
 ▼
User stored in MongoDB
 │
 ▼
JWT/session created
 │
 ▼
HTTP-only cookie
 │
 ▼
Protected API requests
 │
 ▼
Authenticated TaskFlow session
```

This approach keeps authentication-related session information in an HTTP-only cookie rather than relying on storing the authentication token directly in browser-accessible JavaScript storage.

## 📋 Task Management Flow

```text
Create Task
     │
     ▼
React Form
     │
     ▼
Task API
     │
     ▼
Express Controller
     │
     ▼
MongoDB
     │
     ▼
Task Returned to Frontend
     │
     ▼
Dashboard / Tasks / Today
```

## 🔔 Push Notification Flow

TaskFlow uses browser Web Push notifications to notify users about task deadlines and reminders.

```text
User enables notifications
          │
          ▼
Browser creates push subscription
          │
          ▼
Subscription sent to backend
          │
          ▼
Subscription stored
          │
          ▼
Backend checks task deadlines
          │
          ▼
Web Push sends notification
          │
          ▼
User receives browser notification
```

## 📂 Project Structure

The project is separated into frontend and backend applications.

```text
taskflow/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB
* Git

### 1. Clone the repository

```bash
git clone YOUR_TASKFLOW_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd taskflow
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm run dev
```

The backend will normally run on:

```text
http://localhost:5000
```

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

VAPID_SUBJECT=your_vapid_subject
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
```

Do not commit your `.env` file to GitHub.

Never expose:

* MongoDB credentials
* JWT secrets
* VAPID private keys
* Other private credentials

## 🏭 Production Build

For the frontend:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🧠 Key Learning Outcomes

Through TaskFlow, I practiced and implemented:

* React component development
* Responsive UI development
* CSS-based responsive layouts
* REST API integration
* User authentication
* JWT authentication
* HTTP-only cookies
* Password hashing
* Express middleware
* Protected API routes
* MongoDB database operations
* Mongoose models
* Task and project CRUD operations
* Real-time communication with Socket.IO
* Browser push notifications
* Web Push API
* VAPID configuration
* Frontend-backend integration
* Error handling
* Production deployment


## 🔮 Future Improvements

Possible future improvements include:

* Advanced task filtering
* Drag-and-drop task management
* Recurring tasks
* Team collaboration
* Role-based permissions
* Advanced analytics
* Calendar integration
* Email notifications
* Custom notification preferences

## 👨‍💻 Author

### Komal Panwar

BTech IT Student | Frontend Developer

**GitHub:**
https://github.com/Komal80064

**LinkedIn:**
https://www.linkedin.com/in/komal-panwar800

**Email:**
[panwarkomal2003@gmail.com](mailto:panwarkomal2003@gmail.com)

## 📄 License

This project is available for learning and personal use.

---

⭐ If you found TaskFlow interesting, feel free to explore the repository and connect with me.
