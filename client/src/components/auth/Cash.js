import React, { useState, useEffect } from 'react';
import axios from 'axios';
import alphavantage from '../../api/alphavantage';

const Cash = ({ token, balance, setBalance, fetchOwned, setOwned }) => {
  
  const [form, setForm] = useState({
    ticker: '',
    action: 'BUY',
    cost: 0,
    shares: 0
  });

  const { ticker, shares } = form;

  const [error, setError] = useState(null);

  

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buyStock = async ticker => {
    try {
      const response = await alphavantage.get('/query', {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol: ticker.toUpperCase(),
          interval: '5min',
          outputsize: 'compact',
          apikey: 'NNQ0O9QYKCR2M9MF'
        }
      });

      const data = response.data['Time Series (5min)'];

      const cost = Object.values(data)[0]['4. close'];

      if (cost * shares > balance) {
        setError("Insefficient Funds.");
        return;
      }

      axios.post(
        '/api/transactions/create',
        { ...form, cost },
        {
          headers: {
            'x-auth-token': token
          }
        }
      );

      setBalance(balance - shares * cost);
      fetchOwned(token);
    } catch (e) {
      if (e) setError('Invalid Ticker');
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    // const res = await axios.post(
    //   'http://localhost:8000/api/transactions/create',
    //   form
    // );
    buyStock(form.ticker);
  };

  return (
    <form onSubmit={onSubmit}>
      {error ? <div>{error}</div> : null}
      <input
        type='text'
        name='ticker'
        placeholder='Type Ticker'
        onChange={onChange}
      />
      <input
        type='number'
        name='shares'
        placeholder='Type Quantity'
        onChange={onChange}
      />
      <br></br>
      <input type='submit' value='Buy' className='btn btn-lg btn-primary' />
    </form>
  );
};

export default Cash;
