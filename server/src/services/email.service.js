const nodemailer = require('nodemailer');
const ejs = require('ejs');
// const sgMail = require('@sendgrid/mail');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);

// sgMail.setApiKey(config.email.smtp.sendGridApiKey);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} message
 * @param {string} name
 * @param {string} url
 * @returns {Promise}
 */
const sendEmail = async (to, subject, message, name, url = null) => {
  ejs.renderFile(
    'src/services/email-template/new-email.html',
    {
      name,
      url,
      subject,
      message,
    },
    (err, html) => {
      if (!err) {
        const mailOptions = {
          from: `${config.email.from} <${config.email.from}>`,
          to: `${to} <${to}>`,
          subject,
          html,
        };
        transport.send(mailOptions, () => {
          if (err) {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
          }
        });
      } else {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      }
    }
  );
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.appURL}/#/auth/reset-password?token=${token}`;
  const text = `To reset your password, click on the below link.
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text, to, resetPasswordUrl);
};

/**
 * Email verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const emailVerificationEmail = async (to, token) => {
  const subject = 'Please verify your email';
  // replace this url with the link to the reset password page of your front-end app
  const emailVerificationUrl = `${config.appURL}/#/auth/login?token=${token}`;
  const text = `To verify your email, click on the below link.
  If you did not request, then ignore this email.`;
  await sendEmail(to, subject, text, to, emailVerificationUrl);
};

/**
 * NFT Confirmation Eamil
 * @param {string} to
 * @param {object} nft
 * @returns {Promise}
 */
const sendNFTConfirmationEmail = async (nft) => {
  console.log(nft);
  const subject = 'You have recieved NFT';
  // replace this url with the link to the reset password page of your front-end app
  const url = `${config.appURL}`;
  const text = `You have recieved NFT. You can claim this NFT after login to our platform.`;
  await sendEmail(nft.owner_email, subject, text, nft.owner_name, url);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  emailVerificationEmail,
  sendNFTConfirmationEmail,
};
