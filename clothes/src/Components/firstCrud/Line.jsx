import { useContext } from "react";
import Home from "../../Contexts/Home";
import colors from "../../data/colors";
import sizes from "../../data/sizes";

import { useState } from "react";

function Line({ clothe }) {
  const { setOrderData } = useContext(Home);

  const [post, setPost] = useState("");
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  const purchase = () => {
    setOrderData({
      garment_id: clothe.id,
      user_id: localStorage.getItem("id"),
      title: clothe.title,
      color,
      size,
      price: clothe.price,
      comment: post,
      image: clothe.image,
    });
    setColor(0);
    setSize(0);
    setPost("");
  };

  return (
    <li className="list-group-item">
      <div className="home">
        <div className="home__content">
          <div className="home__content__info">
            <div>
              <h2>{clothe.title}</h2>
              {clothe.image ? (
                <div className="img-bin-home">
                  <img src={clothe.image} alt={clothe.title}></img>
                </div>
              ) : (
                <span className="red-image">No image</span>
              )}
            </div>
            <div className="home__content__info_text">
              <div className="home__content__info_text_line">
                {clothe.type} season
              </div>
              <div className="home__content__info_text_line">
                {clothe.price} Eur
              </div>
            </div>
          </div>

          <div className="purchase-information">
            <div className="home_purchase_color">
              <label className="form-label">Choose color</label>
              <select
                className="form-select"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value={0} disabled>
                  Choose from list
                </option>
                {colors.map((c) => (
                  <option key={c.id} value={c.c}>
                    {c.c}
                  </option>
                ))}
              </select>
            </div>
            <div className="home_purchase_size">
              <label className="form-label">Choose size</label>
              <select
                className="form-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value={0} disabled>
                  Choose from list
                </option>
                {sizes.map((s) => (
                  <option key={s.id} value={s.s}>
                    {s.s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Add comment</label>
              <textarea
                className="form-control"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={purchase}
              type="button"
              className="btn btn-outline-success"
            >
              Purchase
            </button>
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
