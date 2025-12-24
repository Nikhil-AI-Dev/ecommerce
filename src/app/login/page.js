"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container" style={{ maxWidth: '400px', marginTop: '80px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />
                    {error && (
                        <div style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                        Login
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                    <p>Don't have an account? <Link href="/register" style={{ color: 'var(--color-primary)' }}>Register here</Link></p>
                </div>
            </div>
        </>
    );
}
