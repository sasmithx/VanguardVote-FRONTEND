import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import PollCard from "../../components/PollCards/PollCard.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyCard from "../../components/cards/EmptyCard.jsx";
import CREATE_ICON from "../../assets/images/my-poll-icon.png";

const PAGE_SIZE = 5;

const Home = () => {
    useUserAuth();
    const navigate = useNavigate();

    const [allPolls, setAllPolls] = useState([]);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("");

    const fetchAllPolls = async (overridePage = page, reset = false) => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosinstance.get(
                `${API_PATHS.POLLS.GET_ALL}?page=${overridePage}&limit=${PAGE_SIZE}${
                    filterType ? `&types=${filterType}` : ""
                }`
            );

            const newPolls = response.data?.polls || [];

            if (newPolls.length > 0) {
                setAllPolls((prevPolls) =>
                    reset ? newPolls : [...prevPolls, ...newPolls]
                );
                setStats(response.data?.stats || {});
                setHasMore(newPolls.length === PAGE_SIZE);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePolls = () => {
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        setPage(1);
        setAllPolls([]); // Reset polls when filter changes
        fetchAllPolls(1, true);
    }, [filterType]);

    useEffect(() => {
        if (page !== 1) {
            fetchAllPolls();
        }
    }, [page]);

    /*const loadMorePolls = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };*/

    return (
        <DashboardLayout activeMenu="Dashboard" stats={stats || []} showStats>
            <div className="my-5 mx-auto">
                <HeaderWithFilter
                    title="Polls"
                    filterType={filterType}
                    setFilterType={setFilterType}
                />

                {allPolls.length === 0 && !loading && (
                    <EmptyCard
                        imgSrc={CREATE_ICON}
                        message="Welcome! Create your first poll now."
                        btnText="Create Poll"
                        onClick={() => navigate("/create-poll")}
                    />
                )}

                <InfiniteScroll
                    dataLength={allPolls.length}
                    next={loadMorePolls}
                    hasMore={hasMore}
                    loader={<h4 className="info-text">Loading...</h4>}
                    endMessage={<p className="info-text">No more polls to display.</p>}
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

export default Home;
