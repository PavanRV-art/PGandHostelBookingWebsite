import nodemailer from 'nodemaier'

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: Process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,

    },
});

export default transporter