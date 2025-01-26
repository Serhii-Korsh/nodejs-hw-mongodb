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

export async function createContact(contactData) {
  try {
    const contact = new Contact(contactData);
    await contact.save();
    return contact;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw new Error('Error creating contact');
  }
}

export async function updateContactById(contactId, updates) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, updates, {
      new: true,
      runValidators: true,
    });

    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw new Error('Error updating contact');
  }
}

export async function deleteContactById(contactId) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw new Error('Error deleting contact');
  }
}
