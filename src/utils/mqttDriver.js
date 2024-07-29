const mqtt = require("mqtt");
const Module = require("../models/module");

const connectToMQTT = () => {
  const mqttClient = mqtt.connect("ws://maptest.ddns.net:8083/mqtt");

  mqttClient.on("connect", () => {
    mqttClient.subscribe("swift/modules/+", (err) => {
      if (err) {
        console.error("Error subscribing to topic:", err);
      }
    });
  });

  mqttClient.on("message", async (topic, message) => {
    try {
      const data = JSON.parse(message.toString());
      const { moduleId, sensors } = data;
      
      console.log(moduleId);

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
    } catch (error) {
      console.error("Error al procesar y guardar datos en MongoDB:", error);
    }
  });

  return mqttClient;
};

module.exports = connectToMQTT;
