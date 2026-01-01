import React, { useState, useEffect } from 'react';
import { FaUsers, FaCopy, FaSearch, FaFilter, FaSort, FaGem, FaBuilding, FaRocket, FaEdit, FaYoutube, FaFilePdf, FaChevronRight } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { supabase } from '../supabaseClient';
import './Task.css';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All Task');
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data, error } = await supabase.functions.invoke('dashboard-api', {
                    body: { action: 'get-tasks' }
                });
                if (error) throw error;
                setTasks(data || []);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const toggleExpand = (id) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };

    const handleTakeTask = async (task) => {
        if (task.action_link) {
            window.open(task.action_link, '_blank');
        }

        // Track task start in backend
        try {
            const { error } = await supabase.functions.invoke('dashboard-api', {
                body: { action: 'start-task', taskId: task.id }
            });
            if (error) console.error('Error starting task:', error);
        } catch (err) {
            console.error('Failed to start task:', err);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'group': return <FaUsers />;
            case 'rocket': return <FaRocket />;
            case 'feedback': return <FaEdit />;
            case 'building': return <FaBuilding />;
            default: return <FaUsers />;
        }
    };

    if (loading) return <div className="loading">Loading Tasks...</div>;

    const filteredTasks = tasks.filter(task => {
        if (activeTab === 'All Task') return true;
        // Logic for Completed/Ongoing can be added here if status is available
        return true;
    });

    return (
        <div className="task-page">
            <div className="task-search-container">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search tasks" className="task-search-input" />
            </div>

            <div className="task-header-controls">
                <div className="task-tabs">
                    {['All Task', 'Completed', 'Ongoing'].map(tab => (
                        <button
                            key={tab}
                            className={`task-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="task-actions">
                    <button className="action-btn">Filter <FaFilter style={{ marginLeft: 8 }} /></button>
                    <button className="action-btn">Sort <FaSort style={{ marginLeft: 8 }} /></button>
                </div>
            </div>

            <div className="task-list">
                {filteredTasks.map((task) => (
                    <div className="task-card" key={task.id}>
                        <div className="task-card-header" onClick={() => toggleExpand(task.id)}>
                            <div className="task-left">
                                <div className={`task-icon-wrapper icon-red-gradient`}>
                                    {getIcon(task.icon_type)}
                                </div>
                                <div className="task-info">
                                    <h3>{task.title}</h3>
                                    <div className="task-meta">
                                        <span>{task.category || task.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="task-right">
                                <button className={`reward-btn`}>
                                    ₹ {task.reward_free || task.reward}
                                </button>
                                <button className="toggle-btn">
                                    {expandedTaskId === task.id ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                </button>
                            </div>
                        </div>

                        {expandedTaskId === task.id && (
                            <div className="task-expanded">
                                <div className="expanded-section">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h4 className="mb-0">Task Reward</h4>
                                    </div>
                                    <div className="reward-pricing">
                                        <div className="price-item">
                                            <div className="badge-members"><FaGem /> Members</div>
                                            <div className="price-value text-blue">₹ {task.reward_member || task.reward || 800}</div>
                                        </div>
                                        <div className="price-item">
                                            <div className="label-free">Free</div>
                                            <div className="price-value text-green">₹ {task.reward_free || task.reward || 600}</div>
                                        </div>
                                    </div>
                                </div>

                                {(task.video_url || task.pdf_url) && (
                                    <>
                                        <div className="expanded-separator"></div>
                                        <div className="expanded-section">
                                            {task.video_url && (
                                                <div className="resource-link" onClick={() => window.open(task.video_url, '_blank')}>
                                                    <div className="resource-icon youtube-icon"><FaYoutube style={{ color: 'red' }} /></div>
                                                    <span>Task Guidance Video</span>
                                                    <div className="ms-auto"><FaChevronRight className="text-muted" /></div>
                                                </div>
                                            )}
                                            {task.pdf_url && (
                                                <div className="resource-link mt-2" onClick={() => window.open(task.pdf_url, '_blank')}>
                                                    <div className="resource-icon pdf-icon"><FaFilePdf style={{ color: '#e53935' }} /></div>
                                                    <span>Task Information</span>
                                                    <div className="ms-auto"><FaChevronRight className="text-muted" /></div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="expanded-section">
                                    <h4>Terms and Condition</h4>
                                    <ul className="terms-list">
                                        <li>Must be completed before expiry.</li>
                                        <li>Genuine submissions only.</li>
                                        <li>Payment processed after verification.</li>
                                    </ul>
                                </div>
                                <button className="btn-take-task" onClick={() => handleTakeTask(task)}>
                                    Take Task
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;

