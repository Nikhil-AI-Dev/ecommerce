import nodemailer from 'nodemailer';

/**
 * Email Service Utility
 * 
 * To use this in production:
 * 1. Add EMAIL_USER and EMAIL_PASS to your .env file
 * 2. Update the host/port for your provider (e.g., Gmail, SendGrid, Resend)
 */

const transporter = process.env.EMAIL_USER ? nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
}) : null;

const EMAIL_FROM = process.env.EMAIL_FROM || '"Sri Lakshmi Narayana Handlooms" <support@srilakshminarayana.com>';


export async function sendWelcomeEmail(toEmail, userName) {
    // For local development without email configured
    console.info(`[Auth] Email feature is active. (EMAIL_USER not set)`);

    const mailOptions = {
        from: EMAIL_FROM,
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
        if (transporter) {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent successfully to ${toEmail}`);
        }
        return { success: true };
    } catch (error) {

        console.error("Error sending email:", error);
        return { success: false, error };
    }
}

export async function sendOrderConfirmationEmail(toEmail, orderId, totalAmount) {
    if (!process.env.EMAIL_USER) {
        console.log(`[MOCK EMAIL] To: ${toEmail} | Subject: Order Confirmed - #ORD-${orderId}`);
        console.log(`Message: Thank you for your order of ₹${totalAmount}. We are preparing your sarees now.`);
        return { success: true, mock: true };
    }

    const mailOptions = {
        from: EMAIL_FROM,
        to: toEmail,
        subject: `Your Sri Lakshmi Narayana Handlooms Order [#ORD-${orderId}]`,
        html: `
            <div style="font-family: 'Playfair Display', serif; color: #5E0B15; padding: 20px; border: 1px solid #D4AF37;">
                <h1 style="color: #5E0B15;">Order Confirmed!</h1>
                <p>Thank you for choosing Sri Lakshmi Narayana Handlooms. We have received your order and are currently preparing it with the utmost care.</p>
                
                <div style="background-color: #fcfaf7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>Order Number:</strong> #ORD-${orderId}</p>
                    <p style="margin: 5px 0 0 0;"><strong>Total Amount:</strong> ₹${totalAmount.toLocaleString('en-IN')}</p>
                </div>

                <p>You can track your order status in your <a href="${process.env.NEXTAUTH_URL}/orders" style="color: #5E0B15; font-weight: bold;">Order History</a>.</p>
                
                <p style="margin-top: 40px; font-size: 12px; color: #666;">
                    Sri Lakshmi Narayana Handlooms<br/>
                    Shop No. 144, LPT Market, LB Nagar, Hyderabad<br/>
                    Phone: +91 9440923421
                </p>
            </div>
        `,
    };

    try {
        if (transporter) {
            await transporter.sendMail(mailOptions);
        }
        return { success: true };
    } catch (error) {

        console.error("Order completion email error:", error);
        return { success: false, error };
    }
}
