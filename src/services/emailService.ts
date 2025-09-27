import { sgMail } from "../lib/mailer.js"

export async function sendGiftEmail(recipientEmail: string, message: string, shareLink: string) {
  const msg = {
    to: recipientEmail,
    from: process.env.SMTP_USER!,
    subject: 'Gift received',
    html: `
      <h2>Hello!</h2>
      <p>You received a <b>gift card</b></p>
      ${message ? `<p><b>Message:</b> ${message}</p>`: ""}
      <p>Access your gift at this link: 
         <a href="${shareLink}" target="_blank">${shareLink}</a>
      </p>
    `,
  }

  try {
    await sgMail.send(msg)
    console.log('Email sent successfully via SendGrid')
  } catch (error) {
    console.error('Error sending email via SendGrid:', error)
    throw error
  }
}
