import React from "react";
import moment from "moment";
import CharAvatar from "../cards/CharAvatar.jsx";

// Component to display poll option vote results
const PollOptionVoteResult = ({ label, optionVotes, totalVotes }) => {
    const progress = totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;

    return (
        <div className="w-full bg-slate-200/80 rounded-md h-6 relative mb-3">
            <div className="bg-sky-900/10 h-6 rounded-md" style={{ width: `${progress}%` }}></div>
            <span className="absolute inset-0 flex items-center justify-between text-gray-800 text-[12px] font-medium mx-4">
                {label} <span className="text-[11px] text-slate-500">{progress}%</span>
            </span>
        </div>
    );
};

// Component to display image-based poll results
const ImagePollResult = ({ imgURL, optionVotes, totalVotes }) => {
    const progress = totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;

    return (
        <div>
            <div className="w-full bg-gray-800 flex items-center gap-2 mb-4 rounded-md overflow-hidden">
                <img src={imgURL} alt="Poll Option" className="w-full h-36 object-contain" />
            </div>
            <PollOptionVoteResult optionVotes={optionVotes} totalVotes={totalVotes} />
        </div>
    );
};

// Component to display responses for open-ended polls
const OpnEndedPollResponse = ({ profileImgUrl, userFullName, response, createdAt }) => {
    return (
        <div className="mb-6 ml-3">
            <div className="flex gap-3 items-center">
                {profileImgUrl ? (
                    <img src={profileImgUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                    <CharAvatar fullName={userFullName} style="w-8 h-8 text-[10px] bg-sky-800/40" />
                )}

                <p className="text-[13px] text-black">
                    {userFullName}{" "}
                    <span className="mx-1 text-[10px] text-slate-500">•</span>
                    <span className="text-[10px] text-slate-500">{createdAt}</span>
                </p>
            </div>

            <p className="text-xs text-slate-700 mt-1 ml-[44px]">{response}</p>
        </div>
    );
};

// Main component to display polling results
const PollingResultContent = ({ type, options = [], voters = 0, responses = [] }) => {
    // Handle open-ended responses
    if (type === "open-ended") {
        if (!responses || responses.length === 0) {
            return <p className="text-gray-500 ml-3">No responses yet.</p>;
        }

        return (


            <div>
                {responses.map((response) => (
                    <OpnEndedPollResponse
                        key={response._id}
                        profileImgUrl={response.voterId?.profileImageUrl}
                        userFullName={response.voterId?.fullName || ""}
                        response={response.responseText || ""}
                        createdAt={response.createdAt ? moment(response.createdAt).fromNow() : ""}
                    />
                ))}
            </div>
        );
    }

    // Handle cases where there are no options
    if (!options || options.length === 0) {
        return <p className="text-gray-500 ml-3">No options available.</p>;
    }

    // Handle different poll types
    switch (type) {
        case "single-choice":
        case "yes/no":
        case "rating":
            return (
                <>
                    {options.map((option) => (
                        <PollOptionVoteResult
                            key={option._id}
                            label={`${option.optionText} ${type === "rating" ? "Star" : ""}`}
                            optionVotes={option.votes}
                            totalVotes={voters}
                        />
                    ))}
                </>
            );

        case "image-based":
            return (
                <div className="grid grid-cols-2 gap-4">
                    {options.map((option) => (
                        <ImagePollResult
                            key={option._id}
                            imgURL={option.optionText || ""}
                            optionVotes={option.votes}
                            totalVotes={voters}
                        />
                    ))}
                </div>
            );

        default:
            return <p className="text-red-500 ml-3">Invalid poll type.</p>;
    }
};

export default PollingResultContent;
