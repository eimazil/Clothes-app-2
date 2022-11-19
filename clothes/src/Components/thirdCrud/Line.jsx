import { useContext } from "react";
import Clothes from "../../Contexts/Clothes";

function Line({ clothe }) {
  const { setDeleteData, setModalData } = useContext(Clothes);

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            {clothe.image ? (
              <div className="img-bin">
                <img src={clothe.image} alt={clothe.title}></img>
              </div>
            ) : (
              <span className="red-image">No image</span>
            )}
          </div>
          <div className="line__content__title">{clothe.title}</div>
          <div className="line__content__info">{clothe.type} season</div>
          <div className="line__content__info">{clothe.price} Eur</div>
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
    </li>
  );
}

export default Line;
