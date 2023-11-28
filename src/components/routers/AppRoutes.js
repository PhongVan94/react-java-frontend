import {Route,Switch} from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import React from "react";
import Users from "../ManageUsers/Users";
import Register from "../Register/Register";
import About from "../About/About";

const AppRoutes = (props) => {
    return (
        <>
            <Switch>

                {/*<PrivateRoutes path="/users" component={Users} />*/}

                <Route path="/users" exact>
                    <Users/>
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/login" exact>
                    <Login/>
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="*">
                    404 Not found
                </Route>
            </Switch>
        </>
    )
}

export default AppRoutes;