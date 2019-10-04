import React from 'react';

const TransactionItem = ({ item }) => {
  const { action, ticker, owned, cost } = item;
  return (
    <div>
      {action} {ticker} {owned} {cost}
    </div>
  );
};

export default TransactionItem;
