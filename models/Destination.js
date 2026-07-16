const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Historical",
        "Nature",
        "Desert",
        "Beach",
        "Religious",
        "Cultural"
      ]
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"]
    },

    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true
    },

    featured: {        // for  most iconic destinations in the home page
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // createdAt , updatedAt fields
  }
);

const Destination = mongoose.model(
  "Destination",
  destinationSchema
);

module.exports = Destination;