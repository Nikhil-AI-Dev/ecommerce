"use client";
import Navbar from '../../components/Navbar';

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <section style={{ padding: '80px 20px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '48px', marginBottom: '24px', fontFamily: 'var(--font-family-heading)' }}>Our Heritage</h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto 48px', fontSize: '18px', color: '#555', lineHeight: '1.6' }}>
                        Founded in 1995, Sri Lakshmi Narayana Handlooms has been a custodian of India's rich weaving traditions.
                        We believe that every saree tells a story—a story of the weaver's skill, the region's culture, and the wearer's grace.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '60px' }}>
                        <div style={{ padding: '40px', backgroundColor: '#fdfbf7', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--color-primary)' }}>Authenticity</h3>
                            <p>Directly sourced from master weavers in Dharmavaram, Kanchipuram, and Banaras.</p>
                        </div>
                        <div style={{ padding: '40px', backgroundColor: '#fdfbf7', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--color-primary)' }}>Quality</h3>
                            <p>Every thread is inspected. We guarantee the purity of our Silk and Zari.</p>
                        </div>
                        <div style={{ padding: '40px', backgroundColor: '#fdfbf7', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--color-primary)' }}>Service</h3>
                            <p>From our family to yours. We provide personalized drape consultations and care guides.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
