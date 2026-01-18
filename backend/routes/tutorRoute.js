import express from 'express';
import { tutorList } from '../controllers/tutorController.js';

const tutorRouter = express.Router();

tutorRouter.get('/list', tutorList);

export default tutorRouter;