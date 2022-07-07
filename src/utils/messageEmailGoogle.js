import dotenv from "dotenv";
dotenv.config();
import { createTransport } from 'nodemailer';

const TEST_EMAIL_ETHEREAL = process.env.TEST_MAIL_ETHEREAL
const FROM_EMAIL_GOOGLE = process.env.FROM_EMAIL_GOOGLE;
const PASS_EMAIL_GOOGLE = process.env.PASS_EMAIL_GOOGLE;

const sendEmailGoogle = async (email, subject, text) => {
    const transporter = createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: FROM_EMAIL_GOOGLE,
            pass: PASS_EMAIL_GOOGLE
        },
    });
    const mailOptions = {
        from: 'Servidor Node.js',
        to: FROM_EMAIL_GOOGLE, //TEST_MAIL_ETHEREAL, 
        subject: 'Correo BIENVENIDA! enviado desde node.js',
        html: '<h1 style="color: blue;">Contenido de prueba enviado desde <span style="color: green;">Node.js</span> a través del servicio de <span style="color: green;">Nodemailer</span></h1>',
        text: 'Mensaje de bienvenida, mensaje enviado a través de Nodemailer',
        attachments: [
            {
                filename: 'archivo.txt',
                content: 'Contenido del archivo: es un archivo de prueba',
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
export default sendEmailGoogle;