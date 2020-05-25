import React, { useState, useEffect } from 'react';

import TransactionItem from './TransactionItem';

const TransactionList = ({ owned }) => {
  const [myOwned, setMyOwned] = useState([]);

  useEffect(() => {
    setMyOwned(owned);
  }, [owned]);

  return (
    <div className="container">
      <div className="lead text-center">
        Stock Porfolio
      </div>
      <table className="transaction">
      <tr >
          <th className="table th">Ticker</th>
          <th className="table th">Share</th>
          <th className="table th">Worth</th>
      </tr>
        {myOwned.map(item => {
            return(
              <tr>
                  <TransactionItem item={item} />
              </tr>
            ) 
        })}
      </table>
    </div>
  );
};

export default TransactionList;
