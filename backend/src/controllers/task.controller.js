import Task from "../models/Task.js"
import mongoose from "mongoose";

export const getAllTasks = async (req, res) => {
    const { filter = "today" } = req.query;
    const userId = req.user?.user_id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user id in token" });
    }

    const now = new Date();
    let startDate;

    switch (filter) {
        case "today": {startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //ex: 2026-04008 00:00
            break;
        }
        case "week": {
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }
        case "month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case "all":
        default: {
            startDate = null;
        }
    };

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const query = startDate
        ? { userId: userObjectId, createdAt: { $gte: startDate } }
        : { userId: userObjectId };
        
    try {
        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }],
                },
            },
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({tasks, activeCount, completeCount});
    } catch (error) {
        console.error("Loi khi goi getAllTasks ", error);
        res.status(500).json({ message: "Loi he thong" });
    }
};

export const createTask = async (req, res) => {
    try {
        const userId = req.user?.user_id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { title } = req.body;
        const task = new Task({ title, userId });
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Loi khi createTask ", error);
        res.status(500).json({ message: "Loi he thong" });
    }
}

export const updateTask = async (req, res) => {
    try {
        const userId = req.user?.user_id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { title, status, completedAt } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId },
            {
                title,
                status,
                completedAt
            },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Loi khi updateTask ", error);
        res.status(500).json({ message: "Loi he thoong" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const userId = req.user?.user_id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId });
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });

        res.status(200).json(deletedTask);
    } catch (error) {
        console.error("Loi khi deleteTask ", error);
        res.status(500).json({ message: "Loi he thong" });
    }
}
