# 🔗 URL Shortener – Full Stack Project

A production-ready **URL Shortener SaaS-style application** built with a modern full‑stack architecture. It supports authentication, custom aliases, expiry, analytics, rate‑limiting, and a polished UI.

---

## 🚀 Features

### Core Features

* Shorten long URLs
* Custom alias support
* Expiry (default 30 days)
* Redirect tracking (click count)
* Validation (syntax, blacklist, reachability)

### Authentication

* Register & Login (JWT based)
* Protected routes (Dashboard)
* Auth-aware navbar

### Dashboard

* View all URLs created by user
* Copy short URL
* Delete URL
* Expiry visibility

### Security & Performance

* Rate limiting via **Arcjet**
* Input validation with `validator`
* MongoDB Atlas for persistence
* CORS protected backend

### UI / UX

* Vite + React frontend
* Glassmorphism + 3D tilt Login/Register
* Responsive layout
* Premium gradient UI
* Navbar with auth-awareness

---

## 🧱 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Arcjet (Rate limiting & bot protection)

### Frontend

* React (Vite)
* React Router
* Axios
* Custom CSS (glassmorphism + 3D effects)

---

## 📂 Project Structure

```
url_shortner/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
└── url-shortener-frontend/
    └── src/
        ├── api/
        ├── components/
        ├── pages/
        ├── utils/
        └── App.jsx
```

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```
PORT=3000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```
git clone <your-repo-url>
cd url_shortner
```

### 2. Backend Setup

```
cd backend
npm install
node server.js
```

Server runs at: `http://localhost:3000`

### 3. Frontend Setup

```
cd url-shortener-frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔐 API Endpoints

### Auth

| Method | Route          | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user    |

### URLs

| Method | Route       | Description      |
| ------ | ----------- | ---------------- |
| POST   | /shorten    | Create short URL |
| GET    | /:shortCode | Redirect         |
| GET    | /me/urls    | Get user URLs    |
| DELETE | /urls/:id   | Delete URL       |

---

## 📸 Screens

* Premium landing page
* 3D Login / Register UI
* Auth-aware navbar
* User dashboard

---

## 🧠 Learning Outcomes

This project demonstrates:

* Full-stack architecture
* REST API design
* JWT authentication
* Middleware usage
* Database modeling (MongoDB)
* Secure validation & rate limiting
* Frontend routing and protected pages
* UI/UX engineering

---

## 📌 Future Enhancements

* 📈 Analytics charts
* 🔍 Search & filter URLs
* 🕒 Edit expiry from UI
* 📱 Mobile-first responsiveness
* ☁️ Deployment (Vercel + Render)
* 🐳 Docker support

---

## 👨‍💻 Author

**Nitesh Kumar Jha**
4th Year IT Student, DTU
Full Stack Developer

---

## ⭐ If you like this project

Give it a star and feel free to fork and improve!
