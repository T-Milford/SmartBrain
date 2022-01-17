import React from 'react';
import '../SmartBrain/SmartBrain.css';

    const Rank = ({ name, entries }) => {
        return (
          <div>
            {`${name}, you have this many entries:`}
            <div className="white f1 ">{entries}</div>
          </div>
        );
    }
export default Rank;