const express = require("express");

const {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination
} = require("../controllers/destination.controller");

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

// Public routes
router.get("/", getDestinations);
router.get("/:id", getDestination);

// Admin-only routes
router.post("/", protect, adminOnly, createDestination);
router.put("/:id", protect, adminOnly, updateDestination);
router.delete("/:id", protect, adminOnly, deleteDestination);

module.exports = router;