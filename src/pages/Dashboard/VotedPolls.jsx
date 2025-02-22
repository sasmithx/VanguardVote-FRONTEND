import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import PollCard from "../../components/PollCards/PollCard.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyCard from "../../components/cards/EmptyCard.jsx";
import CREATE_ICON from "../../assets/images/my-poll-icon.png";
import { API_PATHS } from "../../utils/apiPath.js";

const PAGE_SIZE = 5;

const VotedPolls = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [allPolls, setAllPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch Voted Polls with Pagination
  const fetchAllPolls = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosinstance.get(`${API_PATHS.POLLS.VOTED_POLLS}?page=${page}&limit=${PAGE_SIZE}`);
      const newPolls = response.data?.polls || [];

      setAllPolls((prevPolls) => [...prevPolls, ...newPolls]);
      setHasMore(newPolls.length === PAGE_SIZE);
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Load more polls when scrolling
  const loadMorePolls = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchAllPolls();
  }, [page]);

  return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <h2 className="text-xl font-medium text-black">Voted Polls</h2>

          {allPolls.length === 0 && !loading && (
              <EmptyCard
                  imgSrc={CREATE_ICON}
                  message="You haven't voted on any polls yet. Start voting now!"
                  btnText="Explore"
                  onClick={() => navigate("/dashboard")}
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

export default VotedPolls;
