import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        let user;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({
                    message: 'Forbidden'
                });
            }
            user = decoded;
        });

        if (user) {
            req.user = user;
            next();
        }
    }
}