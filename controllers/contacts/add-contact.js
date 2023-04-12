const Joi = require('joi');
const { ContactModel } = require('../../database/models');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

async function addContacts(req, res, next) {
  try {
    const { name, email, phone, favorite } = req.body;
    const { error } = addSchema.validate({ name, email, phone, favorite });
    if (error) {
      return res.status(400).json({
        message: 'missing required name field',
      });
    }

    const result = await ContactModel.create({ name, email, phone, favorite });
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
  addContacts,
};
