import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            email,
            password: hashed
        });
        res.json(user);    
    } catch (error) {
        console.log("Loi khi tao user, ", error);
        res.status(500).json({message: "Loi he thong"});
    }
};

export const login = async (req, res) => {
    try {
        const secret = process.env.APP_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "Missing APP_SECRET in server environment" });
        }

        const { email, password } = req.body;

        const user = await User.findOne({email});
    
        if (!user) return res.status(400).json({message: "Invalid user or password"});
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid user or password"});
    
        const token = jwt.sign({ user_id: user._id }, secret, { expiresIn: "1d"});
        res.json({token});    
    } catch (error) {
        console.error("Loi khi login ", error);
        res.status(500).json({message: "Loi he thong"});
    }
};