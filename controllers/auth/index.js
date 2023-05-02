const { getCurrent } = require('./current');
const { login } = require('./login');
const { logout } = require('./logout');
const { register } = require('./register');
const resendVerifyEmail = require('./resendVerifyEmail');
const { updateAvatar } = require('./updateAvatar');
const { updateSubscription } = require('./updateSubscription');
const verifyEmail = require('./verifyEmail');

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
