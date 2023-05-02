const { UserModel } = require('../../database/models');
const crypto = require('crypto');
const Joi = require('joi');
const { createHash, createHttpException, createJWT, sendEmail } = require('../../services');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { BASE_URL } = process.env;

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
  const verificationToken = nanoid();

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw createHttpException(409, 'This email is already taken');
  }

  const newUser = await UserModel.create({
    email,
    passwordHash,
    avatarURL,
    verificationToken,
  }).catch(e => {
    throw createHttpException(409, 'Email in use');
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target='_blank' href='${BASE_URL}/auth/verify/${verificationToken}'>Click verify email`,
  };

  await sendEmail(verifyEmail);

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
