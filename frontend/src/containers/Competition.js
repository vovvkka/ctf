import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOneCompetition} from "../store/actions/competitionsActions";

const Competition = ({ match }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const competition = useSelector(state => state.competitions.competition);

    const [title, setTitle] = useState("");

    useEffect(() => {
        dispatch(fetchOneCompetition(match.params.id));
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (competition) {
            setTitle(competition.title);
        }
    }, [competition]);

    return (
        <>
            <div className="competition">
                <div className="competition__page">
                    <div className="container-sm">
                        <div className="competition__page-block">
                            <p>Welcome To CTF Competition</p>
                            <p>Challenges</p>
                        </div>
                    </div>
                </div>

                <div className="container-sm">
                    <div className="admin-competitions__info">
                        <div className="container-practice">
                            <div className="admin-competitions__info-block">
                                <p>Competition Challenges</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-s">
                    <div className="competition__top">
                        <div className="competition__title">
                            <label>Name of the competition</label>
                            <input
                                name="title"
                                className="competition__title-input"
                                type="text"
                                maxLength={50}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                readOnly={user.role !== "admin"}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Competition;