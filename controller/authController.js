
import jwt from "jsonwebtoken"                 // 1)    Check the user exists
import bcrypt from "bcryptjs"                  // 2)    Hash password         
import user from "../model/user.js";            // 3)    create a user                                  

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body)

        const isUserExist = await user.findOne({ email })
        if (isUserExist) {
            res.status(401).json({ message: "User already existed" })
        }
        // HashPassword
        const hashPassword = await bcrypt.hash(password, 10)

        // Create a user
        const newUser = await user.create({
            name,
            email,
            password: hashPassword
        })
        res.status(201).json({ message: "User created successfully",user:newUser})


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
};

// 1) check email exists
// 2) compare password
// 3) create JWT token

export const login = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        const isemailExist = await user.findOne({ email })

        // check email exists
        const user = await user.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        //  create JWT token 
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({
            message: "Login sucessful",
            token,
            userId: user.id,
            email: user.email
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}