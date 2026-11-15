# 💼 Job Application Tracker

A modern, full-stack **MERN** (MongoDB, Express, React, Node.js) application designed to help job seekers organize, monitor, and manage their job hunt efficiently.
Track application statuses, manage interview dates, record resume versions used, and get automated notifications for upcoming interviews.

---

## 🌟 Key Features

### 🔐 Authentication & User Profiles
- **Secure Registration & Login**: User authentication powered by **JWT (JSON Web Tokens)** and **bcrypt** password hashing.
- **Profile Photo Uploads**: Seamless avatar/profile picture uploading managed via **Multer** and served as static media.
- **Profile Management**: Update your personal details (first name, last name, email) and profile picture dynamically.

### 📋 Job Application Management (CRUD)
- **Add Applications**: Log essential details including Company Name, Job Title, Job Type (Full-time, Part-time, Internship, Contract), Status, Application Date, Resume Version Used, and Notes.
- **Status Tracking**: Categorize applications by **Applied / Pending**, **Interview**, or **Rejected** with distinct visual badges.
- **Pagination**: Smooth paginated browsing to keep the workspace clean and performant.
- **Edit & Update**: Quick inline modal to modify status, notes, or interview schedules as your application progresses.
- **Delete Application**: Delete applications with immediate reactive UI updates and feedback toasts.

### 📊 Dashboard & Interview Notifications
- **Metrics Overview**: Instant summary cards displaying total applications, pending applications, scheduled interviews, and rejections.
- **Interview Reminder / Notification System**: Automatically surfaces interviews scheduled for the next day via an interactive notification modal in the navigation bar.
- **Modern UI & UX**: Crafted with **Tailwind CSS**, **Framer Motion** animations, **React Tooltip**, and **React Toastify** for instant alerts.

---

## 🛠️ Tech Stack

### **Frontend (`Client/vite-project`)**
- **Framework:** [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Data Visualization & Notifications:** Chart.js, React Toastify, React Tooltip
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Token Decoding:** `jwt-decode`

### **Backend (`Server`)**
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Framework:** [Express 5](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose 9](https://mongoosejs.com/)
- **Authentication:** `jsonwebtoken` (JWT), `bcrypt`
- **File Uploads:** [Multer](https://github.com/expressjs/multer)
- **CORS & Environment:** `cors`, `dotenv`
- **Dev Tool:** `nodemon`

---

## 📁 Project Structure

```text
JobApplicationTracker/
├── Client/
│   └── vite-project/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── Components/
│       │   │   ├── AddApplication.jsx
│       │   │   ├── ApplicationCard.jsx
│       │   │   ├── DashboardCard.jsx
│       │   │   ├── Navbar.jsx
│       │   │   ├── NotificationModal.jsx
│       │   │   ├── UpdateApplication.jsx
│       │   │   ├── UpdateUser.jsx
│       │   │   └── UserProfile.jsx
│       │   ├── hooks/
│       │   │   └── useGetUser.js
│       │   ├── Views/
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Login.jsx
│       │   │   └── Signup.jsx
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── package.json
│       └── vite.config.js
├── Server/
│   ├── controllers/
│   │   ├── applicationController.js
│   │   └── authController.js
│   ├── database/
│   │   └── db.js
│   ├── middleware/
│   ├── models/
│   │   ├── Application.js
│   │   └── User.js
│   ├── public/
│   │   └── uploads/
│   ├── routes/
│   │   ├── application.js
│   │   └── auth.js
│   ├── app.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/) installed locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) cloud URI

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/JobApplicationTracker.git
cd JobApplicationTracker
```

---

### 2. Configure & Run Backend (`Server`)

1. Open a terminal and navigate to the `Server` directory:
   ```bash
   cd Server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Populate the `.env` file with your credentials:
   ```env
   MONGODB_URI=mongodb://localhost:27017/job_tracker
   JWT_KEY=your_super_secret_jwt_key
   ```

5. Start the backend server (runs on port `5000` with hot-reload via nodemon):
   ```bash
   npm start
   ```

---

### 3. Configure & Run Frontend (`Client/vite-project`)

1. In a separate terminal tab, navigate to the client project:
   ```bash
   cd Client/vite-project
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## 🔌 API Endpoints Reference

### **Authentication (`/auth`)**
| Method | Endpoint | Description | Payload / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user with profile photo | `multipart/form-data` (firstName, lastName, email, password, profilePhoto) |
| `POST` | `/auth/login` | Login user & return JWT token | `JSON` `{ email, password }` |
| `PUT` | `/auth/:id` | Update user profile and/or avatar | `multipart/form-data` (firstName, lastName, email, profilePhoto) |

### **Applications (`/application`)**
| Method | Endpoint | Description | Query / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/application` | Create a new job application | `JSON` application details |
| `GET` | `/application/:userID` | Fetch user applications (paginated) | Query params: `?page=1&limit=6` |
| `PUT` | `/application/:id` | Update an existing job application | Application ID param, update payload |
| `DELETE`| `/application/:id` | Delete a job application | Application ID param |
| `GET` | `/application/count/:userID` | Get total count of user applications | User ID param |
| `GET` | `/application/statuscount/:userID` | Get count breakdown (applied, interview, rejected) | User ID param |
| `GET` | `/application/interviewnotification` | Fetch interviews scheduled for tomorrow | None |

---

## 🔮 Future Enhancements
- [ ] Export application reports to CSV / PDF
- [ ] Email notifications for upcoming interviews
- [ ] Resume file attachments (PDF upload & preview per application)
- [ ] Advanced filter & search bar (by company, date, status, job type)

---

## 📄 License
This project is open source and available under the [ISC License](LICENSE).

