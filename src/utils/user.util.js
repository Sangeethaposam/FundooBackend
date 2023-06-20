const nodemailer = require('nodemailer');
const { google } = require('googleapis');
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async (email, token) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'sangeethaundala@gmail.com',
        pass: 'Sangeetha@157#',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });
    const mailOptions = {
      from: 'Sangeetha<sangeethaundalagmail.com>',
      to: email,
      subject: 'ForgotPassword',
      text: `Hello from gmail`,
      html: `<h1>token generated ${token}</h1>`
    };
    const result = transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};
