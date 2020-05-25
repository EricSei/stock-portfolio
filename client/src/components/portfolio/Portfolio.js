import React, { useState, useEffect } from 'react';
//import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import StockList from '../stock/StockList';
import Purchase from '../stock/Purchase';
import Charts from './Charts';

const Portfolio = ({ token }) => {
  
  const [balance, setBalance] = useState(0);
  const [owned, setOwned] = useState([]);
  const [name, setName] = useState([]);

  const [chartData, setChartData ] = useState({});

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
    <div className='container grid-2'>
      <div className='row'>
        <div className='col-10'>
          <StockList owned={owned} />
        </div>
      </div>
      <div className='col-10'>
        <Charts balance={balance} owned={owned} />
      </div>
    </div>
  );
};

export default Portfolio;
