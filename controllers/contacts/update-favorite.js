const Joi = require('joi');
const { ContactModel } = require('../../database/models');

const addSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

async function updateStatusContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { error } = addSchema.validate({ favorite });
    if (error) {
      return res.status(400).json({
        message: 'missing field favorite',
      });
    }
    const result = await ContactModel.findByIdAndUpdate(
      contactId,
      {
        favorite,
      },
      { new: true }
    );

    if (result === null) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    const { _id, ...rest } = result.toObject();

    const mappedContact = {
      id: _id,
      ...rest,
    };

    res.status(200).json(mappedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateStatusContact,
};
