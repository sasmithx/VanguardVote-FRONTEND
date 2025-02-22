/*
import React, {useCallback, useContext, useState} from "react";
import {UserContext} from "../../context/UserContext.jsx";
import {getPollBookmarked} from "../../utils/helper.js";
import UserProfileInfo from "../cards/UserProfileInfo.jsx";
import PollActions from "./PollActions.jsx";
import PollContent from "./PollContent.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import {API_PATHS} from "../../utils/apiPath.js";
import toast from "react-hot-toast";
import PollingResultContent from "./PollingResultContent.jsx";

const PollCard = ({
                      pollId,
                      question,
                      type,
                      options,
                      voters,
                      responses,
                      creatorProfileImg,
                      creatorName,
                      creatorUsername,
                      userHasVoted,
                      isMyPoll,
                      isPollClosed,
                      createdAt,
                  }) => {

    const {user, onUserVoted, toggleBookmarkId} = useContext(UserContext);

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [rating, setRating] = useState(0);
    const [userResponse, setUserResponse] = useState("");

    const [isVoteComplete, setIsVoteComplete] = useState(userHasVoted);

    const [pollResult, setPollResult] = useState({
        options,
        voters,
        responses,
    });

    const isPollBookmarked = getPollBookmarked(
        pollId,
        user.bookmarkedPolls || []
    );

    const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);
    const [pollClosed, setPollClosed] = useState(isPollClosed || false);
    const [pollDeleted, setPollDeleted] = useState(false);

    // Handles user input based on the poll type
    const handleInput = (value) => {
        if (type === "rating") setRating(value);
        else if (type === "open-ended") setUserResponse(value);
        else setSelectedOptionIndex(value);
    };

    // Generates post data based on the poll type
    const getPostData = useCallback(() => {
        if (type === "open-ended") {
            return {responseText: userResponse, voterId: user._id};
        }
        if (type === "rating") {
            return {optionIndex: rating - 1, voterId: user._id};
        }
        return {optionIndex: selectedOptionIndex, voterId: user._id};
    }, [type, userResponse, rating, selectedOptionIndex, user]);

    // Get Poll Details By ID
    const getPollDetail = async () => {
        try {
            const response = await axiosinstance.get(
                API_PATHS.POLLS.GET_BY_ID(pollId)
            );
            if (response.data) {
                const pollDetails = response.data;
                setPollResult({
                    options: pollDetails.options || [],
                    voters: pollDetails.voters.length || 0,
                    responses: pollDetails.responses || [],
                });
            }
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    // Handles the submission of the user's vote
    const handleVoteSubmit = async () => {
        try {
            const response = await axiosinstance.post(
                API_PATHS.POLLS.VOTE(pollId),
                getPostData()
            );

            getPollDetail()
            setIsVoteComplete(true);
            onUserVoted();
            toast.success("Vote Submitted Successfully");
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    }

    // Toggles the bookmark status of the poll
    const toggleBookmark = async () => {
        try {
            const response = await axiosinstance.post(
                API_PATHS.POLLS.BOOKMARK(pollId)
            );

            toggleBookmarkId(pollId);
            setPollBookmarked((prev) => !prev);
            toast.success(
                pollBookmarked ? "Poll Removed from Bookmarks" : "Poll Bookmarked"
            );
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };


    // Close Poll
    const closePoll = async () => {
        try{
            const response = await axiosinstance.post(API_PATHS.POLLS.CLOSE(pollId));

            if (response.data) {
                setPollClosed(true);
                toast.success("Poll Closed Successfully");
            }
        }catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.log("Something went wrong. Please try again.", error);
        }
    };

    return !pollDeleted && <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
        <div className="flex items-start justify-between">
            <UserProfileInfo
                imgURL={creatorProfileImg}
                fullname={creatorName}
                username={creatorUsername}
                createdAt={createdAt}
            />

            <PollActions
                pollId={pollId}
                isVoteComplete={isVoteComplete}
                inputCaptured={
                    !!(userResponse || selectedOptionIndex >= 0 || rating > 0)
                }
                onVoteSubmit={handleVoteSubmit}
                isBookmarked={pollBookmarked}
                toggleBookmark={toggleBookmark}
                isMyPoll={isMyPoll}
                pollClosed={pollClosed}
                onClosePoll={closePoll}
                onDelete={() => {
                }}
            />
        </div>

        <div className="ml-14 mt-3">
            <p className="text-[15px] text-black leading-8">{question}</p>
            <div className="mt-4">
                {isVoteComplete || isPollClosed ? (
                    <PollingResultContent
                        type={type}
                        options={pollResult.options || []}
                        voters={pollResult.voters}
                        responses={pollResult.responses || []}
                    />
                ) : (
                    <PollContent
                        type={type}
                        options={options}
                        selectedOptionIndex={selectedOptionIndex}
                        onOptionSelect={handleInput}
                        rating={rating}
                        onRatingChange={handleInput}
                        userResponse={userResponse}
                        onResponseChange={handleInput}
                    />
                )}
            </div>
        </div>

    </div>;
};

export default PollCard;*/

