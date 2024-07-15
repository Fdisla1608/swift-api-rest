const express = require('express');

module.exports = (db, mqttClient) => {
    const router = express.Router();

    // GET all sensor data
    router.get('/', (req, res) => {
        db.query('SELECT * FROM sensors', (err, results) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json(results);
        });
    });

    // POST new sensor data
    router.post('/', (req, res) => {
        const { sensor_id, value } = req.body;
        const query = 'INSERT INTO sensors (sensor_id, value) VALUES (?, ?)';
        db.query(query, [sensor_id, value], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            mqttClient.publish('sensors/data', JSON.stringify({ sensor_id, value }));
            res.status(201).json({ id: result.insertId });
        });
    });

    return router;
};
