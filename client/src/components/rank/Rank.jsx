import React from "react";
import './rank.css';

const Rank = () => {
    return(
        <div>
            <div className="white f3">
                {'{username}, your current rank is ...'}
            </div>
            <div className="white f3">
                {'#{rank}'}
            </div>
        </div>
    )
}

export default Rank;