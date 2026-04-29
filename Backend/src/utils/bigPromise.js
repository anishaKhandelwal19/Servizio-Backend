const BigPromise = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error("ERROR", error);
    res.status(error.code < 500 ? error.code : 500).json({
      success: false,
      message: error.message,
    });
  }
};
export default BigPromise;

// BigPromise is a DRY (Don’t Repeat Yourself) utility for async route error handling.

// Works perfectly with ApiError for standardized API responses.

// Makes your routes cleaner and easier to maintain.
// utility wrapper for handling async route handlers in Express.js. It’s used to avoid repetitive try-catch blocks in each route---------mainn line
// BigPromise is a higher-order function.

// It takes a function fn (your async route handler) and returns a new async function with the standard Express parameters (req, res, next).

// Essentially, it wraps your async functions to automatically handle errors.
