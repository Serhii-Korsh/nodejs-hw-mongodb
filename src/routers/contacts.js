import { Router } from 'express';
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
import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsHandler));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdHandler));
router.post(
  '/',
  upload.single('photo'), // додаємо цю middleware
  validateBody(createContactsSchema),
  ctrlWrapper(createContactHandler),
);
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'), // додаємо цю middleware
  validateBody(updateContactsSchema),
  ctrlWrapper(updateContactHandler),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactHandler));

export default router;
