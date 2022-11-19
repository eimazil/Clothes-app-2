import AdminOrders from "../../Contexts/AdminOrders";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [orders, setOrders] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  // const reList = (data) => {
  //   const d = new Map();
  //   data.forEach((line) => {
  //     if (d.has(line.title)) {
  //       d.set(line.title, [...d.get(line.title), line]);
  //     } else {
  //       d.set(line.title, [line]);
  //     }
  //   });
  //   return [...d];
  // };

  // READ for list
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/orders", authConfig())
      .then((res) => {
        setOrders(res.data);
      });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/admin/orders/" + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/admin/orders/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <AdminOrders.Provider
      value={{
        orders,
        setEditData,
        setDeleteData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </AdminOrders.Provider>
  );
}

export default Main;
