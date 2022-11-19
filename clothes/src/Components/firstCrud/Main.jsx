import Home from "../../Contexts/Home";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [clothes, setClothes] = useState(null);
  const [orderData, setOrderData] = useState(null);

  // READ for list
  useEffect(() => {
    axios
      .get("http://localhost:3003/home/clothes", authConfig())
      .then((res) => {
        setClothes(res.data.map((b, i) => ({ ...b, show: true, row: i })));
      });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === orderData) {
      return;
    }
    axios
      .post("http://localhost:3003/home/orders/", orderData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [orderData]);

  return (
    <Home.Provider
      value={{
        clothes,
        setOrderData,
        setClothes,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </Home.Provider>
  );
}

export default Main;
