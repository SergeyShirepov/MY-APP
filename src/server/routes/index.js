import { Router } from 'express';
import { renderApp } from '../utils/render.js';

const router = Router();

router.get('*', renderApp);

export default router;