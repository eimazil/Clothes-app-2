import { useContext } from "react";
import Clothes from "../../Contexts/Clothes";
import Line from "./Line";

function List() {
  const { clothes } = useContext(Clothes);

  return (
    <div className="card m-4">
      <h5 className="card-header">Clothes List</h5>
      <div className="card-body">
        <ul className="list-group">
          {clothes?.map((c) => (
            <Line key={c.id} clothe={c} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default List;
