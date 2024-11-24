// mysqlDriver.js
const mysql = require("mysql");

const connectToMySQL = () => {
  const connection = mysql.createConnection({
    host: "swift-agro.ddns.net",
    user: "client",
    password: "root1234",
    database: "santiago_db_v2",
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      throw err;
    }
    console.log("Connected to MySQL");
  });

  return db;
};

module.exports = connectToMySQL;
