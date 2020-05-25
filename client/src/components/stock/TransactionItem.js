import React, { Fragment } from 'react';

const TransactionItem = ({ item }) => {
  return (
    <Fragment>
      <td>
      {item.ticker}
    </td>
    <td>
      {item.shares}
    </td>
    <td>
      ${item.worth}
    </td>
    </Fragment>
  );
};

export default TransactionItem;
