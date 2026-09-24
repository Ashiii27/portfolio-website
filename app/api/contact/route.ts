import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = (await request.json()) as Record<string, unknown>;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !emailPattern.test(email.trim()) ||
      !message.trim()
    ) {
      return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
    }

    if (name.length > 100 || email.length > 160 || message.length > 4000) {
      return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;
    if (!apiKey || !toEmail) {
      return NextResponse.json({ error: "Contact delivery is not configured." }, { status: 503 });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = typeof subject === "string" ? escapeHtml(subject.trim().slice(0, 160)) : "";
    const safeMessage = escapeHtml(message.trim());
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email.trim(),
      subject: safeSubject || `New portfolio message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#191917">
          <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase">Portfolio enquiry</p>
          <h1 style="font-size:28px">New message from ${safeName}</h1>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${safeSubject ? `<p><strong>Subject:</strong> ${safeSubject}</p>` : ""}
          <hr style="border:0;border-top:1px solid #d5d0c6;margin:24px 0" />
          <p style="white-space:pre-wrap;line-height:1.6">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Contact delivery failed", error);
      return NextResponse.json({ error: "Message delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact request failed", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
