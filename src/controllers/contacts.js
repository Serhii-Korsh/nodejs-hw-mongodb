import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

export const getContactsHandler = async (req, res) => {
  const response = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: response,
  });
};

export const getContactByIdHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const response = await getContactById(contactId);
  if (!response) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contact with id {contactId}!',
    data: response,
  });
};

export const createContactHandler = async (req, res) => {
  const response = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: response,
  });
};

export const updateContactHandler = async (req, res, next) => {
  const { contactId } = req.params;
  const updates = req.body;

  const updatedContact = await updateContactById(contactId, updates);

  if (!updatedContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated contact!',
    data: updatedContact,
  });
};

export const deleteContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactById(contactId);

  if (!deletedContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
