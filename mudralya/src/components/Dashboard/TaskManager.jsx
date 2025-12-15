import React, { useState } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Watch Product Demo', reward: '50', type: 'Video', status: 'Active' },
        { id: 2, title: 'Complete Survey', reward: '30', type: 'Survey', status: 'Active' }
    ]);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        reward: '',
        type: 'Video'
    });

    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        const task = {
            id: tasks.length + 1,
            ...newTask,
            status: 'Active'
        };
        setTasks([...tasks, task]);
        setNewTask({ title: '', description: '', reward: '', type: 'Video' });
        setIsFormOpen(false);
    };

    return (
        <div className="task-manager">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="mb-1">Task Management</h4>
                    <p className="text-muted mb-0">Create and assign tasks to partners</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
                    <i className="fas fa-plus me-2"></i> Create New Task
                </button>
            </div>

            {isFormOpen && (
                <div className="card mb-4 shadow-sm border-0">
                    <div className="card-header bg-white py-3">
                        <h5 className="mb-0">New Task Details</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAddTask}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Task Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={newTask.title}
                                        onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Reward Amount (₹)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        required
                                        value={newTask.reward}
                                        onChange={e => setNewTask({ ...newTask, reward: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Task Type</label>
                                    <select
                                        className="form-select"
                                        value={newTask.type}
                                        onChange={e => setNewTask({ ...newTask, type: e.target.value })}
                                    >
                                        <option value="Video">Video Watch</option>
                                        <option value="Survey">Survey</option>
                                        <option value="Share">Social Share</option>
                                        <option value="App">App Download</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={newTask.description}
                                        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="col-12 text-end">
                                    <button type="button" className="btn btn-light me-2" onClick={() => setIsFormOpen(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-success">Save & Publish Task</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Task Title</th>
                                <th>Type</th>
                                <th>Reward</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td className="fw-medium">{task.title}</td>
                                    <td><span className="badge bg-light text-dark border">{task.type}</span></td>
                                    <td className="text-success fw-bold">₹ {task.reward}</td>
                                    <td><span className="badge bg-success-subtle text-success">Active</span></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary me-2"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-sm btn-outline-danger"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskManager;
