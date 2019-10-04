import React from 'react';

const TransactionItem = ({ item }) => {
  return (
    <div>
      {item.ticker} - {item.shares} ${item.worth}
    </div>
  );
};

export default TransactionItem;
