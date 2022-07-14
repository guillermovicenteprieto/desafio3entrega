import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const PHONE = process.env.PHONE;
const client = twilio(accountSid, authToken);

const sendSMS = async (phone, message, detalle) => {
  try {
    const messages = await client.messages.create({
      body: message + " " + detalle,
      from: "+19707177273",
      to: "+" + PHONE,
    });
    console.log(messages);
  } catch (error) {
    console.log(error);
  }
};
export default sendSMS;