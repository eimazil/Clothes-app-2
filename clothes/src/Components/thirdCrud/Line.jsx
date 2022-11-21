import { useContext } from "react";
import Clothes from "../../Contexts/Clothes";

function Line({ clothe }) {
  const { setDeleteData, setModalData } = useContext(Clothes);

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content flex-column flex-md-row gap-sm-2 gap-md-5 align-items-start align-items-md-center">
          <div className="d-flex flex-column">
            <h5>{clothe.title}</h5>
            {clothe.image ? (
              <div className="img-bin">
                <img src={clothe.image} alt={clothe.title}></img>
              </div>
            ) : (
              <span className="no-image">No image</span>
            )}
          </div>
          <div className="d-flex flex-column">
            <span>{clothe.type} season</span>
            <span>{clothe.price} Eur</span>
          </div>
          <div className="line__buttons">
            <button
              onClick={() => setModalData(clothe)}
              type="button"
              className="btn btn-outline-success"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteData(clothe)}
              type="button"
              className="btn btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Line;
