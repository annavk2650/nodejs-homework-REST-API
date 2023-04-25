const { UserModel } = require('../../database/models');
const crypto = require('crypto');
const Joi = require('joi');
const { createHash, createHttpException, createJWT } = require('../../services');
const gravatar = require('gravatar');

const addSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = addSchema.validate({ email, password });
  if (error) {
    return res.status(400).json(error.message);
  }

  const passwordHash = await createHash(password);
  const avatarURL = gravatar.url(email);

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw createHttpException('This email is already taken', 409);
  }

  const newUser = await UserModel.create({ email, passwordHash, avatarURL }).catch(e => {
    throw createHttpException('Email in use', 409);
  });

  const sessionKey = crypto.randomUUID();

  await UserModel.findByIdAndUpdate(newUser._id, { sessionKey });

  const accessJWT = createJWT({
    userId: String(newUser._id),
    sessionKey,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register,
};
