import express from "express" ; 
import isAuth from "../middleware/isAuth.js";
import { login, signUp, forgotPassword, resetPassword, changePassword } from "../controller/authController.js";


const authRoute = express.Router()// Routes
authRoute.post("/login", login);
authRoute.post("/signup", signUp);
authRoute.post("/forgot-password", forgotPassword);
authRoute.put("/reset-password/:token", resetPassword);
authRoute.put("/change-password", isAuth, changePassword);

export default authRoute;