import Contact from '../models/Contact.js';

export async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return {
        status: 404,
        message: 'Contact not found',
      };
    }
    return {
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Error fetching contact');
  }
}

export async function getAllContacts() {
  try {
    const contacts = await Contact.find();
    return {
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Error fetching contacts');
  }
}
