import express from 'express';
import { createSheet, deleteSheetData, getSheetData, updateSheetData } from '../controllers/sheetsController.js';
import authenticate from '../middleware/auth.js';


const router = express.Router();
router.get('/:sheetId', getSheetData);
router.post('/',authenticate, createSheet);
router.put('/:spreadsheetId',authenticate, updateSheetData);
router.delete('/:sheetId',authenticate,deleteSheetData);

export default router;