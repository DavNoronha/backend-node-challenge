import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  connectionTimeout: 60000, // 60 segundos
  greetingTimeout: 30000,   // 30 segundos
  socketTimeout: 60000      // 60 segundos
})
