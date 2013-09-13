exports.index = function(req, res){
  res.render('contact', { title: 'Walk For Hope' });
};

exports.post = function(req, res, next) {
  var Y = require('yui').use('base', 'substitute');


  var SendGrid, doc, email, message, messageBody, name, phone, sendgrid;
  name = req.body.name;
  email = req.body.email;
  phone = req.body.phone;
  message = req.body.message;
  SendGrid = require('sendgrid').SendGrid;
  sendgrid = new SendGrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
  doc = {
    name: name,
    email: email,
    phone: phone,
    message: message
  };
  messageBody = "Contact Form from Walk For Home\n{name} \nwrote\n{message}\n\nEmail: {email}\nPhone: {phone}";
  message = {
    to: process.env.EMAIL_ADDRESS,
    from: email,
    subject: 'Contact form - Walk-4-Hope',
    text: Y.substitute(messageBody, doc)
  };
  return sendgrid.send(message, function(success, message) {
    return res.redirect('/');
  });
};