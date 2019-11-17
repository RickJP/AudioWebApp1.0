import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import SpeakingTest from "./studentTests/SpeakingTest";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import Profile from "./user/Profile";


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SpeakingTest} />
                
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
    
               
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={Dashboard}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />
                <PrivateRoute
                    path="/profile/:userId"
                    exact
                    component={Profile}
                />
                
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
