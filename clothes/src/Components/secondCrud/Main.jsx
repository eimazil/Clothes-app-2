import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
import UserOrders from "../../Contexts/UserOders";

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [orders, setOrders] = useState(null);

  // READ for list
  useEffect(() => {
    axios.get("http://localhost:3003/userOrders", authConfig()).then((res) => {
      setOrders(
        res.data.filter((o) => o.user_id === Number(localStorage.getItem("id")))
      );
    });
  }, [lastUpdate]);

  return (
    <UserOrders.Provider
      value={{
        orders,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </UserOrders.Provider>
  );
}

export default Main;
