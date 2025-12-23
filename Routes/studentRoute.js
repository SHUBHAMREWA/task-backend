import express from "express";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
    getAllStudents,
    getStudentProfile,
    createStudent,
    updateStudent,
    deleteStudent,
    updateProfile
} from "../controller/studentController.js";

const studentRoute = express.Router();

// Routes for Students (Self-Service)
studentRoute.get("/profile", isAuth, getStudentProfile);
studentRoute.put("/profile", isAuth, updateProfile);

// Routes for Admins (Management)
studentRoute.get("/", isAuth, isAdmin, getAllStudents);
studentRoute.post("/", isAuth, isAdmin, createStudent);
studentRoute.put("/:id", isAuth, isAdmin, updateStudent);
studentRoute.delete("/:id", isAuth, isAdmin, deleteStudent);

export default studentRoute;
