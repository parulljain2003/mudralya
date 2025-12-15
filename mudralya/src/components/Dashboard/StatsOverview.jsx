import React from 'react';

const StatsOverview = ({ data }) => {
    const stats = [
        {
            title: 'Total Revenue',
            value: '₹ 12,500', // Mock data
            change: '+15%',
            isPositive: true,
            icon: 'fas fa-rupee-sign',
            color: 'primary'
        },
        {
            title: 'Join Requests',
            value: data?.counts?.joinRequests || 0,
            change: '+5',
            isPositive: true,
            icon: 'fas fa-user-plus',
            color: 'success'
        },
        {
            title: 'Active Members',
            value: '142', // Mock data
            change: '+12%',
            isPositive: true,
            icon: 'fas fa-users',
            color: 'info'
        },
        {
            title: 'Pending Tasks',
            value: '24', // Mock data
            change: '-2',
            isPositive: false,
            icon: 'fas fa-tasks',
            color: 'warning'
        }
    ];

    return (
        <div className="stats-overview">
            <div className="row g-4">
                {stats.map((stat, index) => (
                    <div className="col-12 col-md-6 col-lg-3" key={index}>
                        <div className="stat-card-modern">
                            <div className="stat-card-body">
                                <div className="stat-content">
                                    <h6 className="stat-title">{stat.title}</h6>
                                    <h2 className="stat-value">{stat.value}</h2>
                                    <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                                        <i className={`fas fa-arrow-${stat.isPositive ? 'up' : 'down'}`}></i>
                                        <span>{stat.change} this week</span>
                                    </div>
                                </div>
                                <div className={`stat-icon-bg bg-${stat.color}`}>
                                    <i className={stat.icon}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsOverview;
