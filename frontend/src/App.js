import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./containers/HomePage";
import Login from "./containers/Login";
import Register from "./containers/Register";
import {useSelector} from "react-redux";
import AdminPractice from "./containers/AdminPractice";
import AdminTeams from "./containers/AdminTeams";
import Practice from "./containers/Practice";
import ScoreBoard from "./containers/ScoreBoard";

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/" />;
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/score-board" component={ScoreBoard}/>

                <ProtectedRoute
                    path="/practice"
                    component={Practice}
                    isAllowed={user}
                    redirectTo="/"
                    exact
                />

                <ProtectedRoute
                    path="/admin-practice"
                    component={AdminPractice}
                    isAllowed={user?.role === "admin"}
                    redirectTo="/"
                    exact
                />

                <ProtectedRoute
                    path="/admin-teams"
                    component={AdminTeams}
                    isAllowed={user?.role === "admin"}
                    redirectTo="/"
                    exact
                />
            </Switch>
        </Layout>
    );
};

export default App;