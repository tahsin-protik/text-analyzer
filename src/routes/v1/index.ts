import { Router } from 'express';
import test from './test';
import text from './text';
const router = Router();

router.use('/test', test);
router.use('/text', text);

console.log('v1 is loaded');

export default router;
