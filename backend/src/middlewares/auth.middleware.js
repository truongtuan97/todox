import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const secret = process.env.APP_SECRET;
    if (!secret) return res.status(500).json({ message: "Missing APP_SECRET in server environment" });

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Loi auth middleware, ", error);
        res.status(401).json({ message: "Invalid token" });
    }
};