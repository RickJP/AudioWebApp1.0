import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import SpeakingTest from "./studentTests/speakingTest";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import Profile from "./user/Profile";
import Home from './core/Home';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
    
               
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={Dashboard}
                />
                <PrivateRoute path="/user/test" exact component={SpeakingTest} />
        
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
