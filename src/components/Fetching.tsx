import React from "react";
import Loading_icon from "../Loading_icon.gif";
interface props {}

const Fetching: React.FC<props> = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <img className=" " src={Loading_icon} alt="Loading" />
            </div>
            <div className="mt-5 text-3xl font-medium"> Fetching a girl for you</div>
        </div>
    );
};

Fetching.defaultProps = {};

export default React.memo(Fetching);