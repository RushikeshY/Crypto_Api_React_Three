import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import Coin from "./Coin";
import ReactPaginate from "react-paginate";
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=250&page=1&sparkline=false
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        console.log(res.data);
        setCoins(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handlechange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const [pageNo, setPageNo] = useState(0);
  const UserPerPage = 10;
  const pageVisited = UserPerPage * pageNo;
  const displayUsers = filteredCoins
    .slice(pageVisited, pageVisited + UserPerPage)
    .map((coin) => {
      return (
        <Coin
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
        />
      );
    });

  const pageCount = Math.ceil(filteredCoins.length / UserPerPage);

  const ChangePage = ({ selected }) => {
    setPageNo(selected);
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form action="">
          <input
            onChange={handlechange}
            type="text"
            placeholder="search"
            className="coin-input"
          />
        </form>
      </div>
      <div className="coin-div">
        {displayUsers}
        <div id="page">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={ChangePage}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"prevousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"PaginationActive"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
