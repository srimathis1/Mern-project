import express from 'express';
import { gettravel, createdetails, deleteTraveler, updateTraveler } from '../controllers/travel.js';

const router = express.Router();

router.get('/', gettravel);
router.post('/', createdetails);
router.delete('/:id', deleteTraveler);
router.put('/:id', updateTraveler);

export default router;
