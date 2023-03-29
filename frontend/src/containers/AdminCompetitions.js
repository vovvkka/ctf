import React, {useState} from 'react';
import Modal from "../components/UI/Modal/Modal";

const AdminCompetitions = () => {
    const [show, setShow] = useState(false);
    const [createNewCompetition, setCreateNewCompetition] = useState(false);

    const openCreateModal = () => {
        setCreateNewCompetition(true);
        setShow(true);
    };

    return (
        <>
            <Modal
                show={show}
                createNewCompetition={createNewCompetition}
                closed={() => {
                    setShow(false);
                    setCreateNewCompetition(false);
                }}
            />

            <div className="admin-competitions">
                <div className="admin-competitions__page">
                    <div className="container-sm">
                        <p>List of competitions history</p>
                    </div>
                </div>

                <div className="container-sm">
                    <div className="admin-competitions__info">
                        <div className="container-practice">
                            <div className="admin-competitions__info-block">
                                <p>List of Competitions History</p>
                                <button
                                    className="admin-competitions__new-btn"
                                    onClick={openCreateModal}
                                >
                                    Create new competition
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminCompetitions;