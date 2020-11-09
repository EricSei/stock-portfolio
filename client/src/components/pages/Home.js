import React from 'react';

const Home = () => {
  return (
    <div className='container text-center'>
      <div>
        <h1 className='text-center large'>Welcome to Stock Portfolio </h1>
        <p className=' text-success'>
          <i>Buy stock throught company tickers, view all purchased transactions and much more...</i>
        </p>
      <hr></hr>
      </div>
      <div>
        <ul className='lead text-danger text-left' style={{margin: "5%" }} >
          <li className='title'> <i class="fas fa-coins"></i> <u>Features</u>  </li>
          <li> <i class="fas fa-user-circle"></i> Stock Portfolio <icon></icon> </li>
          <li> <i class="fas fa-shopping-basket"></i> Buy Stock <icon></icon> </li>
          <li> <i class="fas fa-chart-pie"></i> Value Portfolio Charts</li>
          <li> <i class="fas fa-search-dollar"></i> Search Suggested Company Ticker </li>
        </ul>
      </div>
      <hr></hr>
      <p>New User ? Please Sign Up to use the app.</p>
      <p>Or, you can use this Dummy account just to play around. </p>
      <b> user name: james@gmail.com </b> <br></br>
      <b> password : james123 </b>
    </div>
  );
};

export default Home;
