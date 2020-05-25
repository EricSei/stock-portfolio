import React, { useState, useEffect, Fragment } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";

const Charts = ({owned}) => {

  const [chartData, setChartData] = useState({});
 
  const [myOwned, setMyOwned] = useState([]);

  useEffect(() => {
    setMyOwned(owned);
    chart();
  }, [owned]);

  const chart = () => {
    let tickers = [];
    let worth = [];
    
    myOwned.map(item => {
      tickers.push(item.ticker);
      worth.push(item.worth);
    })
   
    setChartData({
      labels: tickers,//array
      datasets: [
        {
          label: 'Stock',
          data: worth,//array come here
          backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
          ],
          borderWidth: 4
        }
      ]
    });    
  };

  const barChart = (
    <Fragment>
      <Bar
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Bar", display: true, fontSize: 25 },
              legend:{
                display: true,
                position: 'right'
              }
                
            }}
          />
    </Fragment>)

const pieChart = (
  <Fragment>
    <Pie
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Pie", display: true, fontSize: 25 },
            legend:{
              display: true,
              position: 'right'
            }
              
          }}
    />
  </Fragment>)

  return (
    <div className="container">
      <div>
        {barChart}
        {pieChart}
      </div>
    </div>
  );
};

export default Charts;