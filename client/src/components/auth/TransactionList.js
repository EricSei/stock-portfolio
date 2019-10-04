import React from 'react';

import TransactionItem from './TransactionItem';

const data = [
  {
    action: 'BUY',
    ticker: 'AAPL',
    owned: 10,
    cost: 1000
  },
  {
    action: 'BUY',
    ticker: 'FB',
    owned: 2,
    cost: 100
  }
];

const TransactionList = () => {
  return (
    <div>
      {data.map(item => {
        return <TransactionItem item={item} />;
      })}
    </div>
  );
};

export default TransactionList;
