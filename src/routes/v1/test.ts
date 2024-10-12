import { Router } from 'express';
import { testAccessibilityV1 } from '../../controllers/test';
const router = Router();

router.get('/', testAccessibilityV1);
console.log('test is loaded');
export default router;