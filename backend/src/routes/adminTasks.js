const { Router } = require('express');
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

const router = Router();

// GET /api/admin/tasks - List all tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await getDb().collection('tasks').find({}).sort({ createdAt: -1 }).toArray();
        return res.json(tasks);
    } catch (err) {
        return next(err);
    }
});

// POST /api/admin/tasks - Create a new task
router.post('/', async (req, res, next) => {
    try {
        const { title, description, reward, type, link, action_required } = req.body;

        if (!title || !reward || !type) {
            return res.status(400).json({ error: 'Title, reward, and type are required' });
        }

        const newTask = {
            title,
            description,
            reward: Number(reward),
            type,
            link,
            action_required,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await getDb().collection('tasks').insertOne(newTask);
        return res.json({ ...newTask, _id: result.insertedId });
    } catch (err) {
        return next(err);
    }
});

// POST /api/admin/tasks/assign - Assign task to a user
router.post('/assign', async (req, res, next) => {
    try {
        const { taskId, userIdentifier } = req.body; // userIdentifier can be email or userId

        if (!taskId || !userIdentifier) {
            return res.status(400).json({ error: 'Task ID and User Identifier are required' });
        }

        // Find the task
        const task = await getDb().collection('tasks').findOne({ _id: new ObjectId(taskId) });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Find the user (assuming simplified logic: search 'contacts' or 'join_requests' or a central 'users' collection depending on auth)
        // For now, looking up in 'join_requests' as that seems to be the main "member" table based on previous context.
        // In a real app, this would query the 'users' collection.
        const user = await getDb().collection('join_requests').findOne({
            $or: [
                { emailId: userIdentifier },
                { mobileNumber: userIdentifier }
            ]
        });

        if (!user) {
            // Fallback for demo: if no user found in join_requests, maybe we just store the identifier directly for now 
            // if we are simulating "assign to specific user" without a full auth system.
            // However, the prompt says "to specific users", so strict checking is better.
            // Let's return error for now to be safe.
            return res.status(404).json({ error: 'User not found in Join Requests' });
        }

        const assignment = {
            task_id: new ObjectId(taskId),
            user_id: user._id, // Linking to the join_request ID effectively acting as User ID
            status: 'assigned', // assigned, in_progress, completed, rejected
            assigned_at: new Date(),
            task_details: { // Snapshot of task details
                title: task.title,
                reward: task.reward,
                type: task.type
            }
        };

        await getDb().collection('task_assignments').insertOne(assignment);
        return res.json({ message: 'Task assigned successfully', assignment });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
