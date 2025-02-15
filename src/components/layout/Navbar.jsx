import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu.jsx";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="flex gap-5 border-b border-white-100 bg-slate-50/50 backdrop-blur-[2px] p-4 sticky top-0 z-30">
            <button
                className="block lg:hidden text-black"
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
            </button>
            <h2 className="text-lg font-medium text-black">Vanguard Vote App</h2>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
