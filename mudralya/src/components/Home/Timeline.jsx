import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Timeline.css';

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineItems = [
    {
      step: '1',
      description: 'Register for free'
    },
    {
      step: '2',
      description: 'Complete your profile'
    },
    {
      step: '3',
      description: 'Choose your category'
    },
    {
      step: '4',
      description: 'Get tasks from top companies'
    },
    {
      step: '5',
      description: 'Complete & earn instantly'
    }
  ];

  useEffect(() => {
    let autoplayInterval;

    const advanceTimeline = () => {
      setActiveIndex((prev) => (prev + 1) % timelineItems.length);
    };

    autoplayInterval = setInterval(advanceTimeline, 3000);

    return () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };
  }, [timelineItems.length]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="timeline-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="how-to-join-title">
            How to <span className="how-to-join-accent">Join</span>
          </h2>
          <p className="how-to-join-subtitle">5 Simple Steps</p>
        </div>

        <div className="timeline-container">
          <div className="timeline-track">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`timeline-item ${activeIndex === index ? 'active' : ''}`}
                data-index={index}
                onClick={() => handleItemClick(index)}
              >
                <div className="timeline-marker">{item.step}</div>
                <div className="timeline-description">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-5 mb-5">
          <p className="timeline-cta-text">Join today and start earning!</p>
          <Link to="/advisor" className="btn btn-timeline-cta mt-3">
            Talk to our Advisor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

