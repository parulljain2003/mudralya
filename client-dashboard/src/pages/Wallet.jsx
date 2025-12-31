import React, { useState, useEffect } from 'react';
import { FiArrowUpRight, FiArrowDownLeft, FiBarChart2, FiRefreshCw, FiCreditCard, FiAward, FiMoreVertical } from 'react-icons/fi';
import { MdOutlineFeedback, MdRocketLaunch, MdCampaign } from 'react-icons/md';
import { supabase } from '../supabaseClient'; // Ensure this is correct
import './Wallet.css';

const TRANSACTIONS = [
    {
        id: 1,
        title: "Feedback Survey Rewards",
        sub: "Successfully",
        amount: "+ ₹ 250",
        icon: <MdOutlineFeedback />,
        colorClass: "trans-red"
    },
    {
        id: 2,
        title: "Tide Account Opening",
        sub: "Successfully",
        amount: "+ ₹ 250",
        icon: <MdRocketLaunch />,
        colorClass: "trans-blue"
    },
    {
        id: 3,
        title: "Brand Promotion",
        sub: "Successfully",
        amount: "+ ₹ 250",
        icon: <MdCampaign />,
        colorClass: "trans-yellow"
    }
];

const Wallet = () => {
    const [bankDetails, setBankDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        holder_name: '',
        bank_name: '',
        account_number: '',
        ifsc_code: ''
    });

    useEffect(() => {
        fetchBankDetails();
    }, []);

    const fetchBankDetails = async () => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase.functions.invoke('bank-account', {
                method: 'GET',
            });

            if (error) throw error;

            if (data && Object.keys(data).length > 0) {
                setBankDetails(data);
                setFormData({
                    holder_name: data.holder_name,
                    bank_name: data.bank_name,
                    account_number: data.account_number,
                    ifsc_code: data.ifsc_code
                });
            }
        } catch (error) {
            console.error('Error fetching bank details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const { error } = await supabase.functions.invoke('bank-account', {
                method: 'POST',
                body: formData
            });

            if (error) throw error;

            setBankDetails(formData);
            setIsEditing(false);
            // Re-fetch to confirm or just set state
        } catch (error) {
            console.error('Error saving bank details:', error);
            alert('Failed to save bank details. Please try again.');
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        if (bankDetails) {
            setFormData({
                holder_name: bankDetails.holder_name,
                bank_name: bankDetails.bank_name,
                account_number: bankDetails.account_number,
                ifsc_code: bankDetails.ifsc_code
            });
        }
    };

    return (
        <div className="wallet-page">
            <header className="wallet-header">
                <div>
                    <h1>Mudralaya Wallet</h1>
                    <p className="subtitle">Choose a Right and best suitable plan for yourself and join Mudralaya</p>
                </div>
                <button className="kyc-btn">Verify KYC</button>
            </header>

            <div className="wallet-content">
                {/* Left Section */}
                <div className="wallet-left">
                    {/* Top Stats */}
                    <div className="stats-top-row">
                        <div className="stat-card-lg">
                            <div className="stat-circle orange">
                                <FiArrowUpRight />
                            </div>
                            <div className="stat-info">
                                <span>Today's Pending Earning</span>
                                <h3>₹ 450</h3>
                            </div>
                        </div>
                        <div className="stat-card-lg">
                            <div className="stat-circle purple">
                                <FiArrowDownLeft />
                            </div>
                            <div className="stat-info">
                                <span>This Month Earning</span>
                                <h3 className="green">₹ 250</h3>
                            </div>
                        </div>
                    </div>

                    {/* Metrics 2x2 */}
                    <div className="metrics-grid">
                        <div className="metric-item">
                            <div className="metric-icon-box bg-green">
                                <FiBarChart2 />
                            </div>
                            <div className="metric-text">
                                <span>Approved Balance</span>
                                <h4>₹ 450</h4>
                            </div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-icon-box bg-orange">
                                <FiRefreshCw />
                            </div>
                            <div className="metric-text">
                                <span>Pending task Amount</span>
                                <h4>₹ 450</h4>
                            </div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-icon-box bg-blue">
                                <FiCreditCard />
                            </div>
                            <div className="metric-text">
                                <span>Total Balance</span>
                                <h4>₹ 450</h4>
                            </div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-icon-box bg-purple">
                                <FiAward />
                            </div>
                            <div className="metric-text">
                                <span>Total Payout</span>
                                <h4>₹ 450</h4>
                            </div>
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className="transactions-section">
                        <h2>Latest Transations</h2>
                        <div className="transaction-list">
                            {TRANSACTIONS.map((t) => (
                                <div className="transaction-item" key={t.id}>
                                    <div className="trans-left">
                                        <div className={`trans-icon ${t.colorClass}`}>
                                            {t.icon}
                                        </div>
                                        <div className="trans-info">
                                            <h4>{t.title}</h4>
                                            <p>{t.sub}</p>
                                        </div>
                                    </div>
                                    <div className="trans-amount">{t.amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="wallet-right">
                    {/* Payouts */}
                    <div className="info-card">
                        <div className="card-header-row">
                            <h3>Payouts</h3>
                            <FiMoreVertical className="menu-icon" />
                        </div>
                        <div className="payout-details">
                            <div className="detail-row">
                                <span>Minimum Payout</span>
                                <span>₹ 500</span>
                            </div>
                            <div className="detail-row">
                                <span>Total Amount (not eligible for Payout)</span>
                                <span>₹ 250</span>
                            </div>
                            <div className="detail-row">
                                <span>Pending Task Amount</span>
                                <span>₹ 450</span>
                            </div>
                        </div>
                        <button className="payout-btn" disabled>Proceed to Payout</button>
                    </div>

                    {/* Bank Account */}
                    <div className="info-card">
                        <div className="card-header-row">
                            <h3>Bank Account</h3>
                            {!isEditing && <FiMoreVertical className="menu-icon" onClick={handleEditClick} />}
                        </div>

                        {isEditing ? (
                            <div className="bank-form">
                                <div className="form-group">
                                    <label>Account Holder Name</label>
                                    <input
                                        type="text"
                                        value={formData.holder_name}
                                        onChange={(e) => setFormData({ ...formData, holder_name: e.target.value })}
                                        placeholder="Enter name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Bank Name</label>
                                    <input
                                        type="text"
                                        value={formData.bank_name}
                                        onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                                        placeholder="Enter bank name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Account Number</label>
                                    <input
                                        type="text"
                                        value={formData.account_number}
                                        onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                                        placeholder="Enter account number"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>IFSC Code</label>
                                    <input
                                        type="text"
                                        value={formData.ifsc_code}
                                        onChange={(e) => setFormData({ ...formData, ifsc_code: e.target.value })}
                                        placeholder="Enter IFSC code"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button className="btn-cancel" onClick={handleCancelClick}>Cancel</button>
                                    <button className="btn-save" onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {bankDetails ? (
                                    <div className="bank-details">
                                        <div className="detail-row">
                                            <span>Account Holder Name:</span>
                                            <span>{bankDetails.holder_name}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Bank Name:</span>
                                            <span>{bankDetails.bank_name}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Account Number:</span>
                                            <span>{bankDetails.account_number}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>IFSC Code:</span>
                                            <span>{bankDetails.ifsc_code}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bank-details">
                                        <p style={{ color: '#999', textAlign: 'center', margin: '20px 0' }}>No bank account added yet.</p>
                                    </div>
                                )}
                                {!isEditing && (
                                    <button className="add-bank-btn" onClick={handleEditClick}>
                                        {bankDetails ? 'Update Bank Account' : 'Add Bank Account'}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
