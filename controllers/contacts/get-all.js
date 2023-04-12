const { ContactModel } = require('../../database/models');

async function getAll(req, res, next) {
  try {
    const result = await ContactModel.find();

    const mapContactOutput = contactDocument => {
      const { _id, ...rest } = contactDocument.toObject();
      const mappedContact = {
        id: _id,
        ...rest,
      };
      return mappedContact;
    };

    const mappedContacts = result.map(mapContactOutput);

    res.status(200).json(mappedContacts);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
};
