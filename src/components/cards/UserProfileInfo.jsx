import React from "react";
import CharAvatar from "./CharAvatar.jsx";
import moment from "moment";

const UserProfileInfo = ({imgURL, fullname, username, createdAt}) => {
    return (
        <div className="flex items-center gap-4">
            {imgURL ? (
                <img src={imgURL} alt="" className="w-10 h-10 rounded-full border-none" />
            ) : (
                <CharAvatar fullName={fullname} style='text-[13px]' />
            )}

            <div>
                <p className="text-sm text-black font-medium leading-4">
                    { fullname } <span className="mx-1 text-sm text-slate-500">.</span>
                    <span className="text-[10px] text-slate-500">
                        {" "}
                        {createdAt && moment(createdAt).fromNow()}
                    </span>
                </p>
                <span className="text-[11.5px] text-slate-500 leading-4">
                    @{username}
                </span>
            </div>
        </div>
    );
}

export default UserProfileInfo;