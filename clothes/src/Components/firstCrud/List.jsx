import { useState, useEffect, useContext } from "react";
import Home from "../../Contexts/Home";
import Line from "./Line";
import types from "../../data/types";

const sortData = [
  { v: "default", t: "Default" },
  { v: "price_asc", t: "Price 1-9" },
  { v: "price_desc", t: "Price 9-1" },
];

function List() {
  const { clothes, setClothes } = useContext(Home);

  const [sortBy, setSortBy] = useState("default");
  const [stats, setStats] = useState({ clothesCount: null });
  const [type, setType] = useState("0");

  console.log(type);

  useEffect(() => {
    if (null === clothes) {
      return;
    }
    setStats((s) => ({ ...s, clothesCount: clothes.length }));
  }, [clothes]);

  useEffect(() => {
    if (type === "0") {
      setClothes((c) => c?.map((clothe) => ({ ...clothe, show: true })));
    } else {
      setClothes((c) =>
        c?.map((clothe) =>
          type === clothe.type
            ? { ...clothe, show: true }
            : { ...clothe, show: false }
        )
      );
    }
  }, [type, setClothes]);

  useEffect(() => {
    switch (sortBy) {
      case "price_asc":
        setClothes((m) => [...m].sort((a, b) => a.price - b.price));
        break;
      case "price_desc":
        setClothes((m) => [...m].sort((b, a) => a.price - b.price));
        break;
      default:
        setClothes((m) => [...(m ?? [])].sort((a, b) => a.row - b.row));
    }
  }, [sortBy, setClothes]);

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Sort</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortData.map((c) => (
                <option key={c.v} value={c.v}>
                  {c.t}
                </option>
              ))}
            </select>
            <label className="form-label">Filter By</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value={0}>Show all</option>
              {types.map((t) => (
                <option key={t.id} value={t.t}>
                  {t.t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Clothes List ({stats.clothesCount})</h5>
        <div className="card-body">
          <ul className="list-group">
            {clothes?.map((c) =>
              c.show ? <Line key={c.id} clothe={c} /> : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default List;
