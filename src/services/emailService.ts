import { transporter } from "../lib/mailer.js"

export async function sendGiftEmail(recipientEmail: string, message: string, shareLink: string) {
  try {
    await transporter.sendMail({
      from: `"Gift Cards" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: "Gift received",
      html: `
        <h2>Hello!</h2>
        <p>You received a <b>gift card</b></p>
        ${message ? `<p><b>Message:</b> ${message}</p>`: ""}
        <p>Access your gift at this link: 
          <a href="${shareLink}" target="_blank">${shareLink}</a>
        </p>
      `,
    })
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
