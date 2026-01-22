import express from 'express';
import { getTask, createTask, updateTask, taskDelete ,getTasks} from "../controller/taskController.js"
import authMiddleware from '../Middleware/authMiddleware.js';

// create a router using the Router

const routes = express.Router()


// create a task
routes.post("/",authMiddleware, createTask)

// Get task by id
routes.get("/:id",authMiddleware,getTask)

// Get all the tasks
routes.get("/",authMiddleware, getTasks)

// update the task
routes.put("/:id",authMiddleware, updateTask)

// delete the task
routes.delete("/:id",authMiddleware, taskDelete)

export default routes