import googleSheetService from "../config/google.js";
import Sheet from "../models/sheetModel.js";
import User from "../models/userModel.js";
import { columnToLetter } from "../utils/columnToLetter.js";

export const getSheetData = async (req, res) => {
  try {
    const {sheetId}=req.params;
    const sheet = await Sheet.findById(sheetId).populate('createdBy', 'name email');
    if (!sheet) {
      return res.status(404).json({ message: 'Sheet not found' });
    }
    const spreadsheetId=sheet.sheetId;
    const response = await googleSheetService.googleSheet.spreadsheets.values.get({
      auth: googleSheetService.auth,
      spreadsheetId,
      range: 'Sheet1',
    });
    res.status(200).json({ data: response.data,sheet:sheet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createSheet = async (req, res) => {
  const { title, columns,userId } = req.body;
  const colVals=columns.map(col=>col.header);

  try {
    const response = await googleSheetService.service.spreadsheets.create({
      resource: {
        properties: { title },
      },
      fields: 'spreadsheetId',
    });
    
    const spreadsheetId = response.data.spreadsheetId;
    await googleSheetService.googleSheet.spreadsheets.values.append({
      auth: googleSheetService.auth,
      spreadsheetId,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [colVals] },
    });
    const sheet=await Sheet.create({ title, createdBy: userId, columns, sheetId: spreadsheetId });
    await User.findByIdAndUpdate(userId, { $push: { sheet: sheet._id } });
    return res.status(200).json({sheet:sheet,message: 'Spreadsheet created successfully' });
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const updateSheetData = async (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const { values } = req.body;

    const numRows = values.length;
    const numCols = values[0]?.length || 0;
    const endColumnLetter = columnToLetter(numCols - 1);
    const range = `Sheet1!A1:${endColumnLetter}${numRows}`;

    const response = await googleSheetService.googleSheet.spreadsheets.values.update({
      auth: googleSheetService.auth,
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteSheetData = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const user=await User.findById(req.userId);
    const updatedSheets = user.sheet.filter((sheet) => sheet.sheetId !== sheetId);
    user.sheet = updatedSheets;
    await user.save();
    await Sheet.findByIdAndDelete(sheetId);
    res.status(200).json({ message: 'Spreadsheet deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};