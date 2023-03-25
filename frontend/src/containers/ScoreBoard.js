import React, {useEffect} from 'react';
import progress from "../assets/svg/progress-tracker.svg";
import ScoreTable from "../components/ScoreTable/ScoreTable";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../store/actions/usersActions";

const ScoreBoard = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        dispatch(fetchUsers("?filter=score"));
    }, [dispatch])

    return (
        <div className="score-board">
            <div className="score-board__page">
                <div className="container-sm">
                    <p>Score Board</p>
                </div>
            </div>

            <div className="container-sm">
                <div className="score-board__ranking">
                    <img
                        src={progress}
                        alt="progress"
                        className="score-board__ranking-icon"
                    />

                    <p className="score-board__ranking-title">Ranking</p>
                </div>

                <ScoreTable users={users}/>
            </div>
        </div>
    );
};

export default ScoreBoard;