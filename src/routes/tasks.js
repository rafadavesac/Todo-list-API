import {Router} from "express"
import { taskList } from "../utils/constants.js"
/*
GET /tasks → listar todas
GET /tasks/:id → pegar uma
POST /tasks → criar
PUT /tasks/:id → atualizar tudo
DELETE /tasks/:id → deletar
*/
const routes = Router()

routes.get("/api/tasks", (req, res) => {
    res.send(taskList)
})

routes.get("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const task = taskList.find((task) => task.id === id)

    if (!task){
        return res.status(404).send({message:"Task no found"})
    }
    return res.send(task)  
})

routes.post("/api/tasks", (req, res) => {
    const taskSentByUser = req.body.task

    if (!taskSentByUser){
        return res.status(400).send({message:"The task field cannot be empty"})
    }

    let lastId;
    if (taskList.length === 0){
        lastId = 0 // caso a lista esteja vazia
    } else {
        lastId = taskList[taskList.length - 1].id //pega o id do último usuário e soma +1
    }

    const newTask = {
        id: lastId + 1, 
        task: taskSentByUser
    }
    taskList.push(newTask)
    return res.send(taskList)
})

routes.put("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const taskSentByUser = req.body.task

    const taskToUpdate = taskList.find((task) => task.id === id )

    if (!taskToUpdate){
        return res.status(404).send({message:"Task not found"})
    }

    if (!taskSentByUser){
        return res.status(400).send({message:"The task field cannot be empty"})
    }

    taskToUpdate.task = taskSentByUser

    return res.send(taskList)
})

routes.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const taskIndex = taskList.findIndex((task) => task.id === id)

    if (taskIndex === -1){ //findIndex returns -1 in case it doesnt find the index
        return res.status(404).send({message:"Task not found"})
    }

    taskList.splice(taskIndex, 1) //removes 1 element at index taskIndex
    return res.send(taskList)
})

export default routes