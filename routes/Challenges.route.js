const express = require("express");
const router = express.Router();
const Challenges = require("../models/schema.model");
const controller = require("../controllers/Challenges.controller");

// Get All Challenges
router.get("/", controller.get);

// Get Challenge by ID
router.get("/:id", controller.getId);

// Post a Challenge
router.post("/", controller.post);

// Update a Challenge
router.put("/:id", controller.put);

// Delete a Challenge
router.delete("/:id", controller.delete);

module.exports = router;
