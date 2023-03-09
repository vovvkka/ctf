import React, {useState} from 'react';
import close from "../assets/close-eye.png";
import open from "../assets/open-eye.png";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerUser} from "../store/actions/usersActions";

const Register = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username: [""],
        lastname: [""],
        teamName: "",
        email: "",
        password: "",
    });

    const [isShow, setIsShow] = useState(false);

    const onSubmit = async () => {
        await dispatch(registerUser({...user}));
    };

    const multipleChangeHandler = (e, index) => {
        const {name, value} = e.target;

        setUser((prev) => {
            const newArr = prev[name].map((item, i) => {
                if (index === i) {
                    return value;
                }

                return item;
            });

            return {
                ...prev,
                [name]: newArr,
            };
        });
    };

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const addInputHandler = () => {
        setUser((prev) => ({
            ...prev,
            username: [...prev["username"], ''],
            lastname: [...prev["lastname"], ""]
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="register">
                <div className="register__page">
                    <p>Register your team!</p>
                </div>

                <div className="container-xs">
                    <div className="register__block">
                        {
                            user.username?.map((us, idx) => (
                                <div className="register__row-block" key={us + idx}>
                                    <div className="register__input-block-row">
                                        <label>User {idx + 1}*</label>
                                        <input
                                            name="username"
                                            className="register__input"
                                            value={user.username[idx]}
                                            onChange={e => multipleChangeHandler(e, idx)}
                                            placeholder="First Name"
                                            autoFocus
                                            required
                                        />
                                    </div>

                                    <div className="register__input-block-row">
                                        <label>Last Name*</label>
                                        <input
                                            name="lastname"
                                            className="register__input"
                                            value={user.lastname[idx]}
                                            onChange={e => multipleChangeHandler(e, idx)}
                                            placeholder="Last Name"
                                            required
                                        />
                                    </div>
                                </div>
                            ))
                        }


                        <div className="register__input-block">
                            <label>Team Name</label>
                            <input
                                name="teamName"
                                className="register__input"
                                value={user.teamName}
                                onChange={inputUserChangeHandler}
                            />
                        </div>

                        <div className="register__input-block">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                autoComplete="off"
                                className="register__input"
                                value={user.email}
                                onChange={inputUserChangeHandler}
                            />
                        </div>

                        <div className="register__input-block">
                            <label>Password</label>
                            <div className="register__eye-block">
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    autoComplete="off"
                                    className="register__input"
                                    value={user.password}
                                    onChange={inputUserChangeHandler}
                                />
                                <img
                                    src={isShow ? close : open}
                                    onClick={() => setIsShow(prev => !prev)}
                                    className="register__input-eye"
                                    width="30px"
                                    alt="eye"
                                />
                            </div>
                        </div>

                        <div className="register__add-user">
                            <button
                                type="button"
                                className="register__add-user-btn"
                                disabled={user.username.length > 4}
                                onClick={addInputHandler}
                                autoFocus={false}
                            >
                                Add another member
                            </button>
                        </div>

                        <div className="register__buttons">
                            <Link to="/">
                                <button
                                    className="register__btn register__btn-cancel"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <button
                                className="register__btn register__btn-accept"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;