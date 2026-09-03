const errorHandler = (err, req, res, next) => {
  const isMalformedJson =
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.type === "entity.parse.failed";

  if (isMalformedJson) {
    return res.status(400).json({
      success: false,
      message: "Request body must contain valid JSON",
    });
  }

  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;