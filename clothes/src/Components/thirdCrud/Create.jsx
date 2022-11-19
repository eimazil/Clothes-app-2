import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import Clothes from "../../Contexts/Clothes";
import getBase64 from "../../Functions/getBase64";
import types from "../../data/types";

function Create() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(0);
  const [price, setPrice] = useState("");
  const fileInput = useRef();

  const { setCreateData } = useContext(Clothes);
  const { makeMsg } = useContext(DataContext);

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    if (title.length === 0) {
      makeMsg("Add tittle", "error");
      return;
    }
    if (title.length > 50) {
      makeMsg("Tittle is too long", "error");
      return;
    }
    if (type === null) {
      makeMsg("Choose apparel season", "error");
      return;
    }
    if (price.length === 0) {
      makeMsg("Add the price");
      return;
    }
    setCreateData({
      title,
      type,
      price: parseFloat(price),
      image: photoPrint,
    });
    setTitle("");
    setPrice("");
    setType("");
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Apparel</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Apparel title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Choose season</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>
            {types.map((t) => (
              <option key={t.id} value={t.t}>
                {t.t}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Apparel Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apparel Image</label>
          <input
            ref={fileInput}
            type="file"
            className="form-control"
            onChange={doPhoto}
          />
        </div>
        {photoPrint ? (
          <div className="img-bin">
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
