/*
/!*
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import {useNavigate} from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import PollCard from "../../components/PollCards/PollCard.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

import CREATE_ICON from "../../assets/images/my-poll-icon.png";
import EmptyCard from "../../components/cards/EmptyCard.jsx";

const PAGE_SIZE = 10;

const MyPolls = () => {
    useUserAuth();
    const navigate = useNavigate();

    const [allPolls, setAllPolls] = useState([]);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("");
    const [error, setError] = useState(null);

    const fetchAllPolls = async (overridePage = page, reset = false) => {
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
            if (!user?._id) {
                throw new Error("User not authenticated");
            }

            const queryParams = new URLSearchParams({
                page: overridePage,
                limit: PAGE_SIZE,
                ...(filterType && {types: filterType}), // Correctly spread filterType
                creatorId: user._id, // Include creatorId in query params
            });

            const response = await axiosinstance.get(
                `${API_PATHS.POLLS.GET_ALL}?${queryParams.toString()}`
            );

            const newPolls = response.data?.polls || [];
            setAllPolls((prevPolls) => (reset ? newPolls : [...prevPolls, ...newPolls]));
            setStats(response.data?.stats || {});
            setHasMore(newPolls.length === PAGE_SIZE);
        } catch (error) {
            setError("Failed to fetch polls. Please try again later.");
            console.error("Error fetching polls:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePolls = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        setPage(1);
        setAllPolls([]);
        fetchAllPolls(1, true);
    }, [filterType]);

    useEffect(() => {
        if (page !== 1) {
            fetchAllPolls();
        }
    }, [page]);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <HeaderWithFilter
                    title="My Polls"
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                {allPolls.length === 0 && !loading && (
                    <EmptyCard
                        imgSrc={CREATE_ICON}
                        message="You have not created any polls yet."
                        btnText="Create Poll"
                        onClick={() => navigate("/create-poll")}
                    />
                )}

                <InfiniteScroll
                    dataLength={allPolls.length}
                    next={loadMorePolls}
                    hasMore={hasMore}
                    loader={<h4 className="info-text">Loading...</h4>}
                    endMessage={
                        <p className="info-text">
                            {allPolls.length === 0 ? "No polls found." : "No more polls to display."}
                        </p>
                    }
                >
                    {allPolls.map((poll) => (
                        <PollCard
                            key={`dashboard_${poll._id}`}
                            pollId={poll._id}
                            question={poll.question}
                            type={poll.type}
                            options={poll.options}
                            voters={poll.voters?.length || 0}
                            responses={poll.responses || []}
                            creatorProfileImg={poll.creator?.profileImageUrl || null}
                            creatorName={poll.creator?.fullName || "Unknown"}
                            creatorUsername={poll.creator?.username || "unknown"}
                            userHasVoted={poll.userHasVoted || false}
                            isPollClosed={poll.pollClosed || false}
                            createdAt={poll.createdAt || ""}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </DashboardLayout>
    );
};

export default MyPolls;*!/

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import PollCard from "../../components/PollCards/PollCard.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import CREATE_ICON from "../../assets/images/my-poll-icon.png";
import EmptyCard from "../../components/cards/EmptyCard.jsx";

const PAGE_SIZE = 10; // Temporarily increased for testing

const MyPolls = () => {
    useUserAuth();
    const navigate = useNavigate();

    const [allPolls, setAllPolls] = useState([]);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("");
    const [error, setError] = useState(null);

    const fetchAllPolls = async (overridePage = page, reset = false) => {
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");

            if (!user?._id || !token) {
                throw new Error("User not authenticated");
            }

            // Debugging log
            console.log("Current user ID:", user._id);

            const queryParams = new URLSearchParams({
                page: overridePage,
                limit: PAGE_SIZE,
                ...(filterType && { types: filterType }),
                creatorId: user._id,
            });

            // Debugging log
            console.log("Request URL:", `${API_PATHS.POLLS.GET_ALL}?${queryParams.toString()}`);

            const response = await axiosinstance.get(
                `${API_PATHS.POLLS.GET_ALL}?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Debugging log
            console.log("Response data:", response.data);

            const newPolls = response.data?.polls || [];
            setAllPolls((prevPolls) => (reset ? newPolls : [...prevPolls, ...newPolls]));
            setStats(response.data?.stats || {});
            setHasMore(newPolls.length === PAGE_SIZE);
        } catch (error) {
            setError("Failed to fetch polls. Please try again later.");
            console.error("Error fetching polls:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePolls = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        setPage(1);
        setAllPolls([]);
        fetchAllPolls(1, true);
    }, [filterType]);

    useEffect(() => {
        if (page !== 1) {
            fetchAllPolls();
        }
    }, [page]);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <HeaderWithFilter
                    title="My Polls"
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                {allPolls.length === 0 && !loading && !error && (
                    <EmptyCard
                        imgSrc={CREATE_ICON}
                        message="You have not created any polls yet."
                        btnText="Create Poll"
                        onClick={() => navigate("/create-poll")}
                    />
                )}

                <InfiniteScroll
                    dataLength={allPolls.length}
                    next={loadMorePolls}
                    hasMore={hasMore}
                    loader={<h4 className="info-text">Loading...</h4>}
                    endMessage={
                        <p className="info-text">
                            {allPolls.length === 0 ? "No polls found." : "No more polls to display."}
                        </p>
                    }
                >
                    {allPolls.map((poll) => (
                        <PollCard
                            key={`dashboard_${poll._id}`}
                            pollId={poll._id}
                            question={poll.question}
                            type={poll.type}
                            options={poll.options}
                            voters={poll.voters?.length || 0}
                            responses={poll.responses || []}
                            creatorProfileImg={poll.creator?.profileImageUrl || null}
                            creatorName={poll.creator?.fullName || "Unknown"}
                            creatorUsername={poll.creator?.username || "unknown"}
                            userHasVoted={poll.userHasVoted || false}
                            isPollClosed={poll.pollClosed || false}
                            createdAt={poll.createdAt || ""}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </DashboardLayout>
    );
};

export default MyPolls;*/

