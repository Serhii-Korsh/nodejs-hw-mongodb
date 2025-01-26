import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import mongoose from 'mongoose';

export const getContactsHandler = async (req, res, next) => {
  try {
    const response = await getAllContacts();
    res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

export const getContactByIdHandler = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const response = await getContactById(contactId);
    if (!response) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const createContactHandler = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    return next(
      createError(
        400,
        'Missing required fields: name, phoneNumber, or contactType',
      ),
    );
  }

  try {
    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

export const updateContactHandler = async (req, res, next) => {
  const { contactId } = req.params;
  const updates = req.body;
  if (!mongoose.isValidObjectId(contactId)) {
    return next(createError(404, 'Contact not found'));
  }

  try {
    const updatedContact = await updateContactById(contactId, updates);

    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated contact!',
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.isValidObjectId(contactId)) {
    return next(createError(404, 'Contact not found'));
  }

  try {
    const deletedContact = await deleteContactById(contactId);

    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
