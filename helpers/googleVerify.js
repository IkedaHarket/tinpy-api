
const {OAuth2Client} = require("google-auth-library")
const client = new OAuth2Client(process.env.GOOGLE_CLIEN_ID);

const googleVerify = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIEN_ID,
  });
  const { email: correo } = ticket.getPayload();

  return { correo };
};

module.exports = googleVerify