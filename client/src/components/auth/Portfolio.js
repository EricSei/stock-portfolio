import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import TransactionList from './TransactionList';
import Cash from './Cash';

const Portfolio = ({ token }) => {
  const [balance, setBalance] = useState(0);
  const [owned, setOwned] = useState([]);

  useEffect(() => {
    if (token) {
      fetchBlance(token);
      fetchOwned(token);
    }
  }, [token]);

  const fetchBlance = async token => {
    const response = await axios.get(
      'http://localhost:8000/api/users/balance',
      {
        headers: {
          'x-auth-token': token
        }
      }
    );
    setBalance(response.data);
  };

  const fetchOwned = async token => {
    const response = await axios.get('http://localhost:8000/api/users/owned', {
      headers: {
        'x-auth-token': token
      }
    });

    setOwned(Object.values(response.data));
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <h1>Portfolio</h1>
          <TransactionList owned={owned} />
        </div>
        <div className='col-6'>
          <h1>Cash- ${balance}</h1>
          <Cash token={token} balance={balance} setBalance />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
