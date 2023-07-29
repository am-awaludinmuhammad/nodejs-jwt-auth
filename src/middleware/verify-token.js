import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const refreshToken = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    
    let user;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json(err);
        }
        user = decoded;
    });

    if (user) {
        req.user = user;
        next();
    }
}