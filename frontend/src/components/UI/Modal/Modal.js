import React, {useEffect, useState} from 'react';
import Backdrop from "../Backdrop/Backdrop";
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {checkAccuracyChallenge, createChallenge, editChallenge} from "../../../store/actions/challengesActions";
import {apiUrl} from "../../../config";
import fileIcon from "../../../assets/svg/file-icon.svg";

const Modal = ({show, closed, createNewChallenge, isChallenge, cData, isEdit}) => {
    const dispatch = useDispatch();
    const [challengeData, setChallengeData] = useState({
        title: "",
        category: "First-Timers",
        description: "",
        points: 1,
        type: "",
        file: "",
        result: "",
        hint1: "",
        hint2: "",
        hint3: "",
    });

    const [hint1, setHint1] = useState(false);
    const [hint2, setHint2] = useState(false);
    const [hint3, setHint3] = useState(false);

    const [expectedResult, setExpectedResult] = useState('');

    useEffect(() => {
        if (isEdit) {
            setChallengeData(cData);
        }
    }, [cData, createNewChallenge, isEdit]);

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            setChallengeData(prev => ({...prev, file: info.file.originFileObj}));

            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`).then(r => r);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`).then(r => r);
            }
        },
    };

    const inputChallengeChangeHandler = e => {
        const {name, value} = e.target;
        setChallengeData(prev => ({...prev, [name]: value}));
    };

    const onCloseModal = () => {
        setChallengeData({
            title: "",
            category: "First-Timers",
            description: "",
            points: 1,
            type: "",
            file: "",
            result: "",
            hint1: "",
            hint2: "",
            hint3: "",
        });

        setHint1(false);
        setHint2(false);
        setHint3(false);
        setExpectedResult('');

        closed();
    };

    const submitFormHandler = async e => {
        e.preventDefault();

        if (isChallenge) {
            const answer = await dispatch(checkAccuracyChallenge(cData._id, {result: expectedResult}));
            if (answer.message) {
                onCloseModal();
            }
        }

        if (createNewChallenge) {
            const formData = new FormData();

            Object.keys(challengeData).forEach((key) => {
                formData.append(key, challengeData[key]);
            });

            if (isEdit) {
                await dispatch(editChallenge(cData._id, formData, challengeData));
            } else {
                await dispatch(createChallenge(formData));

            }

            onCloseModal();
        }
    };

    let children = null;

    if (createNewChallenge) {
        children = (
            <div className="modal__body">
                <div className="modal__row-block">
                    <div className="modal__input-block-row modal__input-block-row-first">
                        <label>Title *</label>
                        <input
                            name="title"
                            className="modal__input"
                            value={challengeData.title}
                            onChange={inputChallengeChangeHandler}
                            required
                        />
                    </div>

                    <div className="modal__input-block-row modal__input-block-row-second">
                        <label>Points *</label>
                        <input
                            name="points"
                            className="modal__input"
                            type="number"
                            min={1}
                            value={challengeData.points}
                            onChange={inputChallengeChangeHandler}
                            required
                        />
                    </div>
                </div>

                <div className="modal__input-block">
                    <label>Description *</label>
                    <textarea
                        name="description"
                        autoComplete="off"
                        className="modal__textarea"
                        value={challengeData.description}
                        onChange={inputChallengeChangeHandler}
                    />
                </div>

                <div className="modal__row-block">
                    <div className="modal__input-block-row">
                        <label>Hint 1</label>
                        <input
                            name="hint1"
                            className="modal__input"
                            value={challengeData.hint1}
                            onChange={inputChallengeChangeHandler}
                        />
                    </div>

                    <div className="modal__input-block-row">
                        <label>Category *</label>
                        <select
                            name="category"
                            className="modal__select"
                            defaultValue="First-Timers"
                            onChange={inputChallengeChangeHandler}
                        >
                            <option value="First-Timers">First-Timers</option>
                            <option value="Codebreakers">Codebreakers</option>
                        </select>
                    </div>
                </div>

                <div className="modal__row-block">
                    <div className="modal__input-block-row">
                        <label>Hint 2</label>
                        <input
                            name="hint2"
                            className="modal__input"
                            value={challengeData.hint2}
                            onChange={inputChallengeChangeHandler}
                        />
                    </div>

                    <div className="modal__input-block-row">
                        <label>Hint 3</label>
                        <input
                            name="hint3"
                            className="modal__input"
                            value={challengeData.hint3}
                            onChange={inputChallengeChangeHandler}
                        />
                    </div>
                </div>

                <div className="modal__row-block">
                    <div className="modal__input-block-row">
                        <label>Expected result: *</label>
                        <input
                            name="result"
                            className="modal__input"
                            value={challengeData.result}
                            onChange={inputChallengeChangeHandler}
                            required
                        />
                    </div>

                    <div className="modal__input-block-row">
                        <label>Upload file</label>
                        <Upload {...props} className="modal__file-btn" maxCount={1}>
                            <Button icon={<UploadOutlined/>} className="modal__file-btn">Click to Upload</Button>
                        </Upload>
                    </div>
                </div>
            </div>
        );
    }

    if (isChallenge) {
        children = (
            <div className="modal__body modal__body-challenge">
                <p className="modal__points">{cData.points} points</p>
                <div className="modal__description-block">
                    <p className="modal__description-label">Description</p>
                    <p className="modal__description">{cData.description}</p>
                </div>

                <div className="modal__hints">
                    <p className="modal__hints-title">Hints</p>

                    <div className="modal__hints-block">
                        <div className="modal__hints-field">
                            <span className="modal__hints-label">1</span>
                            <p
                                className={hint1 ? "modal__hints-hint" : "modal__hints-show"}
                                onClick={() => setHint1(true)}
                            >
                                {hint1 ? cData.hint1 : "Show hint"}
                            </p>
                        </div>

                        <div className="modal__hints-field">
                            <span className="modal__hints-label">2</span>
                            <p
                                className={hint2 ? "modal__hints-hint" : "modal__hints-show"}
                                onClick={() => setHint2(true)}
                            >
                                {hint2 ? cData.hint2 : "Show hint"}
                            </p>
                        </div>

                        <div className="modal__hints-field">
                            <span className="modal__hints-label">3</span>
                            <p
                                className={hint3 ? "modal__hints-hint" : "modal__hints-show"}
                                onClick={() => setHint3(true)}
                            >
                                {hint3 ? cData.hint3 : "Show hint"}
                            </p>
                        </div>

                        <a
                            href={apiUrl + "/" + cData.file}
                            className="modal__download"
                            target="_blank"
                            rel="noreferrer"
                            download
                        >
                            <img src={fileIcon} alt="fileIcon"/>
                            Download file
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Backdrop show={show} clicked={onCloseModal}/>
            <div
                className="modal"
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0',
                }}
            >
                <form autoComplete="off" onSubmit={submitFormHandler}>
                    <div className="modal__header">
                        <h2 className="modal__title">
                            {createNewChallenge && `${isEdit ? "Edit" : "Add new"} Challenge`}
                            {isChallenge && `${cData.title}`}
                        </h2>
                    </div>

                    {children}

                    <div className="modal__footer">
                        {
                            createNewChallenge || isEdit ?
                                <>
                                    <button
                                        className="modal__btn modal__btn-success"
                                        type="submit"
                                    >
                                        {createNewChallenge && `${isEdit ? "Edit" : "Create"}`}
                                    </button>
                                    <button
                                        className="modal__btn modal__btn-cancel"
                                        type="button"
                                        onClick={onCloseModal}
                                    >
                                        Close
                                    </button>
                                </> : <>
                                    <div className="modal__result">
                                        <input
                                            type="text"
                                            className="modal__input modal__result-input"
                                            value={expectedResult}
                                            onChange={e => setExpectedResult(e.target.value)}
                                        />

                                        <button
                                            type="submit"
                                            className="modal__result-btn"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </>
                        }

                    </div>
                </form>
            </div>
        </>
    );
};

export default Modal;