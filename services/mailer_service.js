// 2 mail templates using SG mail. One to send an invite, and one to reset the users password //

const sgMail = require('@sendgrid/mail');

const sendInvite = (recipientEmail, recipientName, companyName, inviteLink) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: recipientEmail,
        from: process.env.EMAIL_ADDRESS,
        subject: `An Invitation from ${companyName}`,
        html: `
        <h2>Hi ${recipientName},</h2>
        <br>
        <p>You have been invited to participate in ongoing wellness checkins by ${companyName}.</p>
        <br>
        <p>To accept this request, please click the following link</p>
        <a href=${inviteLink}>Join now!</a>
        `,
    };

    sgMail.send(msg);
};

const resetPassword = (recipientEmail, recipientName, link) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: recipientEmail,
        from: process.env.EMAIL_ADDRESS,
        subject: `Please reset your password`,
        html: `
        <p>Hi ${recipientName},</p>
        <p>We received a request to reset your Swellbeing password.</p>
        <p>Please click the link below to set a new password:</p>
        <br>
        <a href=${link}>Reset Your Password</a>
        `,
    };

    sgMail.send(msg);
};

module.exports = {
    sendInvite,
    resetPassword
};