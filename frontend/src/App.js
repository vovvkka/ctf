import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import HomePage from "./containers/HomePage";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" component={HomePage} exact />
            </Switch>
        </Layout>
    );
};

export default App;