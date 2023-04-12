const Joi = require('joi');
const { ContactModel } = require('../../database/models');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

async function updateById(req, res, next) {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const { error } = addSchema.validate({ name, email, phone, favorite });
    if (error) {
      return res.status(400).json({
        message: 'missing fields',
      });
    }
    const result = await ContactModel.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
        favorite,
      },
      { new: true }
    ).catch(error => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });

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
  updateById,
};