import React from 'react';

const ScoreTable = ({ users }) => {
    return (
        <div className="table">
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {
                    users?.length && users.map((user, idx) => {
                        return user.role !== "admin" && (
                            <tr key={user?._id} className="table__scoreboard">
                                <td className="table__sm">{idx + 1}</td>
                                <td className="table__s">{user?.teamName}</td>
                                <td className="table__s">{user?.practicePoints}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default ScoreTable;