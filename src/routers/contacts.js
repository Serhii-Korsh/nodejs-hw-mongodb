import express from 'express';
import {
  getContactsHandler,
  getContactByIdHandler,
  createContactHandler,
  updateContactHandler,
  deleteContactHandler,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsHandler));
router.get('/:contactId', ctrlWrapper(getContactByIdHandler));
router.post('/', ctrlWrapper(createContactHandler));
router.patch('/:contactId', ctrlWrapper(updateContactHandler));
router.delete('/:contactId', ctrlWrapper(deleteContactHandler));

export default router;
