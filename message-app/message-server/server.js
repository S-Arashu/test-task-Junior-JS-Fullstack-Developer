const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database(":memory");

const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());

db.serialize(() => {
  db.run(
    "CREATE TABLE messages (id INTEGER PRIMARY KEY, name TEXT, phone TEXT, message TEXT)"
  );
});

app.post("/api/messages", (req, res) => {
  const { name, phone, message } = req.body;
  const stmt = db.prepare(
    "INSERT INTO messages (name, phone, message) VALUES (?, ?, ?)"
  );
  stmt.run(name, phone, message, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
  stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`Сервер работает в поте лица на порту ${PORT}`);
});

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
