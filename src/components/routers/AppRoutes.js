import {Route,Switch} from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import React from "react";
import Users from "../ManageUsers/Users";
import Register from "../Register/Register";

const AppRoutes = (props) => {
    return (
        <>
            <Switch>

                {/*<PrivateRoutes path="/users" component={Users} />*/}

                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/login" exact>
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </>
    )
}

export default AppRoutes;