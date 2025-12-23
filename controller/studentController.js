import User from "../model/User.js";
import bcrypt from "bcryptjs";

// Get all students (Admin only)
export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Requesting User's Profile
export const getStudentProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create Student (Admin)
export const createStudent = async (req, res) => {
    try {
        const { name, email, course } = req.body;
        
        // Default password for students created by admin
        const defaultPassword = "password123"; 
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const student = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "student",
            course: course || "MERN Bootcamp"
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: {
                _id: student._id,
                name: student.name,
                email: student.email,
                role: student.role,
                course: student.course,
                enrollmentDate: student.enrollmentDate
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Student Profile (Self)
export const updateProfile = async (req, res) => {
    try {
        const { name, email, course } = req.body;
        
        // Prevent changing email to an existing one
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== req.userId) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { name, email, course },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Student (Admin)
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, course } = req.body;

        const updatedStudent = await User.findByIdAndUpdate(
            id,
            { name, email, course },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Student (Admin)
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await User.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
