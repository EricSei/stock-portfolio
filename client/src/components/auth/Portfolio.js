import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import TransactionList from './TransactionList';
import Cash from './Cash';

const Portfolio = ({ token }) => {
  
  const [balance, setBalance] = useState(0);
  const [owned, setOwned] = useState([]);
  const [name, setName] = useState([]);


  useEffect(() => {
    if (token) {
      fetchBlance(token);
      fetchOwned(token);
      fetchName(token);
    }
  }, [token, balance]);

  const fetchBlance = async token => {
    const response = await axios.get(
      '/api/users/balance',
      {
        headers: {
          'x-auth-token': token
        }
      }
    );
    setBalance(response.data);
  };

  const fetchOwned = async token => {
    const response = await axios.get('/api/users/owned', {
      headers: {
        'x-auth-token': token
      }
    });

    setOwned(Object.values(response.data));
  };

  const fetchName = async token => {
    const response = await axios.get('/api/users/user', {
      headers: {
        'x-auth-token': token
      }
    });

    setName(Object.values(response.data));
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
        <h2>
            Portfolio 
             <span> <i> {name} </i>  </span>
        </h2>
          <TransactionList owned={owned} />
        </div>
        <div className='col-6'>
          <h2>Cash- ${balance}</h2>
          <Cash
            token={token}
            balance={balance}
            setBalance={setBalance}
            fetchOwned={fetchOwned}
            setOwned={setOwned}
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
