import React, {createContext, useState} from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
    };

    // Update user stats
    const updateUserStats = (key, value) => {
        setUser((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Update totalPollsCreated count locally
    const onPollCreateOrDelete = (type = "create") => {
        const totalPollsCreated = user.totalPollsCreated || 0;
        updateUserStats(
            "totalPollsCreated",
            type == "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
        );
    };

    return <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
            onPollCreateOrDelete
        }}
    >{children}</UserContext.Provider>
};

export default UserProvider;