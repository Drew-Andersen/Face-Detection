import React from "react";
import './rank.css';

const Rank = () => {
    return(
        <div className="rank">
            <div className="div1 f3">
                {'{username}, your current rank is ...'}
            </div>
            <div className="div1 f3">
                {'#{rank}'}
            </div>
            <br />
        </div>
    )
}

export default Rank;