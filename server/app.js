const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
const cors = require("cors");
app.use(cors());
const md5 = require("js-md5");
const uuid = require("uuid");
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clothes_database",
});

////////////////////LOGIN/////////////////

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf("/server")) {
    // admin
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 10) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    0 === req.url.indexOf("/login-check") ||
    0 === req.url.indexOf("/login") ||
    0 === req.url.indexOf("/register")
  ) {
    next();
  } else {
    // fron
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  }
};

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
  const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error", status: 1 }); // user not logged
    } else {
      if ("admin" === req.query.role) {
        if (result[0].role !== 10) {
          res.send({ msg: "error", status: 2 }); // not an admin
        } else {
          res.send({ msg: "ok", status: 3 }); // is admin
        }
      } else {
        res.send({ msg: "ok", status: 4 }); // is user
      }
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

app.get("/login/:session", (req, res) => {
  const sql = `
         SELECT id
         FROM users
         WHERE session = ?
    `;
  con.query(sql, [req.params.session], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/register", (req, res) => {
  const sql = `
    INSERT INTO users (name, psw)
    VALUES (?, ?)
  `;
  con.query(sql, [req.body.name, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////////////////END////////////////////

// Clothes CRUD
// CREATE
app.post("/server/clothes", (req, res) => {
  const sql = `
    INSERT INTO clothes (title, type, price, image)
    VALUES (?, ?, ?, ?)
    `;
  con.query(
    sql,
    [req.body.title, req.body.type, req.body.price, req.body.image],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});
// READ
app.get("/server/clothes", (req, res) => {
  const sql = `
    SELECT *
    FROM clothes
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// EDIT
app.put("/server/clothes/:id", (req, res) => {
  let sql;
  let r;
  if (req.body.deletePhoto) {
    sql = `
        UPDATE clothes
        SET title = ?, type = ?, price = ?, image = null
        WHERE id = ?
        `;
    r = [req.body.title, req.body.type, req.body.price, req.params.id];
  } else if (req.body.image) {
    sql = `
        UPDATE clothes
        SET title = ?, type = ?, price = ?, image = ?
        WHERE id = ?
        `;
    r = [
      req.body.title,
      req.body.type,
      req.body.price,
      req.body.image,
      req.params.id,
    ];
  } else {
    sql = `
        UPDATE movies
        SET title = ?, type = ?, price = ?
        WHERE id = ?
        `;
    r = [req.body.title, req.body.type, req.body.price, req.params.id];
  }
  con.query(sql, r, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Delete
app.delete("/server/clothes/:id", (req, res) => {
  const sql = `
    DELETE FROM clothes
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Home CRUD

app.get("/home/clothes", (req, res) => {
  const sql = `
    SELECT *
    FROM clothes
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/home/orders", (req, res) => {
  const sql = `
    INSERT INTO orders (color, title, size, price, comment, garment_id, user_id, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.color,
      req.body.title,
      req.body.size,
      req.body.price,
      req.body.comment,
      req.body.garment_id,
      req.body.user_id,
      req.body.image,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Admin Orders

app.get("/admin/orders", (req, res) => {
  const sql = `
    SELECT o.*, name
    FROM orders AS o
    LEFT JOIN users
    ON o.user_id  = users.id
    ORDER BY o.id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put("/admin/orders/:id", (req, res) => {
  const sql = `
    UPDATE orders
    SET order_state = ?
    WHERE id = ?
    `;
  con.query(sql, [req.body.order_state, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete("/admin/orders/:id", (req, res) => {
  const sql = `
    DELETE FROM orders
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// User Orders

app.get("/userOrders", (req, res) => {
  const sql = `
    SELECT *
    FROM orders
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// //CREATE

// app.post("/home/comments/:id", (req, res) => {
//   const sql = `
//     INSERT INTO comments (post, movie_id)
//     VALUES (?, ?)
//     `;
//   con.query(sql, [req.body.post, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // READ (all)

// app.get("/home/movies", (req, res) => {
//   const sql = `
//     SELECT m.*, c.id AS cid, c.post
//     FROM movies AS m
//     LEFT JOIN comments AS c
//     ON c.movie_id = m.id
//     ORDER BY m.title
//     `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });
// app.get("/server/movies/wc", (req, res) => {
//   const sql = `
//     SELECT m.*, c.id AS cid, c.post
//     FROM movies AS m
//     INNER JOIN comments AS c
//     ON c.movie_id = m.id
//     ORDER BY m.title
//     `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// //DELETE
// app.delete("/server/movies/:id", (req, res) => {
//   const sql = `
//     DELETE FROM movies
//     WHERE id = ?
//     `;
//   con.query(sql, [req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });
// app.delete("/server/comments/:id", (req, res) => {
//   const sql = `
//     DELETE FROM comments
//     WHERE id = ?
//     `;
//   con.query(sql, [req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// //EDIT
// app.put("/home/movies/:id", (req, res) => {
//   const sql = `
//     UPDATE movies
//     SET
//     rating_sum = rating_sum + ?,
//     rating_count = rating_count + 1,
//     rating = rating_sum / rating_count
//     WHERE id = ?
//     `;
//   con.query(sql, [req.body.rate, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });
// app.put("/server/movies/:id", (req, res) => {
//   let sql;
//   let r;
//   if (req.body.deletePhoto) {
//     sql = `
//         UPDATE movies
//         SET title = ?, price = ?, image = null
//         WHERE id = ?
//         `;
//     r = [req.body.title, req.body.price, req.params.id];
//   } else if (req.body.image) {
//     sql = `
//         UPDATE movies
//         SET title = ?, price = ?, image = ?
//         WHERE id = ?
//         `;
//     r = [req.body.title, req.body.price, req.body.image, req.params.id];
//   } else {
//     sql = `
//         UPDATE movies
//         SET title = ?, price = ?
//         WHERE id = ?
//         `;
//     r = [req.body.title, req.body.price, req.params.id];
//   }
//   con.query(sql, r, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.listen(port, () => {
  console.log(`Rūbų parduotuvė dirba per ${port} portą!`);
});
