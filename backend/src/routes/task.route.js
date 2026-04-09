import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from './../controllers/task.controller.js';
import {auth} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', auth, getAllTasks);
router.post('/', auth,createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;