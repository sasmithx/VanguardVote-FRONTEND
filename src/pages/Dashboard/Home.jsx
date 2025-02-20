/*
import React, {useEffect, useState} from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import {useNavigate} from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import PollCard from "../../components/PollCards/PollCard.jsx";

const PAGE_SIZE = 10;

const Home = () => {

    useUserAuth();

    const navigate = useNavigate();

    const [allPolls, setAllPolls] = useState([]);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const [filterType, setFilterType] = useState("");

    const fetchAllPolls = async (overridePage = page) => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosinstance.get(
                `${API_PATHS.POLLS.GET_ALL}?page=${overridePage}&limit=${PAGE_SIZE}&types=${filterType}`
            );

            if (response.data?.polls?.length > 0) {
                setAllPolls((prevPolls) =>
                    overridePage === 1
                        ? response.data.polls
                        : [...prevPolls, ...response.data.polls]
                );
                setStats(response.data?.stats || []);
                setHasMore(response.data.polls.length === PAGE_SIZE);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(true);
        }

    };

    useEffect(() => {
        setPage(1);
        fetchAllPolls(1);
        return () => {
        };
    }, [filterType]);

    useEffect(() => {
        if (page !== 1) {
            fetchAllPolls();
        }
        return () => {
        };
    }, [page]);

    return (
        <DashboardLayout activeMenu='Dashboard'>
            <div className="my-5 mx-auto">
                <HeaderWithFilter
                    title="Polls"
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                {allPolls.map((poll) => (
                    <PollCard
                        key={`dashboard_${poll._id}`}
                        pollId={poll._id}
                        question={poll.question}
                        type={poll.type}
                        options={poll.options}
                        voters={poll.voters.length || 0}
                        responses={poll.responses || []}
                        creatorProfileImg={poll.creator.profileImageUrl || null}
                        creatorName={poll.creator.fullName}
                        creatorUsername={poll.creator.username}
                        userHasVoted={poll.userHasVoted || false}
                        isPollClosed={poll.isClosed || false}
                        createdAt={poll.createdAt || false}
                    />
                    ))}
            </div>
        </DashboardLayout>
    )
}

export default Home*/

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import PollCard from "../../components/PollCards/PollCard.jsx";

const PAGE_SIZE = 10;

const Home = () => {
    useUserAuth();

    const navigate = useNavigate();

    const [allPolls, setAllPolls] = useState([]);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("");

    const fetchAllPolls = async (overridePage = page) => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosinstance.get(
                `${API_PATHS.POLLS.GET_ALL}?page=${overridePage}&limit=${PAGE_SIZE}&types=${filterType}`
            );

            if (response.data?.polls?.length > 0) {
                setAllPolls((prevPolls) =>
                    overridePage === 1
                        ? response.data.polls
                        : [...prevPolls, ...response.data.polls]
                );
                setStats(response.data?.stats || []);
                setHasMore(response.data.polls.length === PAGE_SIZE);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false); // ✅ Fixed loading state bug
        }
    };

    useEffect(() => {
        setPage(1);
        fetchAllPolls(1);
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
                    title="Polls"
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                {allPolls.map((poll) => (
                    <PollCard
                        key={`dashboard_${poll._id}`}
                        pollId={poll._id}
                        question={poll.question}
                        type={poll.type}
                        options={poll.options}
                        voters={poll.voters.length || 0}
                        responses={poll.responses || []}
                        creatorProfileImg={poll.creator.profileImageUrl || null}
                        creatorName={poll.creator.fullName}
                        creatorUsername={poll.creator.username}
                        userHasVoted={poll.userHasVoted || false}
                        isPollClosed={poll.pollClosed || false} // ✅ Fixed pollClosed issue
                        createdAt={poll.createdAt || false}
                    />
                ))}
            </div>
        </DashboardLayout>
    );
};

export default Home;
