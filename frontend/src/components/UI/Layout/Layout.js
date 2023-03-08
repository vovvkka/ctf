import React from 'react';
import Header from "../Header/Header";
const Layout = ({children}) => {

    return (
        <div className="wrapper">
            <Header/>
            <div className='main'>
                    {children}
            </div>
        </div>
    );
};

export default Layout;