# ⚙️ Student Dashboard - Backend API

Welcome to the engine room! 🚂 

This is the secure REST API that powers our **Student Dashboard**. It handles all the heavy lifting: saving data to MongoDB, authenticating users securely, and sending emails.

## 🌟 What Does It Do?

*   **🔒 Secure Authentication**: Uses JWT (JSON Web Tokens) to keep user sessions safe. We check tokens in both cookies and headers for maximum compatibility.
*   **👥 User Management**: Handles logic for Creating, Reading, Updating, and Deleting (CRUD) students.
*   **📧 Email System**: Integrated with **Nodemailer** to send real password reset emails.
*   **🛡️ Security**: Passwords are hashed with `bcrypt` (never stored in plain text!).

---

## 🚀 Setting Up

Follow these steps to get the server running locally:

### 1️⃣ Install Dependencies
Navigate to this folder and run:
```bash
npm install
```

### 2️⃣ The Magic Key (.env) 🔑
Create a file named `.env` in this folder. This is where your secrets live. 
**Do NOT verify this file into GitHub!**

Add these lines to it:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=some_super_secret_random_string
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```
*(Make sure `EMAIL_PASS` is a generated App Password, not your regular Gmail password)*

### 3️⃣ Run the Server
Start the backend with:
```bash
npm start
```
You should see: `Server Start SuccessFully` and `Database Connected`.

---

## 🔌 API Endpoints Cheat Sheet

Here is how to talk to the API:

### 👤 Authentication
*   `POST /api/user/signup` - Register a new user
*   `POST /api/user/login` - Login to account
*   `POST /api/user/forgot-password` - Request password reset email
*   `PUT /api/user/reset-password/:token` - Set new password
*   `PUT /api/user/change-password` - Change password (Logged in only)

### 🎓 Student Operations
*   `GET /api/students` - Get all students (Admin only)
*   `POST /api/students` - Create a student (Admin only)
*   `PUT /api/students/:id` - Update student details (Admin only)
*   `DELETE /api/students/:id` - Remove a student (Admin only)
*   `GET /api/students/profile` - Get your own profile (Student)
*   `PUT /api/students/profile` - Update your own profile (Student)

---

## 📂 Project Structure

*   **config/** - Database connection setup
*   **controller/** - The logic for each route (brain of the operation)
*   **model/** - Blueprint for how data looks in MongoDB
*   **routes/** - Map URLs to controllers
*   **middleware/** - Security checks (isAuth, isAdmin)
*   **utils/** - Helper tools (Email sender)

---

## 🤝 Need Help?
If you see a `401 Unauthorized` error, check if your token is valid or expired. If you see CORS errors, make sure the frontend URL in `index.js` matches where your app is running.

Happy Coding! 💻
