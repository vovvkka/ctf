import React, {useState} from 'react';
import close from "../assets/close-eye.png";
import open from "../assets/open-eye.png";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../store/actions/usersActions";

const Login = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [isShow, setIsShow] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        dispatch(loginUser({...user}));
    };

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    return (
        <form autoComplete="off" onSubmit={onSubmit}>
            <div className="login">
                <div className="login__page">
                    <div></div>
                    <p className="login__title">Login</p>
                    <Link to="/register">
                        <button className="login__switch-page-btn">
                            Sign Up
                        </button>
                    </Link>
                </div>

                <div className="container-xs">
                    <div className="login__block">
                        <div className="login__input-block">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                autoComplete="off"
                                className="login__input"
                                value={user.email}
                                onChange={inputUserChangeHandler}
                            />
                        </div>

                        <div className="login__input-block">
                            <label>Password</label>
                            <div className="login__eye-block">
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    autoComplete="off"
                                    className="login__input"
                                    value={user.password}
                                    onChange={inputUserChangeHandler}
                                />
                                <img
                                    src={isShow ? close : open}
                                    onClick={() => setIsShow(prev => !prev)}
                                    className="login__input-eye"
                                    width="30px"
                                    alt="eye"
                                />
                            </div>
                        </div>

                        <button
                            className="login__accept"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;