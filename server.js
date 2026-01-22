//  Main server file
import express from "express"
import Mongoose from 'mongoose'
import Cors from "cors"
import dotenv from "dotenv"
import taskRoute from "./routes/taskRoutes.js"
import authRoutes from "./routes/authRoutes.js"

// dotenv
dotenv.config()
// create the express
const app = express()

// use the Global (middlewares)
app.use(Cors())
app.use(express.json())

// Connect to the MongoDb
Mongoose
    .connect(process.env.MONGOOSE_URI)
    .then(() => console.log("MongoDb connected"))
    .catch((error) => { console.log("MongoDb-error", error) })

// Routes
app.use("/auth",authRoutes)
app.use("/tasks",taskRoute)

// check the app is listening to the port 
app.listen(process.env.PORT, () => {
    console.log(`server running on the port ${process.env.PORT}`)
})

