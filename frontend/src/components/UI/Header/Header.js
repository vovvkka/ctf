import React from 'react';
import logo from "../../../assets/logo.png";
import {Link} from "react-router-dom";
import Anonymous from "../Anonymous/Anonymous";

const Header = () => {
    return (
        <div className="header">
            <div className="container-sm">
                <div className="header__block">
                    <div className="header__logo">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="CTF"
                                className="logo"
                            />
                        </Link>
                        <Link to="/">
                            <h6 className="header__logo-text">AIU CTF</h6>
                        </Link>
                    </div>

                    <div className="header__list">
                        {/*<ul>*/}
                        {/*    <Link to="/score-board">*/}
                        {/*        <li>Score board</li>*/}
                        {/*    </Link>*/}
                        {/*    <Link to="/practice">*/}
                        {/*        <li>Practice</li>*/}
                        {/*    </Link>*/}
                        {/*    <Link to="/enter-competition">*/}
                        {/*        <li className="header__list-last">Enter a CTF competition</li>*/}
                        {/*    </Link>*/}
                        {/*</ul>*/}
                    </div>

                    <Anonymous/>
                </div>
            </div>
        </div>
    );
};

export default Header;