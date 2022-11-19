import { useState, useEffect, useContext } from "react";
import UserOrders from "../../Contexts/UserOders";
import Line from "./Line";

function List() {
  const { orders } = useContext(UserOrders);
  const [stats, setStats] = useState({ clothesCount: null });

  useEffect(() => {
    if (null === orders) {
      return;
    }
    setStats((s) => ({ ...s, clothesCount: orders.length }));
  }, [orders]);

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Clothes List ({stats.clothesCount})</h5>
        <div className="card-body">
          <ul className="list-group">
            {orders?.map((o) => (
              <Line key={o.id} order={o} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default List;
