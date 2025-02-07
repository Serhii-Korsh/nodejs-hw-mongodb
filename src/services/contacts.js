import Contact from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId });
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  const contactsCount = await Contact.countDocuments({ userId });

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const createContact = async (payload) => {
  return await Contact.create(payload);
};

export const updateContactById = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true, runValidators: true, ...options },
  );

  return updatedContact;
};

export const deleteContactById = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
