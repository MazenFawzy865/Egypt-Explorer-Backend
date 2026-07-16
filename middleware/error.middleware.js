// We want errors to eventually flow through one central middleware:
// Express recognizes it as an error middleware because it has four parameters

const errorHandler = (err, req, res, next) => {

    console.error("ERROR NAME:", err.name);
    console.error("ERROR MESSAGE:", err.message);

  
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
  
    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID format";
    }
  
    // Mongoose validation error
    if (err.name === "ValidationError") {
      statusCode = 400;
  
      message = Object.values(err.errors)
        .map((error) => error.message)
        .join(", ");
    }
  
    // MongoDB duplicate key error
    if (err.code === 11000) {
      statusCode = 409;
  
      const field = Object.keys(err.keyValue)[0];
  
      message = `${field} already exists`;
    }
  
    // Invalid JWT
    if (err.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Invalid token";
    }
  
    // Expired JWT
    if (err.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Token has expired";
    }
  
    res.status(statusCode).json({
      success: false,
      message
    });
  };
  
  module.exports = errorHandler;