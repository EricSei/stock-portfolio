import React from 'react';

const Home = () => {
  return (
    <div className='container'>
      <h1>Welcome From Stock Porfolio </h1>
      <hr></hr>
      <p>
        Simple Stock App is stock portfolio application by which you can buy stock throught 
        stock tickers and store all the purchased transactions.
        <br></br>
        <b> 
          Common Stock Tickers <br></br>
          Facebook: fb <br></br>
          Google: googl <br></br>
        </b>
      </p>
      <hr></hr>
      <p>If you are new user, please Sign Up to use the app.</p>
      <p>Or, you can use this Dummy account just to play around. </p>
      <b> user name: james@gmail.com </b> <br></br>
      <b> password : james123 </b>
    </div>
  );
};

export default Home;
