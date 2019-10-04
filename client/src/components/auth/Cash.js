import React, { useState } from 'react';
import axios from 'axios';

const Cash = () => {
  const [form, setForm] = useState({
    ticker: '',
    action: 'BUY',
    cost: 0,
    shares: 0
  });
  const { ticker, shares } = form;
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const res = await axios.post(
      'http://localhost:8000/api/transactions/create',
      form
    );
  };

  return (
    <form onSubmit={onSubmit}>
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
      <input
        type='number'
        name='cost'
        placeholder='Type Cost'
        onChange={onChange}
      />
      <br></br>
      <input type='submit' value='Buy' className='btn btn-lg btn-primary' />
    </form>
  );
};

export default Cash;
