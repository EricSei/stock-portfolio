import React, { useState, useEffect } from 'react';

import TransactionItem from './TransactionItem';

const TransactionList = ({ owned }) => {
  const [myOwned, setMyOwned] = useState([]);

  useEffect(() => {
    setMyOwned(owned);
  }, [owned]);

  return (
    <div>
      {myOwned.map(item => {
        return <TransactionItem item={item} />;
      })}
    </div>
  );
};

export default TransactionList;
