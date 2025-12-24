import nodemailer from 'nodemailer';

/**
 * Email Service Utility
 * 
 * To use this in production:
 * 1. Add EMAIL_USER and EMAIL_PASS to your .env file
 * 2. Update the host/port for your provider (e.g., Gmail, SendGrid, Resend)
 */

const transporter = nodemailer.createTransport({
    // Example: Using a local or dummy SMTP for development
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: process.env.EMAIL_PORT || 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendWelcomeEmail(toEmail, userName) {
    if (!process.env.EMAIL_USER) {
        console.log(`[MOCK EMAIL] To: ${toEmail} | Subject: Welcome to Sri Lakshmi Narayana Handlooms!`);
        console.log(`Message: Hi ${userName}, thank you for registering naturally with us!`);
        return { success: true, mock: true };
    }

    const mailOptions = {
        from: '"Sri Lakshmi Narayana Handlooms" <no-reply@slnh.com>',
        to: toEmail,
        subject: 'Welcome to Sri Lakshmi Narayana Handlooms!',
        html: `
            <div style="font-family: 'Playfair Display', serif; color: #5E0B15; padding: 20px; border: 1px solid #D4AF37;">
                <h1 style="color: #5E0B15;">Welcome to SLNH, ${userName}!</h1>
                <p>Thank you for registering with us. We are honored to have you as part of our community of handloom enthusiasts.</p>
                <p>Explore our latest collections of Banarasi, Kanchipuram, and Handloom cotton sarees.</p>
                <div style="margin-top: 30px;">
                    <a href="${process.env.NEXTAUTH_URL}/shop" style="background-color: #5E0B15; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Start Shopping</a>
                </div>
                <p style="margin-top: 40px; font-size: 12px; color: #666;">
                    Sri Lakshmi Narayana Handlooms<br/>
                    Shop No. 144, LPT Market, LB Nagar, Hyderabad<br/>
                    Phone: +91 9440923421
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${toEmail}`);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
