import React from "react";

const UserDetailsCard = ({
                             profileImageUrl,
                             fullName,
                             username,
                             totalPollsVotes,
                             totalPollsCreated,
                             totalPollsBookmarked,
                         }) => {
    return <div className="bg-slate-100/50 rounded-lg mt-16 overflow-hidden">
        <div className="">
            <div className="">
                <img
                    src={profileImageUrl || ""}
                    alt="Profile Image"
                    className="w-20 h-20 bg-slate-400 rounded-full"
                   />
            </div>
            </div>
        <div className="mt-12 px-5">
            <div className="text-center pt-1">
                <h5 className="text-lg text-gray-950 font-medium leading-6">
                    {fullName}
                </h5>
                <span className="text-[13px] font-medium text-slate-700/60">
                    @{username}
                </span>
            </div>

            <div className="">

            </div>
        </div>
    </div>;
};

export default UserDetailsCard;