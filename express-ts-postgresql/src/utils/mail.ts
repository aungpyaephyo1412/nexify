import 'dotenv/config';
import nodemailer from 'nodemailer';
const config = {
  service: 'gmail', // your email domain
  auth: {
    user: process.env.NODEJS_GMAIL_APP_USER, // your email address
    pass: process.env.NODEJS_GMAIL_APP_PASSWORD, // your email app password
  },
};

export const message = (token: string, mails: string[], name: string) => {
  return {
    from: process.env.NODEJS_GMAIL_APP_USER,
    to: mails,
    subject: 'Reset Password',
    html: `<div>
      <p>Your code is: http://localhost:3000/reset-password/${token}.</p>
       <p>Use it to reset your password in Loopfeed.</p>
       <p>If you didn't request this, simply ignore this message.</p>
       <p>Yours, The Loopfeed Team</p>
    </div>`,
  };
};
export const verify_registerMessage = (code: string, mails: string[]) => {
  return {
    from: process.env.NODEJS_GMAIL_APP_USER,
    to: mails,
    subject: 'Verify registration',
    html: `
      <div>
      <p>Your code is: ${code}.</p>
       <p>Use it to verify your email verification in Loopfeed.</p>
       <p>If you didn't request this, simply ignore this message.</p>
       <p>Yours, The Loopfeed Team</p>
    </div>
    `,
  };
};
export const transporter = nodemailer.createTransport(config);
