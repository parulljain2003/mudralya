import React, { useState } from 'react';
import './Plans.css';

const Plans = () => {
    const [hasLaptop, setHasLaptop] = useState(false);

    return (
        <div className="plans-page">
            <header className="plans-header">
                <h1>Mudralaya Plans</h1>
                <p className="subtitle">Choose a Right and best suitable plan for yourself and join Mudralaya</p>
            </header>

            <div className="plans-grid">
                {/* Free Plan */}
                <div className="plan-card card-purple-gradient">
                    <div className="plan-badge-pill">FREE</div>
                    <div className="plan-price">₹ 0</div>
                    <ul className="plan-features">
                        <li>Start with zero investment</li>
                        <li>Access to daily / weekly / monthly tasks</li>
                        <li>Earn by completing tasks from multiple companies</li>
                        <li>Flexible work — home or on-field</li>
                        <li>Unlimited earning potential</li>
                        <li>Simple onboarding (18+)</li>
                        <li>Ideal for students, homemakers & part-time earners</li>
                    </ul>
                    <button className="plan-btn btn-outline">ENROLLED ALREADY</button>
                </div>

                {/* Individual Plan (Featured - Black) */}
                <div className="plan-card card-black">
                    <div className="plan-badge-wide-gradient">INDIVIDUAL</div>
                    <div className="plan-price large-price">
                        {hasLaptop ? '₹5,000' : '₹25,000'}
                    </div>

                    <ul className="plan-features">
                        <li>Maximum task opportunities from top brands & companies</li>
                        <li>Weekly training sessions</li>
                        <li>Dedicated Relationship Manager for guidance</li>
                        <li>Daily review & performance improvement</li>
                        <li>Fix salary support up to ₹50,000 (performance-based)</li>
                        <li>Strong digital presence setup</li>
                        <li>Priority access to high-paying tasks</li>
                        <li>Fast-track growth to Skilled Partner + Entrepreneur</li>
                        <li>Up to 25% more discount on referral</li>
                    </ul>

                    <label className="laptop-check">
                        <input
                            type="checkbox"
                            checked={hasLaptop}
                            onChange={(e) => setHasLaptop(e.target.checked)}
                        /> I have my Own Laptop
                    </label>

                    <button className="plan-btn btn-cyan">CHOOSE PLAN</button>
                </div>

                {/* Business Solution */}
                <div className="plan-card card-purple-gradient">
                    <div className="plan-badge-pill">BUSINESS SOLUTION</div>
                    <div className="plan-price">₹ 0</div>
                    <ul className="plan-features">
                        <li>We understand your goals and create custom tasks.</li>
                        <li>Industry-specific tasks for leads, marketing, and outreach.</li>
                        <li>Training videos for easy execution.</li>
                        <li>Verified partners for surveys and follow-ups.</li>
                        <li>Tech, sales, and service support included.</li>
                        <li>Affordable, scalable solutions for every business.</li>
                    </ul>
                    <button className="plan-btn btn-black">CHOOSE PLAN</button>
                </div>

                {/* Startup Launch Lab */}
                <div className="plan-card card-purple-gradient">
                    <div className="plan-badge-pill">STARTUP LAUNCH LAB</div>
                    <div className="plan-price price-custom">₹ Customise</div>
                    <ul className="plan-features">
                        <li>Understand your idea and build a tailored business model.</li>
                        <li>Market research and competitor analysis included.</li>
                        <li>Branding, tech development, and website/app setup.</li>
                        <li>Support across ideation, strategy, product, and marketing.</li>
                        <li>Go-to-market execution with dedicated startup mentor.</li>
                        <li>End-to-end guidance from idea to launch.</li>
                    </ul>
                    <button className="plan-btn btn-black">CHOOSE PLAN</button>
                </div>
            </div>
        </div>
    );
};

export default Plans;
