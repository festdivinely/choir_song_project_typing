// /src/lib/email/templates/backupCodes.ts
export const backupCodesTemplate = (data: {
    username: string;
    backupCodes: string[];
    supportEmail: string;
}) => {
    const { username, backupCodes, supportEmail } = data;

    return {
        subject: 'Your Two-Factor Authentication Backup Codes - Quantum Robots',
        text: `
Two-Factor Authentication Backup Codes - Quantum Robots

Hello ${username},

Your two-factor authentication setup is complete! Below are your backup codes. Save them in a secure place - you will need them if you lose access to your authenticator app.

BACKUP CODES:
${backupCodes.map((code, index) => `${index + 1}. ${code}`).join('\n')}

IMPORTANT:
• Each backup code can only be used once
• Store these codes in a secure location (password manager, encrypted file, or printed copy)
• These codes will not be shown again
• If you lose all backup codes, you will need to disable and re-enable two-factor authentication

To use a backup code:
1. When prompted for a two-factor code, select "Use backup code"
2. Enter one of the codes above
3. The used code will be invalidated

Need help? Contact ${supportEmail}
    `,
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backup Codes - Quantum Robots</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            .backup-code {
                font-size: 14px !important;
                padding: 8px !important;
            }
        }
    </style>
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
              <h2 style="margin-top:0; color:#000000;">Your Two-Factor Authentication Backup Codes</h2>
              <p>Hello ${username},</p>
              <p>Your two-factor authentication setup is complete! Below are your backup codes. <strong>Save them in a secure place</strong> - you will need them if you lose access to your authenticator app.</p>
              
              <div style="text-align:center; margin:30px 0;">
                <div style="background:#000000; color:#00ff41; padding:25px; border-radius:10px; margin:20px 0; text-align:center;">
                  <h3 style="margin-top:0; color:#00ff41; font-size:20px;">BACKUP CODES</h3>
                  ${backupCodes.map((code, index) => `
                    <div style="background:#111111; color:#00ff41; font-family: 'Courier New', monospace; font-size:18px; font-weight:bold; padding:12px; margin:8px 0; border-radius:6px; border:1px solid #00ff41; letter-spacing:2px;">
                      ${index + 1}. ${code}
                    </div>
                  `).join('')}
                </div>
              </div>
              
              <div style="background:#fff8e1; padding:20px; border-radius:8px; border-left:4px solid #ff9800; margin:20px 0;">
                <h3 style="margin-top:0; color:#e65100;">⚠️ IMPORTANT INFORMATION</h3>
                <ul style="margin:10px 0 0 0; padding-left:20px;">
                  <li>Each backup code can only be used <strong>once</strong></li>
                  <li>Store these codes in a <strong>secure location</strong> (password manager, encrypted file, or printed copy)</li>
                  <li>These codes will <strong>not be shown again</strong></li>
                  <li>If you lose all backup codes, you will need to disable and re-enable two-factor authentication</li>
                </ul>
              </div>
              
              <div style="background:#e8f5e9; padding:20px; border-radius:8px; border-left:4px solid #4CAF50; margin:20px 0;">
                <h3 style="margin-top:0; color:#2e7d32;">How to Use Backup Codes</h3>
                <ol style="margin:10px 0 0 0; padding-left:20px;">
                  <li>When prompted for a two-factor code in the Quantum Robots app, select <strong>"Use backup code"</strong></li>
                  <li>Enter one of the codes from the list above</li>
                  <li>The used code will be invalidated (you can no longer use it)</li>
                  <li>Generate new backup codes if you're running low</li>
                </ol>
              </div>
              
              <p style="text-align:center; font-size:14px; color:#666;">
                <em>These backup codes are unique to your account. Do not share them with anyone.</em>
              </p>
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