import React from 'react';
import {useDispatch} from "react-redux";
import {deleteChallenge} from "../../store/actions/challengesActions";

const ChallengeCard = ({ isAdmin, challenge, onOpenEditModal }) => {
    const dispatch = useDispatch();

    return (
        <div className="challenge">
            <div className="challenge__top">
                <span>Cryptography</span>
                <span>| {challenge.points} {challenge.points > 1 ? "points" : "point"}</span>
            </div>

            <div className="challenge__middle">
                <p className="challenge__title">
                    {challenge.title}
                </p>

                {
                    isAdmin && (
                        <div className="challenge__buttons">
                            <button
                                className="challenge__btn challenge__btn-edit"
                                onClick={() => onOpenEditModal(challenge)}
                            >
                                Edit
                            </button>
                            <button
                                className="challenge__btn challenge__btn-delete"
                                onClick={() => dispatch(deleteChallenge(challenge._id))}
                            >
                                Delete
                            </button>
                        </div>
                    )
                }
            </div>


        </div>
    );
};

export default ChallengeCard;