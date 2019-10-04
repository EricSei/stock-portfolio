import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TransactionList from './TransactionList';
import Cash from './Cash';

const Portfolio = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <h1>Portfolio</h1>
          <TransactionList />
        </div>
        <div className='col-6'>
          <h1>Cash</h1>
          <Cash />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
