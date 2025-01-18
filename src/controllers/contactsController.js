import { getAllContacts, getContactById } from '../services/contacts.js';

export async function getContactsHandler(req, res) {
  try {
    const response = await getAllContacts();
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}

export async function getContactByIdHandler(req, res) {
  const { contactId } = req.params;

  try {
    const response = await getContactById(contactId);
    if (response.status === 404) {
      return res.status(404).json({ message: response.message });
    }
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}