// MyPolls.jsx - Updated version
/*
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import PollCard from "../../components/PollCards/PollCard.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import CREATE_ICON from "../../assets/images/my-poll-icon.png";
import EmptyCard from "../../components/cards/EmptyCard.jsx";

const PAGE_SIZE = 5;

const MyPolls = () => {
    const { user, isAuthenticated, isLoading } = useUserAuth();
    const navigate = useNavigate();

    const [allPolls, setAllPolls] = useState([]);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("");
    const [error, setError] = useState(null);

    const fetchAllPolls = async (overridePage = page, reset = false) => {
        if (loading || !isAuthenticated) return;

        setLoading(true);
        setError(null);

        try {
            if (!user?._id) {
                navigate("/login");
                return;
            }

            const queryParams = new URLSearchParams({
                page: overridePage,
                limit: PAGE_SIZE,
                ...(filterType && { types: filterType }),
                creatorId: user._id,
            });

            const response = await axiosinstance.get(
                `${API_PATHS.POLLS.GET_ALL}?${queryParams.toString()}`
            );

            const newPolls = response.data?.polls || [];
            setAllPolls((prevPolls) => (reset ? newPolls : [...prevPolls, ...newPolls]));
            setStats(response.data?.stats || {});
            setHasMore(newPolls.length === PAGE_SIZE);
        } catch (error) {
            setError("Failed to fetch polls. Please try again later.");
            console.error("Error fetching polls:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePolls = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            setPage(1);
            setAllPolls([]);
            fetchAllPolls(1, true);
        }
    }, [filterType, isAuthenticated]);

    useEffect(() => {
        if (page !== 1 && isAuthenticated) {
            fetchAllPolls();
        }
    }, [page, isAuthenticated]);

    if (isLoading) {
        return <div>Loading authentication status...</div>;
    }

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <HeaderWithFilter
                    title="My Polls"
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                {!isLoading && allPolls.length === 0 && !loading && !error && (
                    <EmptyCard
                        imgSrc={CREATE_ICON}
                        message="You have not created any polls yet."
                        btnText="Create Poll"
                        onClick={() => navigate("/create-poll")}
                    />
                )}

                <InfiniteScroll
                    dataLength={allPolls.length}
                    next={loadMorePolls}
                    hasMore={hasMore}
                    loader={<h4 className="info-text">Loading...</h4>}
                    endMessage={
                        <p className="info-text">
                            {allPolls.length === 0 ? "No polls found." : "No more polls to display."}
                        </p>
                    }
                >
                    {allPolls.map((poll) => (
                        <PollCard
                            key={`dashboard_${poll._id}`}
                            // ... (keep your existing props)
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </DashboardLayout>
    );
};

export default MyPolls;*/

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import PollCard from "../../components/PollCards/PollCard.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import CREATE_ICON from "../../assets/images/my-poll-icon.png";
import EmptyCard from "../../components/cards/EmptyCard.jsx";

