import dotenv from "dotenv";
dotenv.config();
import { createTransport } from 'nodemailer';

const TEST_MAIL_ETHEREAL = process.env.TEST_MAIL_ETHEREAL
const PASS_MAIL_ETHEREAL = process.env.PASS_MAIL_ETHEREAL

const sendEmail = async (email, subject, text) => {
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: TEST_MAIL_ETHEREAL,
            pass: PASS_MAIL_ETHEREAL
        }
    });
    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL_ETHEREAL,
        subject: 'Correo de Bienvenida enviado desde Node.js',
        html: '<h1 style="color: blue;">Mensaje de bienvenida enviado desde <span style="color: green;">Node.js</span> a través del servicio de <span style="color: green;">Nodemailer</span></h1>',
        text: 'Mensaje de bienvenida, mensaje enviado a través de Nodemailer',
        attachments: [
            {
                filename: 'archivo.txt',
                content: 'Contenido del archivo',
                contentType: 'text/plain'
            }
        ]
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}
export default sendEmail;