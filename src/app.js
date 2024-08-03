const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectToMQTT = require("./utils/mqttDriver");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3003;

mongoose
  .connect("mongodb://10.0.0.240:27017/swift_nsql_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());

// Rutas de sensores
app.use("/api/sensors", require("./routes/sensors.routes"));
app.use("/api/terrains", require("./routes/terrain.routes"));

// MQTT
const start = async () => {
  try {
    connectToMQTT();
    console.log("MQTT conectado y escuchando...");
  } catch (error) {
    console.error("Error al iniciar la conexión MQTT:", error);
  }
};

start();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

module.exports = app;