const PAGE_SIZE = 10;


const MyPolls = () => {
    const { user, isAuthenticated, isLoading } = useUserAuth();
    const navigate = useNavigate();

    const [allPolls, setAllPolls] = useState([]);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("");
    const [error, setError] = useState(null);

    const fetchAllPolls = async (overridePage = page, reset = false) => {
        if (loading || !isAuthenticated || !user?._id) return;

        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                page: overridePage,
                limit: PAGE_SIZE,
                creator: user._id, // Changed to match backend parameter
                ...(filterType && { type: filterType }),
            });

            console.log("Fetching polls with query:", queryParams.toString());

            const response = await axiosinstance.get(
                `${API_PATHS.POLLS.GET_ALL}?${queryParams.toString()}`
            );

            console.log("API Response:", response.data);

            const newPolls = response.data?.polls || response.data || [];
            setAllPolls((prevPolls) =>
                reset ? newPolls : [...prevPolls, ...newPolls]
            );
            setHasMore(newPolls.length === PAGE_SIZE);
        } catch (error) {
            setError("Failed to fetch polls. Please try again later.");
            console.error("API Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePolls = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // Initial load
    useEffect(() => {
        if (isAuthenticated) {
            setPage(1);
            fetchAllPolls(1, true);
        }
    }, [isAuthenticated, filterType]);

    if (isLoading) {
        return <div>Loading user data...</div>;
    }

    return (
        <DashboardLayout activeMenu="My Polls">
            <div className="my-5 mx-auto">
                <HeaderWithFilter
                    title="My Polls"
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                {error && (
                    <div className="text-red-500 mb-4 text-center">{error}</div>
                )}

                {!loading && allPolls.length === 0 && !error && (
                    <EmptyCard
                        imgSrc={CREATE_ICON}
                        message="You have not created any polls yet."
                        btnText="Create Poll"
                        onClick={() => navigate("/create-poll")}
                    />
                )}

                <InfiniteScroll
                    dataLength={allPolls.length}
                    next={loadMorePolls}
                    hasMore={hasMore}
                    loader={<h4 className="info-text">Loading more polls...</h4>}
                    endMessage={
                        <p className="info-text">
                            {allPolls.length === 0
                                ? "No polls found."
                                : "You've seen all your polls!"}
                        </p>
                    }
                >
                    {allPolls.map((poll) => (
                        <PollCard
                            key={`my-poll-${poll._id}`}
                            pollId={poll._id}
                            question={poll.question}
                            type={poll.type}
                            options={poll.options}
                            voters={poll.voters?.length || 0}
                            responses={poll.responses || []}
                            creatorProfileImg={user?.profileImageUrl}
                            creatorName={user?.fullName}
                            creatorUsername={user?.username}
                            userHasVoted={poll.userHasVoted || false}
                            isPollClosed={poll.pollClosed || false}
                            createdAt={poll.createdAt}
                            isMyPoll
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </DashboardLayout>
    );
};

export default MyPolls;