import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

// import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// import { getEnvVar } from '../utils/getEnvVar.js';

import { uploadFile } from '../utils/uploadFile.js';

export const getContactsHandler = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;
  const response = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: response,
  });
};

export const getContactByIdHandler = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const response = await getContactById(contactId, userId);
  if (!response) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contact with id {contactId}!',
    data: response,
  });
};

export const createContactHandler = async (req, res) => {
  const userId = req.user._id;

  const photo = req.file;

  const photoUrl = await uploadFile(photo);

  const response = await createContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: response,
  });
};

export const updateContactHandler = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const photo = req.file;
  const photoUrl = await uploadFile(photo);

  const result = await updateContactById(contactId, userId, {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully updated contact!`,
    data: result,
  });
};

export const deleteContactHandler = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const deletedContact = await deleteContactById(contactId, userId);

  if (!deletedContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
