import React, { useState } from 'react';
import { FaUsers, FaCopy, FaSearch, FaFilter, FaSort, FaGem, FaBuilding } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import './Task.css';

const TASKS = [
    {
        id: 1,
        title: "Maximize Download for Mudralaya Mobile Application",
        sub: "Weekly Task",
        reward: "₹ 600",
        isCompleted: false,
        icon: <FaUsers />,
        iconColor: "icon-red-gradient"
    },
    {
        id: 2,
        title: "HDFC One Account Opening",
        sub: "Daily Task",
        tag: "Payment Processed",
        isCompleted: true,
        reward: "Completed",
        icon: <FaBuilding />, // Using FaBuilding as HDFC placeholder
        iconColor: "icon-hdfc" // Special Red Square
    },
    {
        id: 3,
        title: "Maximize Download for Mudralaya Mobile Application",
        sub: "Weekly Task",
        progressText: "in progress...",
        reward: "MF250E",
        isCopy: true,
        isCompleted: false,
        icon: <FaUsers />, // Reusing users icon 
        iconColor: "icon-red-gradient" // Actually screenshot shows red/pink too
    },
    {
        id: 4,
        title: "Survey Form for Mobile application",
        sub: "Weekly Task",
        reward: "2 / 25",
        isCompleted: false,
        icon: <FaUsers />,
        iconColor: "icon-red-gradient", // Screenshot shows red/pink
        expanded: true
    }
];

const Task = () => {
    const [activeTab, setActiveTab] = useState('All Task');
    const [expandedTaskId, setExpandedTaskId] = useState(4);

    const toggleExpand = (id) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };

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
                {TASKS.map((task) => (
                    <div className="task-card" key={task.id}>
                        <div className="task-card-header">
                            <div className="task-left">
                                <div className={`task-icon-wrapper ${task.iconColor || 'icon-blue-gradient'}`}>
                                    {task.icon}
                                </div>
                                <div className="task-info">
                                    <h3>{task.title}</h3>
                                    <div className="task-meta">
                                        <span>{task.sub}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="task-right">
                                {task.tag && <span className="status-processed">{task.tag}</span>}
                                {task.progressText && <span className="status-progress-text">{task.progressText}</span>}

                                <button className={`reward-btn ${task.isCompleted ? 'completed' : ''} ${task.isCopy ? 'copy-btn' : ''}`}>
                                    {task.reward} {task.isCopy && <FaCopy />}
                                </button>
                                <button className="toggle-btn" onClick={() => toggleExpand(task.id)}>
                                    {expandedTaskId === task.id ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                </button>
                            </div>
                        </div>

                        {expandedTaskId === task.id && (
                            <div className="task-expanded">
                                <div className="expanded-section">
                                    <h4>Task Reward</h4>
                                    <div className="reward-pricing">
                                        <div className="price-item">
                                            <div className="badge-members"><FaGem /> Members</div>
                                            <div className="price-value text-blue">₹ 800</div>
                                        </div>
                                        <div className="price-item">
                                            <div className="label-free">Free</div>
                                            <div className="price-value text-green">₹ 600</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="expanded-section">
                                    <h4>Terms and Condition</h4>
                                    <ol className="terms-list">
                                        <li>A total of 25 survey forms must be completed.</li>
                                        <li>All responses must be real and genuine; fake or assumed data is not allowed.</li>
                                        <li>No duplicate or repeated responses are permitted; each form must be filled by a different individual.</li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;
