import { Router } from 'express';
import {
  createText,
  getAllTexts,
  getTextById,
  updateText,
  deleteText,
} from '../../controllers/text';

const router = Router();

router.post('/', createText);
router.get('/', getAllTexts);
router.get('/:id', getTextById);
router.put('/:id', updateText);
router.delete('/:id', deleteText);

export default router;
