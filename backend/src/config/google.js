import { google } from "googleapis";

export class GoogleSheetService{
  auth;
  client;
  googleSheet;
  service;

  constructor(){
    this.auth=new google.auth.GoogleAuth({
      keyFile: "google.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    
    this.client=this.auth.getClient();

    this.googleSheet=google.sheets({
      version: "v4",
      auth: this.client,
    });

    this.service=google.sheets({version: "v4", auth: this.auth});
  }
}

const googleSheetService=new GoogleSheetService();
export default googleSheetService;