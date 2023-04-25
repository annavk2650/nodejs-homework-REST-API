const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { UserModel } = require('../../database/models');
const { error } = require('console');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);

  const jimpAvatar = path.join('public', 'avatars', filename);
  Jimp.read(jimpAvatar, (error, filename) => {
    if (error) throw error;
    filename.cover(250, 250).quality(60).write(jimpAvatar);
  });

  await UserModel.findByIdAndUpdate(_id, { avatarURL: jimpAvatar });

  res.json({
    avatarURL,
  });
};

module.exports = {
  updateAvatar,
};
