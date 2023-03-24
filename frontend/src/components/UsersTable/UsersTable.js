import React from 'react';
import deleteIcon from "../../assets/delete-icon.png";

const UsersTable = ({userTable, users}) => {
    return (
        <div className="table">
            <table>
                <thead>
                <tr>
                    <th>Email Address</th>
                    <th>Player / Team Name</th>
                    <th className="table__score">Practice Score</th>
                    <th className="table__date">Registered Date</th>
                    <th>Team Members</th>
                    {!userTable ? <th className="table__actions-th">Actions</th> : null}
                </tr>
                </thead>
                <tbody>
                {
                    users?.length && users.map(user => {
                        return (
                            <tr key={user?._id}>
                                <td className="table__sm">{user?.email}</td>
                                <td className="table__s">{user?.teamName}</td>
                                <td className="table__s">{user?.practicePoints}</td>
                                <td>{new Date(user?.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {
                                        user.users?.map(us => (
                                            <p
                                                key={us?._id}
                                                className="table__subFields"
                                            >
                                                <span>{`${us.username} ${us.lastname}`}</span>
                                                <p>-</p>
                                                <p>{us.email}</p>
                                            </p>
                                        ))
                                    }
                                </td>
                                {!userTable ? (
                                    <td className="table__actions">
                                        <img
                                            src={deleteIcon}
                                            alt="Удалить"
                                            width={15}
                                        />
                                    </td>
                                ) : null}
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;