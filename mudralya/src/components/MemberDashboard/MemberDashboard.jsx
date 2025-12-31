import React, { useState } from 'react';
import './MemberDashboardLayout.css';
import '../Dashboard/Dashboard.css'; // Reusing some admin styles if needed
import ClientSidebar from './ClientSidebar';
import DashboardHome from './components/DashboardHome';
import EarningsOverview from './components/EarningsOverview';
import ReferralSection from './components/ReferralSection';
import SettingsSection from './components/SettingsSection';

const MemberDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardHome />;
            case 'wallet': // Mapping 'wallet' to EarningsOverview for now
                return <EarningsOverview />;
            case 'task':
                return (
                    <div className="text-center py-5">
                        <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                        <h3>Tasks</h3>
                        <p className="text-muted">Task management coming soon!</p>
                    </div>
                );
            case 'membership':
                return (
                    <div className="text-center py-5">
                        <i className="fas fa-id-card fa-3x text-muted mb-3"></i>
                        <h3>Membership</h3>
                        <p className="text-muted">Membership details coming soon!</p>
                    </div>
                );
            case 'plans':
                return (
                    <div className="text-center py-5">
                        <i className="fas fa-list fa-3x text-muted mb-3"></i>
                        <h3>Plans</h3>
                        <p className="text-muted">Plans coming soon!</p>
                    </div>
                );
            case 'settings':
                return <SettingsSection />;
            default:
                return <DashboardHome />;
        }
    };

    return (
        <div className="client-dashboard-layout">
            <ClientSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobileOpen={isMobileSidebarOpen}
                toggleMobileSidebar={toggleMobileSidebar}
            />

            <main className="client-main-content">
                {/* Mobile Header Toggle */}
                <div className="d-lg-none mb-3 d-flex align-items-center">
                    <button className="btn btn-light border me-3" onClick={toggleMobileSidebar}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <h5 className="m-0">Menu</h5>
                </div>

                {/* NOTE: Header is now inside DashboardHome for the 'dashboard' tab, 
                    but we might want a global header or per-tab header. 
                    For now, I'll remove the global header to avoid duplication on the Dashboard tab.
                 */}
                {activeTab !== 'dashboard' && (
                    <div className="dashboard-header-section">
                        <h1>
                            {activeTab === 'wallet' && 'My Earnings'}
                            {activeTab === 'task' && 'My Tasks'}
                            {activeTab === 'membership' && 'Membership'}
                            {activeTab === 'plans' && 'Available Plans'}
                            {activeTab === 'settings' && 'Account Settings'}
                        </h1>
                        <p className="text-muted">Manage your account and activities</p>
                    </div>
                )}

                {renderContent()}
            </main>
        </div>
    );
};

export default MemberDashboard;
