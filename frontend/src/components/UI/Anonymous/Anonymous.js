import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {Dropdown, Space} from "antd";
import {logoutUser} from "../../../store/actions/usersActions";




const Anonymous = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    // const matches = useMediaQuery({ maxWidth: 768 });

    const onLogout = async () => {
        await dispatch(logoutUser());
    }

    const items = [
        {
            label: <p onClick={onLogout}>Logout</p>,
            key: '0',
        },
    ];

    return (
        <ul className="header__menu">
            {
                !user ? (
                    <>
                        <Link to="/login">
                            <li>
                                Log In
                            </li>
                        </Link>

                        <Link to="/register">
                            <li>
                                Sign Up
                            </li>
                        </Link>
                    </>
                ) : (
                    <Dropdown menu={{items}} trigger={['click']}>
                        <li
                            onClick={(e) => e.preventDefault()}
                            className="header__dropdown"
                        >
                            <Space>
                                <p className="header__dropdown-user">{user.teamName}</p>
                                <UserOutlined />
                                <DownOutlined/>
                            </Space>
                        </li>
                    </Dropdown>
                )
            }

        </ul>
    );
};

export default Anonymous;
