"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            setIsSubmitting(false);
            return;
        }

        try {
            const resUserExists = await fetch("/api/userExists", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists.");
                setIsSubmitting(false);
                return;
            }

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                setSuccessMessage("Welcome to Sri Lakshmi Narayana Handlooms! Redirecting to login...");
                setError("");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setError("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
            setError("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container" style={{ maxWidth: '400px', marginTop: '80px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h1>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />
                    {error && (
                        <div style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div style={{ color: 'green', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
                            {successMessage}
                        </div>
                    )}
                    <button className="btn btn-primary" type="submit" style={{ width: '100%' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                    <p>Already have an account? <Link href="/login" style={{ color: 'var(--color-primary)' }}>Login here</Link></p>
                </div>
            </div>
        </>
    );
}
