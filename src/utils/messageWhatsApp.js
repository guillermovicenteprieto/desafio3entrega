import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const WSPHONE = process.env.WSPHONE;
const client = twilio(accountSid, authToken);

//para testear: enviar primero un mensaje con las palabras 'join labor-trip' al número de Whatsapp de Twilio

const sendWhatsApp = async (phone, message, detalle) => {
  client.messages
    .create({
      body: message + " " + detalle,
      // mediaUrl: ['https://res.cloudinary.com/hdsqazxtw/image/upload/v1559681445/logo_coderhouse_2_bmqbet.png'],
      from: "whatsapp:+14155238886",
      to: "whatsapp:+" + WSPHONE,
    })
    .then((message) => console.log(message.sid));
};
export default sendWhatsApp;