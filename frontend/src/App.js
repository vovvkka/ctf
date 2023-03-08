import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import HomePage from "./containers/HomePage";
import Login from "./containers/Login";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
};

export default App;