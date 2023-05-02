const { UserModel } = require('../../database/models');
const crypto = require('crypto');
const Joi = require('joi');
const { checkHash, createHttpException, createJWT } = require('../../services');

const addSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = addSchema.validate({ email, password });
  if (error) {
    return res.status(400).json(error.message);
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw createHttpException(401, 'Email or password is wrong');
  }
  console.log(user.verify);

  if (!user.verify) {
    throw createHttpException(401, 'User not verified');
  }

  const match = await checkHash(password, user.passwordHash);

  if (!match) {
    res.status(401).json({ messange: 'Email or password is wrong' });
    return;
  }

  const sessionKey = crypto.randomUUID();

  await UserModel.findByIdAndUpdate(user._id, { sessionKey });

  const accessJWT = createJWT({
    userId: String(user._id),
    sessionKey,
  });

  res.status(200).json({
    token: accessJWT,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  login,
};
