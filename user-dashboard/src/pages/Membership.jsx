import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './Membership.css';

const BENEFITS = [
    {
        id: '01',
        title: 'Earn 250 Cash',
        desc: 'Get a reward of 250 in your Mudralaya Wallet as a early joining Bonus.'
    },
    {
        id: '02',
        title: 'Extra Earning',
        desc: "Your will get extra earning for the same task for which other's are getting lesser"
    },
    {
        id: '03',
        title: 'High Paying Task',
        desc: 'You will get free access of high paying task after becoming our member'
    },
    {
        id: '04',
        title: 'Free Training',
        desc: 'A FREE training course worth ₹10,000 to support your journey toward financial independence'
    }
];

const Membership = () => {
    const [billingCycle, setBillingCycle] = useState('yearly'); // 'yearly' or 'monthly'

    return (
        <div className="membership-page">
            <header className="membership-header">
                <h1>Mudralaya Membership</h1>
                <p className="subtitle">Become our member and Gain these benefits of membership</p>

                <div className="plan-toggle">
                    <button
                        className={`toggle-option ${billingCycle === 'yearly' ? 'active' : ''}`}
                        onClick={() => setBillingCycle('yearly')}
                    >
                        Yearly -20%
                    </button>
                    <button
                        className={`toggle-option ${billingCycle === 'monthly' ? 'active' : ''}`}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        Monthly
                    </button>
                </div>
            </header>

            <div className="membership-content">
                <div className="benefits-grid">
                    {BENEFITS.map((benefit) => (
                        <div className="benefit-card" key={benefit.id}>
                            <div className="benefit-number-box">
                                {benefit.id}
                            </div>
                            <h3 className="benefit-title">{benefit.title}</h3>
                            <p className="benefit-desc">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="membership-footer">
                <div className="price-text">
                    <span className="price-amount">$ 9.99</span> / Billed Annually
                </div>
                <button className="buy-btn">
                    Buy Now <FaArrowRight />
                </button>
            </footer>
        </div>
    );
};

export default Membership;
