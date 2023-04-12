const { ContactModel } = require('../../database/models');

ContactModel;
async function deleteById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await ContactModel.findByIdAndDelete(contactId).catch(error => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });
    if (result === null) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    res.status(200).json({
      message: 'contact deleted',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  deleteById,
};
