import AdminOrders from "../../Contexts/AdminOrders";
import { useContext } from "react";

function Line({ order }) {
  // const doRating = () => {
  //   setRateData({
  //     id: movie[1][0].id,
  //     rate,
  //   });
  //   setRate(5);
  // };

  const { setEditData, setDeleteData } = useContext(AdminOrders);

  const changeStatus = () => {
    setEditData({
      order_state: !order.order_state,
      id: order.id,
    });
  };

  return (
    <li className="list-group-item">
      <div>
        <div className="d-flex flex-column flex-md-row  justify-content-between align-items-md-center gap-3 flex-wrap">
          <div>
            <div>{order.title}</div>
            {order.image ? (
              <div>
                <img
                  className="width-200"
                  src={order.image}
                  alt={order.title}
                ></img>
              </div>
            ) : (
              <span className="no-image">No image</span>
            )}
          </div>
          <div>
            <div>Color: {order.color} </div>
            <div>Size: {order.size} </div>
            <div>Price: {order.price} Eur </div>
            <div>OrderId: {order.id}</div>
            <div>Purchaser: {order.name}</div>
            <div
              style={{ color: order.order_state === 1 ? "green" : "crimson" }}
            >
              Order status:{" "}
              {order.order_state === 0 ? "Unapproved" : "Approved"}
            </div>
            <div className="d-flex flex-row gap-2">
              <button
                onClick={changeStatus}
                type="button"
                style={{
                  color: order.order_state === 1 ? "crimson" : "green",
                  borderColor: order.order_state === 1 ? "crimson" : "green",
                }}
                className="btn btn-outline-success admin_orders_button"
              >
                {order.order_state === 0 ? "Approve" : "Disapprove"}
              </button>
              <button
                onClick={() => setDeleteData(order)}
                type="button"
                className="btn btn-outline-danger "
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* <div className="home__content__rating">
            <h2>{movie[1][0].rating ?? "no rating"}</h2>
            <select value={rate} onChange={(e) => setRate(e.target.value)}>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={doRating}
              type="button"
              className="btn btn-outline-success m-3"
            >
              Rate
            </button>
          </div> */}
      </div>
      {/* <div className="comments">
        <ul className="list-group">
          {movie[1]?.map((c) =>
            c.cid !== null ? (
              <li key={c.cid} className="list-group-item">
                <p>{c.post}</p>
              </li>
            ) : null
          )}
        </ul>

        <div className="mb-3">
          <label className="form-label">Add comment</label>
          <textarea
            className="form-control"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></textarea>
        </div>
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div> */}
    </li>
  );
}

export default Line;
