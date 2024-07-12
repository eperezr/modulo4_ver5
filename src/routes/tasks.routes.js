import { Router } from "express";
import tasksController from "../controllers/tasks.controller.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.route('/')
.get(authenticateToken, tasksController.getTasks)
.post(authenticateToken, tasksController.createTask);

router
.route('/:id')
.get(authenticateToken, tasksController.getTask)
.get(authenticateToken, tasksController.updateTask)
.get(authenticateToken, tasksController.deleteTask)
.get(authenticateToken, tasksController.taskDone);

export default router;