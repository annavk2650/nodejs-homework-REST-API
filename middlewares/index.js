const { errorHandlingMiddleware } = require('./error-handling.middleware');
const { userAuthMiddleware } = require('./user-auth.middleware');

module.exports = {
  userAuthMiddleware,
  errorHandlingMiddleware,
};
