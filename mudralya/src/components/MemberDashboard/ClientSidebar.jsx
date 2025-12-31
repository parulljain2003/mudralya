import React from 'react';
import './MemberDashboardLayout.css';

const ClientSidebar = ({ activeTab, setActiveTab, isMobileOpen, toggleMobileSidebar }) => {
    const navItems = [
        { id: 'dashboard', icon: 'fas fa-th-large', label: 'Dashboard' },
        { id: 'task', icon: 'fas fa-clipboard-list', label: 'Task' },
        { id: 'membership', icon: 'fas fa-id-card', label: 'Membership' },
        { id: 'plans', icon: 'fas fa-list', label: 'Plans' },
        { id: 'wallet', icon: 'fas fa-wallet', label: 'Wallet' },
        { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`client-sidebar-overlay ${isMobileOpen ? 'active' : ''}`}
                onClick={toggleMobileSidebar}
            ></div>

            <aside className={`client-sidebar ${isMobileOpen ? 'active' : ''}`}>
                <nav className="client-sidebar-nav">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.id}>
                                <button
                                    className={`client-nav-link ${activeTab === item.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        if (window.innerWidth < 992) toggleMobileSidebar();
                                    }}
                                >
                                    <i className={`${item.icon} client-nav-icon`}></i>
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                </nav>

                <div className="client-sidebar-footer">
                    <button className="client-nav-link logout-btn">
                        <i className="fas fa-sign-out-alt client-nav-icon"></i>
                        <span>Log out</span>
                    </button>
                </div>
            </aside >
        </>
    );
};

export default ClientSidebar;
