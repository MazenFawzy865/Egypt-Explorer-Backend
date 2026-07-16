const Destination = require("../models/Destination");

// @desc    Get all destinations
// @route   GET /api/destinations
const getDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find();

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get one destination
// @route   GET /api/destinations/:id
const getDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
        const error = new Error("Destination not found");
        error.statusCode = 404;
  
        return next(error);
    }

    res.status(200).json({
      success: true,
      data: destination
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create destination
// @route   POST /api/destinations
const createDestination = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      data: destination
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
const updateDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!destination) {
     const error = new Error("Destination not found");
     error.statusCode = 404;

     return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      data: destination
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
const deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(
      req.params.id
    );

    if (!destination) {
     const error = new Error ("Destination not found");
     error.statusCode = 404;

     return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination
};