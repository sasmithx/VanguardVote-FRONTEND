/*
import React, {useContext, useEffect} from "react";
import {UserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import axiosinstance from "../utils/axiosinstance.js";
import {API_PATHS} from "../utils/apiPath.js";

const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosinstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [user, updateUser, clearUser]);
};

export default useUserAuth;*/

// useUserAuth.jsx - Updated version
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import axiosinstance from "../utils/axiosinstance.js";
import {API_PATHS} from "../utils/apiPath.js";

const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const verifyAuth = async () => {
            try {
                // Only fetch if we don't have user data
                if (!user) {
                    const response = await axiosinstance.get(API_PATHS.AUTH.GET_USER_INFO);
                    if (isMounted && response.data) {
                        updateUser(response.data);
                    }
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        verifyAuth();

        return () => {
            isMounted = false;
        };
    }, [user, updateUser, clearUser, navigate]);

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        updateUser,
        clearUser
    };
};

export default useUserAuth;