import User from "../model/User.js";

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin resources only."
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Admin check error: ${error.message}`
        });
    }
};

export default isAdmin;
