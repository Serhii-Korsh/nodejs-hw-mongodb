import express from 'express';
import {
  getContactsHandler,
  getContactByIdHandler,
  createContactHandler,
  updateContactHandler,
  deleteContactHandler,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsHandler));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdHandler));
router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactHandler),
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(updateContactHandler),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactHandler));

export default router;
