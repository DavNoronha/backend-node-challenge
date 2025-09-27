import sgMail from '@sendgrid/mail'

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export { sgMail }
