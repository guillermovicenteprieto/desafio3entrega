import dotenv from "dotenv";
dotenv.config();
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const PHONE = process.env.PHONE
const client = twilio(accountSid, authToken)

const sendSMS = async (phone, text) => {
   try {
      const message = await client.messages.create({
         body: 'Hola! esta es una bienvenida! mensaje enviado desde Nodejs + Twilio! 🛰️',
         from: '+19707177273',
         to: PHONE
      })
      console.log(message)
   } catch (error) {
      console.log(error)
   }
}
export default sendSMS;