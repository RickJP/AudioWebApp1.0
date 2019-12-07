import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
// import AdminSignup from "./user/AdminSignup";
import Signin from "./user/Signin";

import Timer from "./TestingFeatures/Timer";
import FileList from "./TestingFeatures/FileList";
import UploadFiles from "./TestingFeatures/UploadFiles";

import SpeakingTest from "./studentTests/SpeakingTest";
import Dashboard from "./user/UserDashboard";

import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import TestingRoute from "./auth/TestingRoute";

import AdminDashboard from "./user/AdminDashboard";
import ListOfStudents from "./admin/ListOfStudents";
import GetRecordings from "./admin/GetRecordings";


import Profile from "./user/Profile";
import Home from './core/Home';
// import StartScreen from './core/StartScreen';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route path="/" exact component={StartScreen} /> */}
                <PrivateRoute path="/" exact component={Home} />
                
                
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                {/* <Route path="/adminSignup" exact component={AdminSignup} /> */}

                
                <TestingRoute path="/timer" exact component={Timer} />
                <TestingRoute path="/filelist" exact component={FileList} />
                <TestingRoute path="/ulfiles" exact component={UploadFiles} />
                
                
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
                <AdminRoute
                    path="/admin/listOfStudents"
                    exact
                    component={ListOfStudents}
                />
                <AdminRoute
                    path="/admin/getRecordings"
                    exact
                    component={GetRecordings}
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
