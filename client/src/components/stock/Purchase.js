import React, { useState } from "react";
import axios from "axios";
import alphavantage from "../../api/alphavantage";
import SearchStock from "./SearchStock";

const Purchase = ({ token, balance, setBalance, fetchOwned, setOwned }) => {
  const [form, setForm] = useState({
    ticker: "",
    action: "BUY",
    cost: 0,
    shares: 0,
  });

  const { shares } = form;

  const [error, setError] = useState(null);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buyStock = async (ticker) => {
    try {
      const response = await alphavantage.get("/query", {
        params: {
          function: "TIME_SERIES_INTRADAY",
          symbol: ticker.toUpperCase(),
          interval: "5min",
          outputsize: "compact",
          apikey: `${process.env.STOCK_API_KEY}`,
        },
      });

      const data = response.data["Time Series (5min)"];

      const cost = Object.values(data)[0]["4. close"];

      if (cost * shares > balance) {
        setError("Insefficient Funds.");
        return;
      }

      axios.post(
        "/api/transactions/create",
        { ...form, cost },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setBalance(balance - shares * cost);
      fetchOwned(token);
    } catch (e) {
      if (e) setError("Invalid Ticker");
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const res = await axios.post(
    //   'http://localhost:8000/api/transactions/create',
    //   form
    // );
    buyStock(form.ticker);
  };

  return (
    <div className="container grid-2">
      <div className="">
        <SearchStock />
      </div>
      <div className="">
        <form onSubmit={onSubmit}>
          {error ? <div>{error}</div> : null}
          <input
            type="text"
            name="ticker"
            placeholder="Type Ticker"
            onChange={onChange}
          />
          <input
            type="number"
            name="shares"
            placeholder="Type Quantity"
            onChange={onChange}
          />
          <br></br>
          <input type="submit" value="Buy" className="btn btn-lg btn-success" />
        </form>
      </div>
    </div>
  );
};

export default Purchase;
