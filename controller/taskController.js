import Task from "../model/Task.js"


// Create a Task

export const createTask = async (req, res) => {
    console.log(req.body);
    try {
        const task = await Task.create(req.body)
        res.json(task)
    } catch (error) {
        res.status(400).json(error)
    }
}

//  Get a All Task

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(400).json(error)
    }
}

// Get Task by  Id

export const getTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id)
        res.json(task)
        console.log(`you got the Task ,${task}`);

    } catch (error) {
        res.status(400).json(error)
    }
}

// Update the task

export const updateTask = async (req, res) => {
    const id = req.params.id
    console.log(req.body)
    try {
        const taskUpdates = await Task.findByIdAndUpdate(
            id,
            req.body
        );
        console.log(req.body);
        
        res.json(taskUpdates)
    } catch (error) {
        res.status(500).json(error)
    }
}
// Delete the task

export const taskDelete = async (req, res) => {


    try {
        const id = req.params.id;
      console.log(id);
        const deleteTask = await Task.findByIdAndDelete(id)
        res.json(deleteTask)
        console.log("Task deleted")
    } catch (error) {
        console.log("Error ocurred");
        res.status(500).json(error)
    }
}
