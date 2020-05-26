import React, { useState, useEffect, Fragment } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

const Charts = ({owned}) => {

  const [chartData, setChartData] = useState({});
 
  const [myOwned, setMyOwned] = useState([]);

  const [typeChart, setTypeChart ] = useState('bar');

  useEffect(() => {
    setMyOwned(owned);
    chart();
    // eslint-disable-next-line
  }, [owned, typeChart ]);

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

const lineChart = (
  <Fragment>
    <Line
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Line", display: true, fontSize: 25 },
          legend:{
            display: true,
            position: 'right'
          }
        }}
    />
  </Fragment>)

  const onHandleClick = (e) =>{
    if(e.target.name == 'bar'){
      setTypeChart('bar');
    }
    if(e.target.name == 'pie'){
      setTypeChart('pie');
    }
    if(e.target.name == 'line'){
      setTypeChart('line');
    }
    return 'bar';
  }

  const renderSwitch = (param) => {
    switch(param) {
      case 'bar':
        return barChart;
      case 'pie':
          return pieChart;
      case 'line':
            return lineChart;
      default:
        return barChart;
    }
  }

  return (
      <div>
        <div>
        </div>
        <div>
          <input type='button' value='Bar' name='bar' className='btn btn-success' onClick={onHandleClick}></input>
          <input type='button' value='pie' name='pie' className='btn btn-success' onClick={onHandleClick}></input>
          <input type='button' value='line' name='line' className='btn btn-success' onClick={onHandleClick}></input>
          {
            renderSwitch(typeChart)
          }
        </div>
      </div>
  );
};

export default Charts;