// middleware/role.js
const roleCheck = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Case-insensitive and trim spaces
        const userRole = req.user.role ? req.user.role.toLowerCase().trim() : "";
        const required = requiredRole.toLowerCase().trim();

        if (userRole !== required) {
            return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }

        next();
    };
};

module.exports = roleCheck;