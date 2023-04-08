const fsp = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const filePath = path.join(__dirname, 'contacts.json');

async function parsedContacts() {
  const contacts = await fsp.readFile(filePath);
  const parsed = JSON.parse(contacts);
  return parsed;
}

async function updateContactsList(contacts) {
  await fsp.writeFile(filePath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const contacts = await parsedContacts();
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await parsedContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const contacts = await parsedContacts();
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  contacts.splice(contactIndex, 1);

  await updateContactsList(contacts);
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const contacts = await parsedContacts();
  contacts.push(newContact);
  await updateContactsList(contacts);
  return newContact;
};

const updateContact = async (id, data) => {
  const contacts = await parsedContacts();

  const contactIndex = contacts.findIndex(contact => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = {
    id,
    ...data,
  };
  await updateContactsList(contacts);

  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
