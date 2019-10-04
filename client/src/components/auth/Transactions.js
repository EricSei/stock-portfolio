import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = ({ token }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await axios.get(
      'http://localhost:8000/api/transactions/all',
      {
        headers: {
          'x-auth-token': token
        }
      }
    );
    setTransactions(Object.values(response.data));
    console.log(transactions);
  };

  return (
    <div>
      {transactions.map(item => {
        return (
          <div>
            {item.action} {item.ticker}-{item.shares} shares@ {item.cost}
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
