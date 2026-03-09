import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, language } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email if SMTP credentials are configured
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"Skinderma Website" <${smtpUser}>`,
        to: 'adithyodw@gmail.com',
        replyTo: email,
        subject: `[Skinderma Contact] ${subject} — from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A">
            <div style="background:#0D7377;padding:24px 32px;border-radius:12px 12px 0 0">
              <h1 style="color:#fff;margin:0;font-size:20px;font-weight:600">New Contact Enquiry</h1>
              <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">Skinderma Aesthetic Clinic — Website Form</p>
            </div>
            <div style="background:#f9f9f9;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;font-size:13px;color:#6b7280;width:120px">Name</td><td style="padding:8px 0;font-size:14px;font-weight:600">${name}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#6b7280">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#0D7377">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding:8px 0;font-size:13px;color:#6b7280">Phone/WA</td><td style="padding:8px 0;font-size:14px">${phone}</td></tr>` : ''}
                <tr><td style="padding:8px 0;font-size:13px;color:#6b7280">Subject</td><td style="padding:8px 0;font-size:14px">${subject}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#6b7280">Language</td><td style="padding:8px 0;font-size:14px">${language === 'id' ? 'Bahasa Indonesia' : 'English'}</td></tr>
              </table>
              <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb">
                <p style="font-size:13px;color:#6b7280;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Message</p>
                <p style="font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap">${message}</p>
              </div>
              <p style="font-size:12px;color:#9ca3af;margin-top:24px;text-align:center">Sent from skinderma-clinic.com contact form</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
