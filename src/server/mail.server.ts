import nodemailer from "nodemailer";

let transport: nodemailer.Transporter | null | undefined;

function getTransport() {
  if (transport !== undefined) return transport;
  const url = process.env.SMTP_URL; // e.g. smtps://user:pass@smtp.example.com:465
  transport = url ? nodemailer.createTransport(url) : null;
  return transport;
}

/** Send an email via SMTP_URL. Without SMTP configured, the message is logged to the server console. */
export async function sendMail(to: string, subject: string, text: string) {
  const t = getTransport();
  if (!t) {
    console.info(`[mail] SMTP_URL not set — would send to ${to}:\n${subject}\n${text}`);
    return;
  }
  await t.sendMail({
    from: process.env.MAIL_FROM || "Postpidia <no-reply@postpidia.com>",
    to,
    subject,
    text,
  });
}
