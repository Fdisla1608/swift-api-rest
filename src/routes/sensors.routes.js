const express = require("express");
const router = express.Router();
const Module = require("../models/module"); // Asegúrate de tener el modelo de módulo definido para MongoDB

router.post("/", async (req, res) => {
  try {
    const { moduleId, sensors } = req.body;
    const newSensorData = new Module({
      moduleId: moduleId,
      sensors: {
        humity: {
          h_01: sensors.humity.h_01,
          h_02: sensors.humity.h_02,
          h_03: sensors.humity.h_03,
          h_04: sensors.humity.h_04,
        },
        vlvs: sensors.vlvs,
        rain: sensors.rain,
        sun: sensors.sun,
      },
      timestamp: new Date(),
    });

    await newSensorData.save();
    res.status(200).json({ message: "Datos del sensor insertados correctamente", module: newSensorData });
  } catch (error) {
    console.error("Error al insertar datos de sensor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener datos de sensores para el gráfico
router.get("/:moduleId", async (req, res) => {
  try {
    const { moduleId } = req.params;
    const modules = await Module.find({ moduleId }).select("sensors timestamp").limit(12).sort({ timestamp: -1 });

    if (!modules || modules.length === 0) {
      return res.status(404).json({ error: "Módulo no encontrado" });
    }

    modules.reverse();

    const labels = modules.map((module) => {
      const timestamp = new Date(module.timestamp);
      return `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
    });

    const humidity_datasets = [
      {
        label: "Humedad Sensor 1",
        data: modules.map((module) => module.sensors.humity.h_01),
        fill: false,
        borderColor: "red",
        tesion: 0.4,
      },
      {
        label: "Humedad Sensor 2",
        data: modules.map((module) => module.sensors.humity.h_02),
        fill: false,
        borderColor: "blue",
        tesion: 0.4,
      },
      {
        label: "Humedad Sensor 3",
        data: modules.map((module) => module.sensors.humity.h_03),
        fill: false,
        borderColor: "yellow",
        tesion: 0.4,
      },
      {
        label: "Humedad Sensor 4",
        data: modules.map((module) => module.sensors.humity.h_04),
        fill: false,
        borderColor: "green",
        tesion: 0.4,
      },
    ];

    const sun_datasets = [
      {
        label: "Sun",
        data: modules.map((module) => module.sensors.sun),
        fill: false,
        borderColor: "yellow",
        tesion: 0.4,
      },
    ];

    const rain_datasets = [
      {
        label: "rain",
        data: modules.map((module) => module.sensors.sun),
        fill: false,
        borderColor: "blue",
        tesion: 0.4,
      },
    ];

    res
      .status(200)
      .json({
        humidity: { labels, datasets: humidity_datasets },
        rain: { labels, datasets: rain_datasets },
        sun: { labels, datasets: sun_datasets },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
