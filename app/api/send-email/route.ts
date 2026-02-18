// /src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { transporter } from "../../../lib/emailTransport/transporter";
import { emailVerificationTemplate } from "../../../lib/emailTemplates/emailVerification";
import { deviceVerificationTemplate } from "../../../lib/emailTemplates/deviceVerification";
import { passwordResetTemplate } from "../../../lib/emailTemplates/passwordReset";
import { backupCodesTemplate } from "../../../lib/emailTemplates/backpCodes";
import { backupCodeUsedTemplate } from "../../../lib/emailTemplates/backupCodeInfo";

type EmailType = "email_verification" | "device_verification" | "password_reset" | "backup_codes" | "backup_code_used";

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
    backup_codes: {
        username: string;
        backupCodes: string[];
        supportEmail: string;
    };
    backup_code_used: {
        username: string;
        timestamp: string;
        ip: string;
        country: string;
        deviceInfo: string;
        remainingCodes: number;
        action: string;
        supportEmail: string;
    };
}

// ✅ ADD THIS TYPE DEFINITION:
type EmailRequestBody<T extends EmailType = EmailType> = {
    type: T;
    to: string;
    data: EmailDataMap[T];
};

const getTemplate = (type: EmailType, data: EmailDataMap[EmailType]): {
    subject: string;
    text: string;
    html: string;
} => {
    switch (type) {
        case "email_verification":
            return emailVerificationTemplate(data as EmailDataMap["email_verification"]);
        case "device_verification":
            return deviceVerificationTemplate(data as EmailDataMap["device_verification"]);
        case "password_reset":
            return passwordResetTemplate(data as EmailDataMap["password_reset"]);
        case "backup_codes":
            return backupCodesTemplate(data as EmailDataMap["backup_codes"]);
        case "backup_code_used":
            return backupCodeUsedTemplate(data as EmailDataMap["backup_code_used"]);
        default:
            throw new Error(`Unknown email type: ${type}`);
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

