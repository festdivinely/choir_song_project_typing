// /src/lib/email/templates/emailVerification.ts
export const emailVerificationTemplate = (data: {
  username: string;
  verificationCode: string;
  supportEmail: string;
}) => {
  const { username, verificationCode, supportEmail } = data;

  return {
    subject: 'Verify Your Email - Quantum Robots',
    text: `
Welcome to Quantum Robots

To verify your email, use the following verification code:

Verification Code: ${verificationCode}

Enter this code in the Quantum Robots app to complete your registration.

This code expires in 15 minutes. If you didn't register, ignore this email.

Need help? Contact ${supportEmail}
    `,
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Quantum Robots</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f7fb;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden;">
          <tr>
            <td align="center" style="background: #000000; padding:30px; color:#00ff41; font-size:24px; font-weight:bold;">
              QUANTUM ROBOTS
            </td>
          </tr>
          <tr>
            <td style="padding:30px; color:#333333; font-size:16px; line-height:1.6;">
              <h2 style="margin-top:0; color:#000000;">Welcome, ${username}!</h2>
              <p>To verify your email, use the verification code below in the Quantum Robots app:</p>
              
              <div style="text-align:center; margin:30px 0;">
                <div style="font-size:32px; font-weight:bold; letter-spacing:8px; color:#000000; background:#f0f0f0; padding:20px; border-radius:8px; display:inline-block; border: 3px solid #00ff41;">
                  ${verificationCode}
                </div>
              </div>
              
              <div style="background:#f8f9fa; padding:15px; border-radius:8px; border-left:4px solid #00ff41;">
                <p style="margin:0; font-size:14px;"><strong>How to use this code:</strong></p>
                <ol style="margin:10px 0 0 0; padding-left:20px; font-size:14px;">
                  <li>Open the Quantum Robots mobile app</li>
                  <li>Go to the Email Verification screen</li>
                  <li>Enter the code above</li>
                  <li>Click "Verify Email"</li>
                </ol>
              </div>
              
              <p style="margin-top:20px;">This code expires in <b>15 minutes</b>. If you didn't sign up, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="background:#000000; color:#00ff41; padding:20px; font-size:13px;">
              &copy; ${new Date().getFullYear()} Quantum Robots. All rights reserved.<br/>
              Need help? <a href="mailto:${supportEmail}" style="color:#00ff41; text-decoration:none;">Contact Support</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  };
};