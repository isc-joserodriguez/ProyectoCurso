const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'joanrodriguezhe@ittepic.edu.mx',
  from: 'shepe_rodriguez@hotmail.com',
  subject: 'Hola bb',
  text: 'ontas?',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);