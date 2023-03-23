import React, {useEffect, useState} from 'react';
import progress from "../assets/svg/progress-tracker.svg";
import Modal from "../components/UI/Modal/Modal";
import {useDispatch} from "react-redux";
import {fetchChallenges} from "../store/actions/challengesActions";
import searchIcon from "../assets/svg/search-icon.svg";

const AdminPractice = () => {
    const dispatch = useDispatch();
    // const challenges = useSelector(state => state.challenges.challenges);
    const [show, setShow] = useState(false);
    const [createChallenge, setCreateChallenge] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    useEffect(() => {
        dispatch(fetchChallenges(`?category=${selectedCategory}&title=${searchCategory}`));
    }, [dispatch, selectedCategory, searchCategory]);

    return (
        <>
            <Modal
                show={show}
                challenge={createChallenge}
                closed={() => {
                    setShow(false);
                    setCreateChallenge(false);
                }}
            />

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
                            onClick={() => {
                                setShow(true);
                                setCreateChallenge(true);
                            }}
                        >
                            Add new challenge
                        </button>
                    </div>

                    <div className="admin-practice__main">
                        <div className="admin-practice__category">
                            <p className="admin-practice__category-title">Category Filter</p>

                            <div className="admin-practice__buttons"
                                 onChange={e => setSelectedCategory(e.target.value)}>
                                <div className="admin-practice__radio-block">
                                    <input
                                        id="All"
                                        type="radio"
                                        name="category"
                                        value=""
                                        checked={selectedCategory === ""}
                                        onChange={e => e}
                                    />
                                    <label htmlFor="All">All</label>
                                </div>
                                <div className="admin-practice__radio-block">
                                    <input
                                        id="Codebreakers"
                                        type="radio"
                                        name="category"
                                        value="Codebreakers"
                                    />
                                    <label htmlFor="Codebreakers">Codebreakers</label>
                                </div>
                                <div className="admin-practice__radio-block">
                                    <input
                                        id="First-Timers"
                                        type="radio"
                                        name="category"
                                        value="First-Timers"
                                    />
                                    <label htmlFor="First-Timers">First-Timers</label>
                                </div>
                            </div>

                            <div className="admin-practice__search">
                                <div className="admin-practice__search-block">
                                    <label>Search by Title</label>
                                    <input
                                        type="text"
                                        className="admin-practice__search-input"
                                        value={searchCategory}
                                        onChange={e => setSearchCategory(e.target.value)}
                                    />

                                    <img
                                        src={searchIcon}
                                        alt="searchIcon"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPractice;