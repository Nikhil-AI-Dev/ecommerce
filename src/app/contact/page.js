"use client";
import Drawing from 'next/image'; // Placeholder import just for standard practice if we added images
import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Contact error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '80px 20px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '48px', fontFamily: 'var(--font-family-heading)' }}>Get in Touch</h1>

                {submitted ? (
                    <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#f0fdf4', borderRadius: '12px', color: '#15803d' }}>
                        <h2>Thank you for your message!</h2>
                        <p>We will get back to you shortly.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <h2 style={{ marginBottom: '24px', fontFamily: 'var(--font-family-heading)' }}>Get in Touch</h2>

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ color: 'var(--color-primary)', marginBottom: '5px' }}>Visit Our Store</h4>
                                <p>Shop No. 144, LPT Market, LB Nagar,<br />Hyderabad, Telangana 500074</p>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ color: 'var(--color-primary)', marginBottom: '5px' }}>Call Us</h4>
                                <p>+91 9440923421</p>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ color: 'var(--color-primary)', marginBottom: '5px' }}>Email Us</h4>
                                <p>info@slnh.com</p>
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', marginBottom: '15px' }}>Follow Us</h4>
                                <div style={{ display: 'flex', gap: '20px', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                                    <span>Instagram</span>
                                    <span>YouTube</span>
                                </div>
                                <p style={{ fontSize: '11px', color: '#aaa', marginTop: '10px' }}>(Social links coming soon)</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ padding: '16px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ padding: '16px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}
                            />
                            <textarea
                                placeholder="How can we help?"
                                rows={5}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{ padding: '16px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', fontFamily: 'inherit' }}
                            ></textarea>
                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
}
