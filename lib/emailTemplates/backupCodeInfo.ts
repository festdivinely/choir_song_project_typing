// /src/lib/email/templates/backupCodeUsed.ts
export const backupCodeUsedTemplate = (data: {
    username: string;
    timestamp: string;
    ip: string;
    country: string;
    deviceInfo: string;
    remainingCodes: number;
    action: string;
    supportEmail: string;
}) => {
    const { username, timestamp, ip, country, deviceInfo, remainingCodes, action, supportEmail } = data;

    // Determine warning level based on remaining codes
    let warningLevel = 'info';
    let warningMessage = '';

    if (remainingCodes <= 2) {
        warningLevel = 'critical';
        warningMessage = `⚠️ CRITICAL: You only have ${remainingCodes} backup code(s) remaining! Please generate new backup codes immediately in your security settings.`;
    } else if (remainingCodes <= 3) {
        warningLevel = 'warning';
        warningMessage = `⚠️ Warning: You only have ${remainingCodes} backup codes remaining. Consider generating new backup codes.`;
    } else if (remainingCodes <= 5) {
        warningLevel = 'info';
        warningMessage = `ℹ️ You have ${remainingCodes} backup codes remaining.`;
    }

    return {
        subject: `Security Alert: Backup Code Used - ${remainingCodes} Codes Remaining - Quantum Robots`,
        text: `
Security Alert: Backup Code Used - Quantum Robots

Hello ${username},

A backup code was used to access your Quantum Robots account. This is a security notification to keep you informed about your account activity.

🔐 SECURITY EVENT DETAILS:
- Action: ${action}
- Time: ${new Date(timestamp).toLocaleString()}
- IP Address: ${ip}
- Location: ${country}
- Device: ${deviceInfo}

📊 BACKUP CODES STATUS:
- Remaining Backup Codes: ${remainingCodes}
- Status: ${remainingCodes <= 2 ? 'CRITICAL - Generate new codes immediately' : remainingCodes <= 3 ? 'LOW - Consider generating new codes' : 'OK'}

${warningMessage}

📝 IMPORTANT INFORMATION:
• Each backup code works only ONCE
• Used backup codes are permanently removed
• Store your backup codes in a secure location (password manager, encrypted file)
• If you lose all backup codes, account recovery will be required

🔒 RECOMMENDED ACTIONS:
1. Verify this was you who used the backup code
2. ${remainingCodes <= 3 ? 'GENERATE NEW BACKUP CODES IMMEDIATELY in security settings' : 'Consider generating new backup codes when convenient'}
3. Review your account security settings
4. Ensure your primary authentication method (Google Authenticator) is working

If this wasn't you:
• Change your password immediately
• Review your account activity
• Contact support: ${supportEmail}

Stay secure,
Quantum Robots Team
    `,
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backup Code Used - Quantum Robots</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            .status-box {
                padding: 15px !important;
                margin: 10px 0 !important;
            }
        }
        .status-critical { background-color: #ffebee; border-color: #f44336; }
        .status-warning { background-color: #fff8e1; border-color: #ff9800; }
        .status-info { background-color: #e8f5e9; border-color: #4CAF50; }
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
              <h2 style="margin-top:0; color:#000000;">Security Alert: Backup Code Used</h2>
              <p>Hello ${username},</p>
              <p>A backup code was used to access your Quantum Robots account. This is a security notification to keep you informed about your account activity.</p>
              
              <div style="background:#000000; color:#00ff41; padding:25px; border-radius:10px; margin:20px 0; text-align:center;">
                <h3 style="margin-top:0; color:#00ff41; font-size:20px;">🔐 SECURITY EVENT</h3>
                <div style="display:grid; grid-template-columns:1fr; gap:10px; text-align:left; margin-top:15px;">
                  <div><strong>Action:</strong> ${action}</div>
                  <div><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</div>
                  <div><strong>IP Address:</strong> ${ip}</div>
                  <div><strong>Location:</strong> ${country}</div>
                  <div><strong>Device:</strong> ${deviceInfo}</div>
                </div>
              </div>
              
              <div style="text-align:center; margin:30px 0;">
                <div style="background:#000000; color:#00ff41; padding:25px; border-radius:10px; margin:20px 0; text-align:center;">
                  <h3 style="margin-top:0; color:#00ff41; font-size:20px;">📊 BACKUP CODES STATUS</h3>
                  <div style="font-size:48px; font-weight:bold; margin:20px 0; color:#00ff41;">
                    ${remainingCodes}
                  </div>
                  <div style="font-size:18px; margin-bottom:20px;">
                    Backup Codes Remaining
                  </div>
                  ${remainingCodes <= 2
                ? '<div style="background:#f44336; color:white; padding:10px; border-radius:6px; font-weight:bold;">🚨 CRITICAL - Generate new codes immediately</div>'
                : remainingCodes <= 3
                    ? '<div style="background:#ff9800; color:white; padding:10px; border-radius:6px; font-weight:bold;">⚠️ LOW - Consider generating new codes</div>'
                    : '<div style="background:#4CAF50; color:white; padding:10px; border-radius:6px; font-weight:bold;">✅ OK</div>'
            }
                </div>
              </div>
              
              ${warningMessage ? `
              <div style="background:${warningLevel === 'critical' ? '#ffebee' : warningLevel === 'warning' ? '#fff8e1' : '#e8f5e9'}; 
                    border-left:4px solid ${warningLevel === 'critical' ? '#f44336' : warningLevel === 'warning' ? '#ff9800' : '#4CAF50'}; 
                    padding:20px; border-radius:8px; margin:20px 0;">
                <h3 style="margin-top:0; color:${warningLevel === 'critical' ? '#c62828' : warningLevel === 'warning' ? '#e65100' : '#2e7d32'};">${warningLevel === 'critical' ? '🚨 CRITICAL ALERT' : warningLevel === 'warning' ? '⚠️ WARNING' : 'ℹ️ INFORMATION'}</h3>
                <p style="margin:0; font-size:16px; font-weight:500;">${warningMessage}</p>
              </div>
              ` : ''}
              
              <div style="background:#f5f5f5; padding:20px; border-radius:8px; margin:20px 0;">
                <h3 style="margin-top:0; color:#000000;">📝 IMPORTANT INFORMATION</h3>
                <ul style="margin:10px 0 0 0; padding-left:20px;">
                  <li>Each backup code works only <strong>ONCE</strong></li>
                  <li>Used backup codes are <strong>permanently removed</strong></li>
                  <li>Store your backup codes in a <strong>secure location</strong> (password manager, encrypted file)</li>
                  <li>If you lose all backup codes, account recovery will be required</li>
                </ul>
              </div>
              
              <div style="background:#e3f2fd; padding:20px; border-radius:8px; border-left:4px solid #2196F3; margin:20px 0;">
                <h3 style="margin-top:0; color:#1565c0;">🔒 RECOMMENDED ACTIONS</h3>
                <ol style="margin:10px 0 0 0; padding-left:20px;">
                  <li><strong>Verify</strong> this was you who used the backup code</li>
                  <li><strong>${remainingCodes <= 3 ? 'GENERATE NEW BACKUP CODES IMMEDIATELY' : 'Consider generating new backup codes'}</strong> in your security settings</li>
                  <li><strong>Review</strong> your account security settings</li>
                  <li><strong>Ensure</strong> your primary authentication method (Google Authenticator) is working</li>
                </ol>
              </div>
              
              <div style="background:#ffebee; padding:20px; border-radius:8px; border-left:4px solid #f44336; margin:20px 0;">
                <h3 style="margin-top:0; color:#c62828;">🚨 IF THIS WASN'T YOU:</h3>
                <ul style="margin:10px 0 0 0; padding-left:20px;">
                  <li><strong>Change your password immediately</strong></li>
                  <li><strong>Review your account activity</strong></li>
                  <li><strong>Contact support:</strong> <a href="mailto:${supportEmail}" style="color:#f44336; text-decoration:none;">${supportEmail}</a></li>
                </ul>
              </div>
              
              <p style="text-align:center; font-size:14px; color:#666; margin-top:30px;">
                <em>This is an automated security notification. Please do not reply to this email.</em>
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