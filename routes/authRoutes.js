import express from "express";
import {register,login}  from  "../controller/authController.js";


const routes = express.Router()

routes.post("/register",register)
routes.post("/login",login)

export default routes