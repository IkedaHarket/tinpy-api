const nodemailer = require("nodemailer");
const {google} = require("googleapis")


const sendCorreo = async(mailOptions)=>{
    try {
        const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
        const REFRESH_TOKEN= '1//040jmaMvqcRd-CgYIARAAGAQSNwF-L9IrkchaMaSNS2YUagE-a_VLImfIA3OzQ_9d-aH3ic045havY1w4euLPrss-3GBy2f7YISI'

        const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIEN_ID, process.env.GOOGLE_SECRET_ID,REDIRECT_URI);
        oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
        
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type:'OAuth2',
                user:process.env.CORREOGMAIL,
                clientId: process.env.GOOGLE_CLIEN_ID,
                clientSecret: process.env.GOOGLE_SECRET_ID,
                refreshToken: REFRESH_TOKEN,
                accessToken
            }
        });
        
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = {
    sendCorreo
}
