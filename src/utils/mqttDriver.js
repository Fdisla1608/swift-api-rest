// mqttDriver.js

const mqtt = require('mqtt');

const connectToMQTT = () => {
    const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

    mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
        mqttClient.subscribe('sensors/data', (err) => {
            if (err) {
                console.error('Error subscribing to topic:', err);
            }
        });
    });

    mqttClient.on('message', (topic, message) => {
        console.log(`Received message on ${topic}: ${message.toString()}`);
    });

    return mqttClient;
};

module.exports = connectToMQTT;
