import React from "react";
import Loading_icon from "../Loading_icon.gif";
interface props {}

const Fetching: React.FC<props> = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <img className=" " src={Loading_icon} alt="Loading" />
            </div>
            <div className="mt-5 text-xl font-medium w-1/2"> Fetching a girl for you,,,,Dont use slangs like "u" for "you",use proper English  ,don't use other languages like hindi or german.</div>
        </div>
    );
};

Fetching.defaultProps = {};

export default React.memo(Fetching);
