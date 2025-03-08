import googleSheetService from "../config/google.js";
import Sheet from "../models/sheetModel.js";
import User from "../models/userModel.js";

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
  const { title, columns } = req.body;

  try {
    const response = await googleSheetService.service.spreadsheets.create({
      resource: {
        properties: { title },
      },
      fields: 'spreadsheetId',
    });
    
    const spreadsheetId = response.data.spreadsheetId;
    const sheet=await Sheet.create({ title, createdBy: req.user._id, columns, sheetId: spreadsheetId });
    await User.findByIdAndUpdate(req.user._id, { $push: { sheet: sheet._id } });
    console.log("response", response.data);
    return res.status(200).json({ sheetId:spreadsheetId, message: 'Spreadsheet created successfully' });
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const updateSheetData = async (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const { values } = req.body;
    const response = await googleSheetService.googleSheet.spreadsheets.values.append({
      auth: googleSheetService.auth,
      spreadsheetId,
      range: 'Sheet1!A:A',
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
    const user=await User.findById(req.user._id);
    const updatedSheets = req.user.sheet.filter((sheet) => sheet.sheetId !== sheetId);
    user.sheet = updatedSheets;
    await user.save();
    await Sheet.findByIdAndDelete(sheetId);
    res.status(200).json({ message: 'Spreadsheet deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};