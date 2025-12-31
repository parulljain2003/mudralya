import React, { useState, useEffect } from 'react';
import { request } from '../../api/client';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Create Task State
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        reward: '',
        type: 'Daily Task',
        link: '',
        action_required: 'signup'
    });

    // Assign Task State
    const [assignData, setAssignData] = useState({
        taskId: '',
        userIdentifier: ''
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await request('/api/admin/tasks', { includeCredentials: true });
            setTasks(res);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await request('/api/admin/tasks', {
                method: 'POST',
                data: newTask,
                includeCredentials: true
            });
            alert('Task Created Successfully');
            setShowCreateForm(false);
            setNewTask({ title: '', description: '', reward: '', type: 'Daily Task', link: '', action_required: 'signup' });
            fetchTasks();
        } catch (err) {
            alert('Failed to create task');
        }
    };

    const handleAssignTask = async (e) => {
        e.preventDefault();
        try {
            await request('/api/admin/tasks/assign', {
                method: 'POST',
                data: assignData,
                includeCredentials: true
            });
            alert('Task Assigned Successfully');
            setAssignData({ taskId: '', userIdentifier: '' });
        } catch (err) {
            alert(err.data?.error || 'Failed to assign task');
        }
    };

    return (
        <div className="task-manager">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Task Manager</h4>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                >
                    {showCreateForm ? 'Cancel' : '+ Create New Task'}
                </button>
            </div>

            {showCreateForm && (
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h6 className="mb-0">Create New Task</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleCreateTask}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label small">Task Title</label>
                                    <input
                                        type="text" className="form-control" required
                                        value={newTask.title}
                                        onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label small">Reward (₹)</label>
                                    <input
                                        type="number" className="form-control" required
                                        value={newTask.reward}
                                        onChange={e => setNewTask({ ...newTask, reward: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label small">Type</label>
                                    <select
                                        className="form-select"
                                        value={newTask.type}
                                        onChange={e => setNewTask({ ...newTask, type: e.target.value })}
                                    >
                                        <option>Daily Task</option>
                                        <option>Weekly Task</option>
                                        <option>One-time</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label small">Description</label>
                                    <textarea
                                        className="form-control" rows="2"
                                        value={newTask.description}
                                        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-success text-white">Save Task</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="row">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white">
                            <h6 className="mb-0">All Tasks</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0">Title</th>
                                        <th className="border-0">Reward</th>
                                        <th className="border-0">Type</th>
                                        <th className="border-0">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="4" className="text-center py-3">Loading...</td></tr>
                                    ) : tasks.length === 0 ? (
                                        <tr><td colSpan="4" className="text-center py-3">No tasks found</td></tr>
                                    ) : (
                                        tasks.map(task => (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td className="text-success fw-bold">₹{task.reward}</td>
                                                <td><span className="badge bg-secondary">{task.type}</span></td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => setAssignData({ ...assignData, taskId: task._id })}
                                                    >
                                                        Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{ top: '1rem' }}>
                        <div className="card-header bg-primary text-white">
                            <h6 className="mb-0 text-white">Assign Task</h6>
                        </div>
                        <div className="card-body">
                            {!assignData.taskId ? (
                                <p className="text-muted small text-center my-3">Select a task from the list to assign.</p>
                            ) : (
                                <form onSubmit={handleAssignTask}>
                                    <div className="mb-3">
                                        <label className="form-label small">Selected Task ID</label>
                                        <input type="text" className="form-control form-control-sm" value={assignData.taskId} readOnly disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small">User Email or Mobile</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter user email to assign"
                                            required
                                            value={assignData.userIdentifier}
                                            onChange={e => setAssignData({ ...assignData, userIdentifier: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Assign to User</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManager;
