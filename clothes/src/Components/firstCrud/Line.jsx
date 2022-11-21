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
          <div className="">
            <div className="width-200">
              <h2>{clothe.title}</h2>
              {clothe.image ? (
                <img
                  className="width-200"
                  src={clothe.image}
                  alt={clothe.title}
                ></img>
              ) : (
                <span className="no-image">No image</span>
              )}
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center gap-2">
            <div className="">{clothe.type} season</div>
            <div className="">{clothe.price} Eur</div>
          </div>
          <div className="">
            <div className="">
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
            <div className="">
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
      </div>
    </li>
  );
}

export default Line;
