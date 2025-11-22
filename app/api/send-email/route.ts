// /src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { transporter } from "../../../lib/emailTransport/transporter";
import { emailVerificationTemplate } from "../../../lib/emailTemplates/emailVerification";
import { deviceVerificationTemplate } from "../../../lib/emailTemplates/deviceVerification";
import { passwordResetTemplate } from "../../../lib/emailTemplates/passwordReset";

type EmailType = "email_verification" | "device_verification" | "password_reset";

interface EmailRequestBody {
    type: EmailType;
    to: string;
    data: any;
}

const getTemplate = (type: EmailType, data: any) => {
    switch (type) {
        case "email_verification":
            return emailVerificationTemplate(data);
        case "device_verification":
            return deviceVerificationTemplate(data);
        case "password_reset":
            return passwordResetTemplate(data);
        default:
            throw new Error("Unknown email type");
    }
};

export async function POST(request: Request) {
    try {
        const body: EmailRequestBody = await request.json();
        const { type, to, data } = body;

        if (!type || !to || !data) {
            return NextResponse.json({ success: false, message: "Missing fields: type, to or data" }, { status: 400 });
        }

        if (!process.env.EMAIL_SENDER || !process.env.EMAIL_PASSWORD) {
            console.error("Email creds not set");
            return NextResponse.json({ success: false, message: "Email credentials not set" }, { status: 500 });
        }

        const emailContent = getTemplate(type, data);

        await transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to,
            subject: emailContent.subject,
            text: emailContent.text,
            html: emailContent.html,
        });

        return NextResponse.json({ success: true, message: "Email sent successfully" });

    } catch (error: any) {
        console.error("Email error:", error);
        return NextResponse.json({ success: false, message: error.message || "Email service error" }, { status: 500 });
    }
}
