// import { useState } from "react";
// import { useEffect } from "react";
import { useContext } from "react";
import AdminOrders from "../../Contexts/AdminOrders";
import Line from "./Line";

// const sortData = [
//   { v: "default", t: "Default" },
//   { v: "price_asc", t: "Price 1-9" },
//   { v: "price_desc", t: "Price 9-1" },
//   { v: "rate_asc", t: "Rating 1-9" },
//   { v: "rate_desc", t: "Rating 9-1" },
// ];

function List() {
  const { orders } = useContext(AdminOrders);

  // const [sortBy, setSortBy] = useState("default");
  // const [stats, setStats] = useState({ clothesCount: null });

  // useEffect(() => {
  //   if (null === clothes) {
  //     return;
  //   }
  //   setStats((s) => ({ ...s, movieCount: clothes.length }));
  // }, [clothes]);

  //   useEffect(() => {
  //     switch (sortBy) {
  //       case "price_asc":
  //         setMovies((m) => [...m].sort((a, b) => a[1][0].price - b[1][0].price));
  //         break;
  //       case "price_desc":
  //         setMovies((m) => [...m].sort((b, a) => a[1][0].price - b[1][0].price));
  //         break;
  //       case "rate_asc":
  //         setMovies((m) =>
  //           [...m].sort((x, c) => x[1][0].rating - c[1][0].rating)
  //         );
  //         break;
  //       case "rate_desc":
  //         setMovies((m) =>
  //           [...m].sort((jo, no) => no[1][0].rating - jo[1][0].rating)
  //         );
  //         break;
  //       default:
  //         setMovies((m) =>
  //           [...(m ?? [])].sort((a, b) => a[1][0].row - b[1][0].row)
  //         );
  //     }
  //   }, [sortBy, setMovies]);

  return (
    <>
      {/* <div className="card m-4">
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
          </div>
        </div>
      </div> */}
      <div className="card m-4">
        {/* <h5 className="card-header">Clothes List ({stats.clothesCount})</h5> */}
        <div className="card-body">
          <ul className="list-group">
            {orders?.map((o) => (
              <Line key={o.id} order={o} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default List;
