import React from 'react';
import progress from "../assets/svg/progress-tracker.svg";

const AdminPractice = () => {
    return (
        <div className="admin-practice">
            <div className="admin-practice__page">
                <div className="container-sm">
                    <div className="admin-practice__page-block">
                        <p className="admin-practice__page-l">CTF Practice challenges</p>
                        <p className="admin-practice__page-r">Challenges</p>
                    </div>
                </div>
            </div>

            <div className="container-lg">
                <div className="admin-practice__empty-block"/>

                <div className="admin-practice__progress-block">
                    <div>
                        <img
                            src={progress}
                            alt="progress"
                            className="admin-practice__progress-icon"
                        />

                        <p className="admin-practice__progress-title">Progress Tracker</p>
                    </div>

                    <button
                        className="admin-practice__new-challenge-btn"
                    >
                        Add new challenge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPractice;