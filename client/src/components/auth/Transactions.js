import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TokenContext from '../../context/TokenContext';

const Transactions = ({token}) => {

  const [transactions, setTransactions] = useState([]);
  //const { token } = useContext(TokenContext);

  useEffect(() => {
    fetchTransactions();
  }, [token]);


  const fetchTransactions = async () => {
    const response = await axios.get(
      '/api/transactions/all',
      {
        headers: {
          'x-auth-token': token
        }
      }
    );
    setTransactions(Object.values(response.data));
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
