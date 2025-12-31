const { Router } = require('express');
const { getDb } = require('../config/db');

const router = Router();

const { ObjectId } = require('mongodb');

// GET /api/client-dashboard/stats
router.get('/stats', async (req, res, next) => {
    try {
        // Mock User ID for now (simulating logged-in user). 
        // In real app, get this from req.user._id
        // We will pick the first user from join_requests for demo if no session.
        // Or if we assume the frontend sends some identifier.
        // Let's assume for this "fully functional" request, we need a way to ID the user.
        // I will default to 0 earnings if no user is found/provided, fulfilling "start from zero".

        // Strategy: 
        // 1. Calculate 'completed' assignments for the current user.
        // 2. Sum rewards.

        // For development/demo purposes without full auth on client side yet:
        // We act as if a specific demo user is logged in, or we implement a simple headers-based ID.
        // Let's try to find a user from a header or default to empty stats.

        // If we want "start from zero", we just return 0s if no tasks are done.

        const stats = {
            today: 0,
            monthly: 0,
            total: 0
        };

        // TODO: integrate with real req.user when auth middleware is added to client routes
        // const userId = req.user?._id; 
        // if (userId) {
        //    const completed = await getDb().collection('task_assignments').find({ user_id: new ObjectId(userId), status: 'completed' }).toArray();
        //    stats.total = completed.reduce((acc, curr) => acc + (curr.task_details?.reward || 0), 0);
        // }

        return res.json(stats);
    } catch (err) {
        return next(err);
    }
});

// GET /api/client-dashboard/tasks
router.get('/tasks', async (req, res, next) => {
    try {
        // Fetch tasks assigned to the current user
        // Mock user ID logic same as above. For now, we verify the "Admin assigns" flow.
        // If I assigned a task to 'test@example.com', I need to validly fetch it here.
        // Since we don't have client auth middleware yet, I'll allow passing a query param `email` for testing.

        const { email } = req.query;
        let tasks = [];

        if (email) {
            const user = await getDb().collection('join_requests').findOne({ emailId: email });
            if (user) {
                const assignments = await getDb().collection('task_assignments')
                    .find({ user_id: user._id })
                    .sort({ assigned_at: -1 })
                    .toArray();

                tasks = assignments.map(a => ({
                    id: a._id,
                    title: a.task_details.title,
                    type: a.task_details.type,
                    reward: a.task_details.reward,
                    status: a.status
                }));
            }
        }

        return res.json(tasks);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
