const express = require('express');
const bodyParser = require('body-parser');

const connectToMySQL = require('./utils/mysqlDriver');
const connectToMQTT = require('./utils/mqttDriver');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize connections
const db = connectToMySQL();
const mqttClient = connectToMQTT();

// Routes
const sensorsRoutes = require('./routes/sensors.routes')(db, mqttClient);
app.use('/sensors', sensorsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = { db, mqttClient };
