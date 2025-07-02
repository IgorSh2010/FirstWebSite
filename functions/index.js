const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(functions.config().sendgrid.key);

// Callable function
exports.sendOrderEmail = functions.https.onCall(async (data, context) => {
  const {to, subject, text, html} = data;

  if (!to || !subject || !text) {
    throw new functions.https.HttpsError("invld-argument", "Brak wym. pól");
  }

  const msg = {
    to,
    from: "igor.sh2010@gmail.com", // "noreply@ls-studio.vercel.app"
    subject,
    text,
    html: html || `<p>${text}</p>`,
  };

  try {
    await sgMail.send(msg);
    return {success: true};
  } catch (error) {
    console.error("Błąd przy wysyłce:", error);
    throw new functions.https.HttpsError("internal", "Nie udało się wysłać");
  }
});
