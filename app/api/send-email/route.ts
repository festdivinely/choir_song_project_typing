// /src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { transporter } from "../../../lib/emailTransport/transporter";
import { emailVerificationTemplate } from "../../../lib/emailTemplates/emailVerification";
import { deviceVerificationTemplate } from "../../../lib/emailTemplates/deviceVerification";
import { passwordResetTemplate } from "../../../lib/emailTemplates/passwordReset";
import { backupCodesTemplate } from "../../../lib/emailTemplates/backpCodes"; // Add this import

type EmailType = "email_verification" | "device_verification" | "password_reset" | "backup_codes"; // Add backup_codes type

// Define a generic email data type for each template
interface EmailDataMap {
    email_verification: {
        username: string;
        verificationCode: string;
        supportEmail: string;
    };
    device_verification: {
        username: string;
        deviceInfo: string;
        ip: string;
        country: string;
        timestamp: string | number;
        verificationCode: string;
        supportEmail: string;
    };
    password_reset: {
        username: string;
        resetCode: string;
        supportEmail: string;
    };
    backup_codes: { // Add backup_codes type
        username: string;
        backupCodes: string[];
        supportEmail: string;
    };
}

type EmailRequestBody<T extends EmailType = EmailType> = {
    type: T;
    to: string;
    data: EmailDataMap[T];
};

// Template selector - Update to include backup_codes
const getTemplate = (type: EmailType, data: EmailDataMap[EmailType]) => {
    switch (type) {
        case "email_verification":
            return emailVerificationTemplate(data as EmailDataMap["email_verification"]);
        case "device_verification":
            return deviceVerificationTemplate(data as EmailDataMap["device_verification"]);
        case "password_reset":
            return passwordResetTemplate(data as EmailDataMap["password_reset"]);
        case "backup_codes": // Add this case
            return backupCodesTemplate(data as EmailDataMap["backup_codes"]);
        default:
            throw new Error("Unknown email type");
    }
};

export async function POST(request: NextRequest) {
    try {
        const body: EmailRequestBody = await request.json();
        const { type, to, data } = body;

        if (!type || !to || !data) {
            return NextResponse.json(
                { success: false, message: "Missing fields: type, to or data" },
                { status: 400 }
            );
        }

        if (!process.env.EMAIL_SENDER || !process.env.EMAIL_PASSWORD) {
            console.error("Email credentials not set");
            return NextResponse.json(
                { success: false, message: "Email credentials not set" },
                { status: 500 }
            );
        }

        const emailContent = getTemplate(type, data);

        await transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to,
            subject: emailContent.subject,
            text: emailContent.text,
            html: emailContent.html,
        });

        console.info("Email sent successfully", {
            type,
            to,
            subject: emailContent.subject
        });

        return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        const err = error as Error;
        console.error("Email service error:", err.message);
        return NextResponse.json(
            { success: false, message: err.message || "Email service error" },
            { status: 500 }
        );
    }
}