import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { getPollBookmarked } from "../../utils/helper.js";
import UserProfileInfo from "../cards/UserProfileInfo.jsx";
import PollActions from "./PollActions.jsx";
import PollContent from "./PollContent.jsx";
import axiosinstance from "../../utils/axiosinstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import toast from "react-hot-toast";
import PollingResultContent from "./PollingResultContent.jsx";

const PollCard = ({
                      pollId,
                      question,
                      type,
                      options,
                      voters,
                      responses,
                      creatorProfileImg,
                      creatorName,
                      creatorUsername,
                      userHasVoted,
                      isMyPoll,
                      isPollClosed,
                      createdAt,
                  }) => {
    const { user, onUserVoted, toggleBookmarkId, onPollCreateOrDelete } = useContext(UserContext);

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [rating, setRating] = useState(0);
    const [userResponse, setUserResponse] = useState("");

    const [isVoteComplete, setIsVoteComplete] = useState(userHasVoted);
    const [pollClosed, setPollClosed] = useState(isPollClosed || false);
    const [pollDeleted, setPollDeleted] = useState(false);

    const [pollResult, setPollResult] = useState({
        options,
        voters,
        responses,
    });

    const isPollBookmarked = getPollBookmarked(pollId, user.bookmarkedPolls || []);
    const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);

    // Handles user input based on the poll type
    const handleInput = (value) => {
        if (type === "rating") setRating(value);
        else if (type === "open-ended") setUserResponse(value);
        else setSelectedOptionIndex(value);
    };

    // Generates post data based on the poll type
    const getPostData = useCallback(() => {
        if (type === "open-ended") {
            return { responseText: userResponse, voterId: user._id };
        }
        if (type === "rating") {
            return { optionIndex: rating - 1, voterId: user._id };
        }
        return { optionIndex: selectedOptionIndex, voterId: user._id };
    }, [type, userResponse, rating, selectedOptionIndex, user]);

    // Get Poll Details By ID
    const getPollDetail = async () => {
        try {
            const response = await axiosinstance.get(API_PATHS.POLLS.GET_BY_ID(pollId));
            if (response.data) {
                const pollDetails = response.data;
                setPollResult({
                    options: pollDetails.options || [],
                    voters: pollDetails.voters.length || 0,
                    responses: pollDetails.responses || [],
                });
            }
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    // Handles the submission of the user's vote
    const handleVoteSubmit = async () => {
        try {
            await axiosinstance.post(API_PATHS.POLLS.VOTE(pollId), getPostData());
            getPollDetail();
            setIsVoteComplete(true);
            onUserVoted();
            toast.success("Vote Submitted Successfully");
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    // Toggles the bookmark status of the poll
    const toggleBookmark = async () => {
        try {
            await axiosinstance.post(API_PATHS.POLLS.BOOKMARK(pollId));
            toggleBookmarkId(pollId);
            setPollBookmarked((prev) => !prev);
            toast.success(pollBookmarked ? "Poll Removed from Bookmarks" : "Poll Bookmarked");
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    // Close Poll
    const closePoll = async () => {
        try {
            const response = await axiosinstance.post(API_PATHS.POLLS.CLOSE(pollId));
            if (response.data) {
                setPollClosed(true);
                toast.success("Poll Closed Successfully");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.log("Error closing poll:", error);
        }
    };

    // Delete Poll
    const deletePoll = async () => {
        try {
            const response = await axiosinstance.delete(API_PATHS.POLLS.DELETE(pollId));
            if (response.data) {
                setPollDeleted(true);
                onPollCreateOrDelete()
                toast.success("Poll Deleted Successfully");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.log("Error closing poll:", error);
        }
    };

    console.log("isMyPoll:", isMyPoll, "pollClosed:", pollClosed);

    return (
        !pollDeleted && (
            <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
                <div className="flex items-start justify-between">
                    <UserProfileInfo imgURL={creatorProfileImg} fullname={creatorName} username={creatorUsername} createdAt={createdAt} />
                    <PollActions
                        isMyPoll={isMyPoll}
                        pollId={pollId}
                        isVoteComplete={isVoteComplete}
                        inputCaptured={!!(userResponse || selectedOptionIndex >= 0 || rating > 0)}
                        onVoteSubmit={handleVoteSubmit}
                        isBookmarked={pollBookmarked}
                        toggleBookmark={toggleBookmark}
                        pollClosed={pollClosed}
                        onClosePoll={closePoll}
                        onDelete={deletePoll}
                    />
                </div>
                <div className="ml-14 mt-3">
                    <p className="text-[15px] text-black leading-8">{question}</p>
                    <div className="mt-4">
                        {isVoteComplete || isPollClosed ? (
                            <PollingResultContent type={type} options={pollResult.options || []} voters={pollResult.voters} responses={pollResult.responses || []} />
                        ) : (
                            <PollContent type={type} options={options} selectedOptionIndex={selectedOptionIndex} onOptionSelect={handleInput} rating={rating} onRatingChange={handleInput} userResponse={userResponse} onResponseChange={handleInput} />
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default PollCard;
