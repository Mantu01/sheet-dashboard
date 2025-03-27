import express from 'express';
import { createSheet, deleteSheetData, getSheetData, updateSheetData } from '../controllers/sheetsController.js';
import authenticate from '../middleware/auth.js';


const router = express.Router();
router.get('/:sheetId', getSheetData);
router.post('/', createSheet);
router.put('/:spreadsheetId', updateSheetData);
router.delete('/:sheetId',deleteSheetData);

export default router;