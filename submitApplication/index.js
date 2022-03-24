module.exports = async function (context, req) {
  const crypto = require("crypto");
  // Prevent overwriting an existing application
  if (!!req.body.id) {
    context.res = { status: 400 };
    return;
  }

  let id = crypto.randomUUID();
  req.body.id = id;
  req.body.envId = "chspride";
  req.body.status = "new";

  context.bindings.outputDocument = req.body;

  context.res = { body: { id } };

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SendGridApiKey);
  const boardMsg = {
    to: `${process.env.SendGridApiTo}`,
    from: `${process.env.SendGridApiFrom}`,
    templateId: "d-b9c79d383f56451aaf6471c6368ff73a",
    dynamicTemplateData: req.body,
  };
  sgMail.send(boardMsg);

  const applicantMsg = {
    to: req.body.email,
    from: `${process.env.SendGridApiFrom}`,
    templateId: "d-5371de527a90403fad7a4dc5d4336e0e",
    dynamicTemplateData: req.body,
  };
  sgMail.send(applicantMsg);
};
