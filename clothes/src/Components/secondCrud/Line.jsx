function Line({ order }) {
  // const doRating = () => {
  //   setRateData({
  //     id: movie[1][0].id,
  //     rate,
  //   });
  //   setRate(5);
  // };

  return (
    <li className="list-group-item">
      <div className="admin_orders_home">
        <div className="d-flex flex-row gap-5 flex-wrap ">
          <div>
            <div className="width-200">{order.title}</div>
            {order.image ? (
              <img
                className="width-200"
                src={order.image}
                alt={order.title}
              ></img>
            ) : (
              <span className="no-image">No image</span>
            )}
          </div>
          <div>
            <div>Color: {order.color} </div>
            <div>Size: {order.size} </div>
            <div>Price: {order.price} Eur </div>
            <div>OrderId: {order.id}</div>
            <div
              style={{ color: order.order_state === 1 ? "green" : "crimson" }}
            >
              Order status:{" "}
              {order.order_state === 0 ? "Unapproved" : "Approved"}
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
