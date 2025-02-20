/*
import React, {useState} from "react";
import {HiMiniStar} from "react-icons/hi2";

const Rating = ({ maxStars = 5, value=0, onChange, readOnly = false }) => {

    const [hoverValue, setHoverValue] = useState(0);

    const handleClick = (rating) => {
        if (!readOnly && onChange) {
            onChange(rating);
        }
    };

    const handleMouseEnter = (rating) => {
        if (!readOnly) {
            setHoverValue(rating);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverValue(0);
        }
    };

    return (
        <div className={`flex gap-2 ${readOnly ? "cursor-default" : "cursor-pointer"}`}>
            {[...Array(maxStars)].map((_, index)) => {
                const startValue = index + 1;
                return (
                <span className={`text-3xl transition-colors ${
                startValue <= (hoverValue || value) ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => handleClick(startValue)}
            onMouseEnter={() => handleMouseEnter(startValue)}
            onMouseLeave={handleMouseLeave}
        >
            <HiMiniStar/>
        </span>
    );
})}
        </div>
    );
};

export default Rating*/

import React, { useState } from "react";
import { HiMiniStar } from "react-icons/hi2";

const Rating = ({ maxStars = 5, value = 0, onChange, readOnly = false }) => {
    const [hoverValue, setHoverValue] = useState(0);

    const handleClick = (rating) => {
        if (!readOnly && onChange) {
            onChange(rating);
        }
    };

    const handleMouseEnter = (rating) => {
        if (!readOnly) {
            setHoverValue(rating);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverValue(0);
        }
    };

    return (
        <div className={`flex gap-2 ${readOnly ? "cursor-default" : "cursor-pointer"}`}>
            {[...Array(maxStars)].map((_, index) => {  // <-- Fixed here
                const starValue = index + 1;
                return (
                    <span
                        key={starValue} // <-- Added key for performance optimization
                        className={`text-3xl transition-colors ${
                            starValue <= (hoverValue || value) ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <HiMiniStar />
                    </span>
                );
            })}
        </div>
    );
};

export default Rating;
