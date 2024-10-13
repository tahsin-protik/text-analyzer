import { Router } from 'express';
import {
  createText,
  getAllTexts,
  getTextById,
  updateText,
  deleteText,
  getWordCount,
  getCharacterCount,
  getSentenceCount,
  getParagraphCount,
  getLongestWordsInParagraphs,
} from '../../controllers/text';

const router = Router();

router.post('/', createText);
router.get('/', getAllTexts);
router.get('/:id', getTextById);
router.put('/:id', updateText);
router.delete('/:id', deleteText);

// Analyze text APIs
router.get('/word-count/:id', getWordCount);
router.get('/character-count/:id', getCharacterCount);
router.get('/sentence-count/:id', getSentenceCount);
router.get('/paragraph-count/:id', getParagraphCount);
router.get('/longest-words/:id', getLongestWordsInParagraphs);


export default router;
