import React from 'react';
import {Link} from "react-router-dom";


const Anonymous = () => {
    // const matches = useMediaQuery({ maxWidth: 768 });

    return (
        <ul className="header__menu">
            <Link to="/login">
                <li>
                    Log In
                </li>
            </Link>

            <Link to="/register">
                <li>
                    Register
                </li>
            </Link>
        </ul>
    );
};

export default Anonymous;
