require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const { SENGRID_API_KEY, SENGRID_SENDER_ADDRESS } = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: SENGRID_SENDER_ADDRESS };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
