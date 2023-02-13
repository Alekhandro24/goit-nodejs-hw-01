const fs = require("fs/promises");
const contactsPath = require("./filePath");

const updateContact = async (contactList) => {
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactList = JSON.parse(data);
  return contactList;
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const result = contactList.find((item) => parseInt(item.id) === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const idx = contactList.findIndex((item) => parseInt(item.id) === contactId);
  if (idx == -1) {
    return null;
  }
  const [removeContact] = contactList.splice(idx, 1);
  await updateContact(contactList);
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const contactList = await listContacts();
  const newContact = {
    id: String(contactList.length + 1),
    name,
    email,
    phone,
  };
  contactList.push(newContact);
  await updateContact(contactList);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
