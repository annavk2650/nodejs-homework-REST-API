const { UserModel } = require('../database/models');
const { createHttpException, verifyJWT } = require('../services');

const userAuthMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw createHttpException('Not authorized', 401);
    }

    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw createHttpException('Not authorized', 401);
    }

    try {
      const tokenPayload = verifyJWT(token);
      if (!tokenPayload.userId || !tokenPayload.sessionKey) {
        throw createHttpException('Not authorized', 401);
      }

      const user = await UserModel.findById(tokenPayload.userId);

      if (!user) {
        throw createHttpException('Not authorized', 401);
      }

      if (tokenPayload.sessionKey !== user.sessionKey) {
        throw createHttpException('Not authorized', 401);
      }

      req.user = user;

      next();
    } catch (error) {
      throw createHttpException('Not authorized', 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userAuthMiddleware,
};
