import React from "react";

import UI_ELEMENT from "../../assets/images/ui-element.png";
import CARD_1 from "../../assets/images/auth-card-1.png";
import CARD_2 from "../../assets/images/auth-card-2.png";
import CARD_3 from "../../assets/images/auth-card-3.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen px-12 pt-8 pb-12 md:w-1/2">
        <h2 className="text-lg font-medium text-black">Vanguard Vote</h2>

        {children}
      </div>

      <div className="relative hidden w-1/2 h-screen overflow-hidden bg-center bg-no-repeat bg-cover md:block bg-sky-50 bg-auth-bg-img">
        <img src={UI_ELEMENT} className="w-[50%] absolute right-0 top-10" />
        <img src={UI_ELEMENT} className="w-[55%] rotate-180 absolute left-0 -bottom-[20%]" />

        <img src={CARD_1} className="absolute w-64 lg:w-72 top-[8%] left-[10%] shadow-lg shadow-blue-400/15" />
        <img src={CARD_2} className="absolute w-64 lg:w-72 top-[34%] left-[54%] shadow-lg shadow-blue-400/15" />
        <img src={CARD_3} className="absolute w-64 lg:w-72 top-[70%] left-[10%] shadow-lg shadow-blue-400/15" />
      </div>
    </div>
  );
};

export default AuthLayout;
