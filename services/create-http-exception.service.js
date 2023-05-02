const createHttpException = (code, message) => {
  const err = new Error(message);
  err.code = code;
  return err;
};

module.exports = {
  createHttpException,
};
