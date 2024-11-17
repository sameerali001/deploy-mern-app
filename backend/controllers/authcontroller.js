const UserModel = require("../models/user");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: "Signup successful", success: true });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in the environment variables");
            return res.status(500).json({ message: "Configuration error", success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            name: user.name
        });
        
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login
};
