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
    <div className="container">
      <div className="lead text-center">
        Transactions History
      </div>
      <table className="transaction ">
        <tr >
          <th className="table th">Action</th>
          <th className="table th">Ticker</th>
          <th className="table th">Share</th>
          <th className="table th">Cost</th>
          <th className="table th">Date</th>
        </tr>
        {transactions.map(item => {
          return (
            <tr>
              <td  className="table td">
                {item.action}
              </td>
              <td  className="table td">
                {item.ticker}
              </td>
              <td  className="table td">
                {item.shares}
              </td>
              <td  className="table td">
                  ${item.cost}
              </td>
              <td  className="table td">
                {item.date}
              </td>
            </tr>
          );
        })}
        
      </table>
    </div>
  );
};

export default Transactions;
