const express = require("express");
const router = express.Router();
const Terrain = require("../models/terrain");

router.get("/", async (req, res) => {
  try {
    const terrains = await Terrain.find();
    res.json(terrains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const terrain = await Terrain.findById(req.params.id);
    if (!terrain) return res.status(404).json({ message: "Terrain not found" });
    res.json(terrain);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { terrainId, terrainName, location } = req.body;

  const terrain = new Terrain({
    terrainId,
    terrainName,
    location,
  });

  try {
    const newTerrain = await terrain.save();
    res.status(201).json(newTerrain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { terrainId, terrainName, location } = req.body;
    const terrain = await Terrain.findById(req.params.id);

    if (!terrain) return res.status(404).json({ message: "Terrain not found" });

    terrain.terrainId = terrainId ?? terrain.terrainId;
    terrain.terrainName = terrainName ?? terrain.terrainName;
    terrain.location = location ?? terrain.location;

    const updatedTerrain = await terrain.save();
    res.json(updatedTerrain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const terrain = await Terrain.findById(req.params.id);
    if (!terrain) return res.status(404).json({ message: "Terrain not found" });

    await terrain.remove();
    res.json({ message: "Terrain deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
