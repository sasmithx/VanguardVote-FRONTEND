import React from "react";

const PollActions = ({
                         isVoteComplete,
                         inputCaptured,
                         onVoteSubmit,
                         isBookmarked,
                         toggleBookmark,
                         isMyPoll,
                         pollClosed,
                         onClosePoll,
                         onDelete
                     }) => {
    return (
        <div>
            {(isVoteComplete || pollClosed) && (
                <div className="">
                    {pollClosed ? "Closed" : "Voted"}
                </div>
            )}
        </div>
    );
}
export default PollActions;