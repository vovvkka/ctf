import React, {useState} from 'react';
import Backdrop from "../Backdrop/Backdrop";
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {createChallenge} from "../../../store/actions/challengesActions";

const Modal = ({show, closed, challenge}) => {
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
        closed();
    };

    const submitFormHandler = async e => {
        e.preventDefault();

        if (challenge) {
            const formData = new FormData();

            Object.keys(challengeData).forEach((key) => {
                formData.append(key, challengeData[key]);
            });

            await dispatch(createChallenge(formData));
            onCloseModal();
        }
    };

    let children = null;

    if (challenge) {
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
                            <Button icon={<UploadOutlined />} className="modal__file-btn">Click to Upload</Button>
                        </Upload>
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
                            {challenge && "Add new Challenge"}
                        </h2>
                    </div>

                    {children}

                    <div className="modal__footer">
                        <button className="modal__btn modal__btn-success" type="submit">
                            {challenge && "Create"}
                        </button>
                        <button className="modal__btn modal__btn-cancel" type="button" onClick={onCloseModal}>
                            Close
                        </button>
                    </div>

                    {/*{register && (*/}
                    {/*    <p className="modal__footer-privacy">Нажимая кнопку Зарегистрироваться Я соглашаюсь с обработкой*/}
                    {/*        персональных данных и Политикой конфиденциальности.</p>*/}
                    {/*)}*/}
                </form>
            </div>
        </>
    );
};

export default Modal;