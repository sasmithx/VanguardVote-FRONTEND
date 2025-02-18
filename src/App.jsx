import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React from "react";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import Home from "./pages/Dashboard/Home";
import CreatePoll from "./pages/Dashboard/CreatePoll";
import MyPolls from "./pages/Dashboard/MyPolls";
import VotedPolls from "./pages/Dashboard/VotedPolls";
import Bookmarks from "./pages/Dashboard/Bookmarks";
import UserProvider from "./context/UserContext.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <div>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Root/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/signUp" element={<SignUpForm/>}/>
                        <Route path="/dashboard" element={<Home/>}/>
                        <Route path="/create-poll" element={<CreatePoll/>}/>
                        <Route path="/my-polls" element={<MyPolls/>}/>
                        <Route path="/voted-polls" element={<VotedPolls/>}/>
                        <Route path="/bookmarked-polls" element={<Bookmarks/>}/>
                    </Routes>
                </Router>

                <Toaster
                    toastOptions={{
                        className: "",
                        style: {
                            fontSize: '13px'
                        },
                    }}
                />
            </UserProvider>
        </div>
    );
};

export default App;

//Define the root component to handle the initial redirect
const Root = () => {
    //Check if token exists in local storage
    const isAuthenticated = !!localStorage.getItem("token");

    //Redirect to dashboard if authenticated,othwerwise to login
    return isAuthenticated ? (
        <Navigate to="/dashboard"/>
    ) : (
        <Navigate to="/login"/>
    );
};
