import { useContext, useEffect, useState, useRef } from "react";
import Clothes from "../../Contexts/Clothes";
import getBase64 from "../../Functions/getBase64";
import types from "../../data/types";
import DataContext from "../../Contexts/DataContext";

function Edit() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const { setEditData, modalData, setModalData } = useContext(Clothes);
  const { makeMsg } = useContext(DataContext);

  const edit = () => {
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

    setEditData({
      title,
      type,
      price: parseFloat(price),
      id: modalData.id,
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint,
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setTitle(modalData.title);
    setPrice(modalData.price);
    setType(modalData.type);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData]);

  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Clothe</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="card m-4">
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
                <label className="form-label">Sort By</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
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
                  <label htmlFor="image-delete">X</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
              <button
                onClick={edit}
                type="button"
                className="btn btn-outline-success"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
