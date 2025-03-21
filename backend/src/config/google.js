import { google } from "googleapis";
import fs from 'fs';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({
  path: './.env'
});

export class GoogleSheetService {
  auth;
  client;
  googleSheet;
  service;

  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;

      if (!credentialsBase64) {
        throw new Error('GOOGLE_APPLICATION_CREDENTIALS_BASE64 environment variable not set.');
      }

      const credentialsJson = Buffer.from(credentialsBase64, 'base64').toString('utf-8');
      const tempFilePath = path.join(os.tmpdir(), 'google-credentials.json');
      fs.writeFileSync(tempFilePath, credentialsJson);

      this.auth = new google.auth.GoogleAuth({
        keyFile: tempFilePath,
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
      });

      this.client = await this.auth.getClient();

      this.googleSheet = google.sheets({
        version: 'v4',
        auth: this.client,
      });

      this.service = google.sheets({ version: 'v4', auth: this.auth });
      fs.unlinkSync(tempFilePath);

    } catch (error) {
      console.error('Error initializing GoogleSheetService:', error);
      throw error;
    }
  }
}

const googleSheetService = new GoogleSheetService();
export default googleSheetService;