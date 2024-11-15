import React from "react";
import './rank.css';

const Rank = ({ name, entries }) => {
    return(
        <div className="rank">
            <div className="div1 f3">
                {`${name}, your current rank is ...`}
            </div>
            <div className="div1 f3">
               {entries}
            </div>
            <br />
        </div>
    )
}

export default Rank;