const { UserModel } = require('../../database/models');
const { createHttpException } = require('../../services');
const Joi = require('joi');

const addSchema = Joi.object({
  email: Joi.string().required(),
});

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  const { error } = addSchema.validate({ email });
  if (error) {
    return res.status(400).json(error.message);
  }

  if (!user) {
    throw createHttpException(401, 'User not found');
  }
  if (user.verify) {
    throw createHttpException(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target='_blank' href='${BASE_URL}/auth/verify/${user.verificationToken}'>Click verify email`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: 'Verification has already been passed',
  });
};

module.exports = resendVerifyEmail;
