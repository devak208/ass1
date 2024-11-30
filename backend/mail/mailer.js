const nodemailer = require('nodemailer');

exports.sendFollowNotification = async (recipientEmail, senderName) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: recipientEmail,
        subject: 'You have a new follower!',
        text: `${senderName} has started following you.`,
    };

    await transporter.sendMail(mailOptions);
};
