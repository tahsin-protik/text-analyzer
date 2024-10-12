import { Router } from 'express';
import test from './test';

const router = Router();

router.use('/test', test);

console.log('v1 is loaded');

export default router;
