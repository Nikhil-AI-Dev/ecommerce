"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "../lib/data";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { heroSection, theme, buttonVariants } from "../store/uiStore";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const hero = heroSection;

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/products?featured=true');
        const data = await res.json();
        setFeaturedProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Home featured error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <header style={{
        ...hero.layout,
        background: hero.background.gradient,
        color: '#fff',
        padding: '0',
      }}>
        {/* Decorative Image/Photo on the right */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          backgroundImage: `url('https://images.unsplash.com/photo-1610030469915-0eb47e4529f7?q=80&w=1000&auto=format&fit=crop')`, // High quality silk texture / saree placeholder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          {/* Overlay to blend image with background gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #4A0910 0%, transparent 40%)'
          }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', padding: '100px 20px' }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{
              letterSpacing: hero.content.badge.letterSpacing,
              textTransform: hero.content.badge.textTransform,
              marginBottom: '16px',
              color: hero.content.badge.color,
              fontSize: hero.content.badge.fontSize,
              fontWeight: hero.content.badge.fontWeight,
            }}>
              {hero.content.badge.text}
            </p>
            <h1 style={{
              fontSize: hero.content.title.fontSize,
              marginBottom: '32px',
              lineHeight: hero.content.title.lineHeight,
              background: hero.content.title.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-family-heading)',
            }}>
              {hero.content.title.text}
            </h1>
            <p style={{
              fontSize: hero.content.subtitle.fontSize,
              marginBottom: '48px',
              color: hero.content.subtitle.color,
              maxWidth: hero.content.subtitle.maxWidth,
              lineHeight: hero.content.subtitle.lineHeight,
            }}>
              {hero.content.subtitle.text}
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link
                href={hero.buttons.primary.href}
                className="btn btn-primary"
                style={{
                  ...buttonVariants.primary,
                  ...hero.buttons.primary,
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                {hero.buttons.primary.text}
              </Link>
              <Link
                href={hero.buttons.secondary.href}
                style={{
                  ...buttonVariants.outline,
                  ...hero.buttons.secondary,
                  color: '#fff',
                  borderColor: '#fff',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                {hero.buttons.secondary.text}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Preview */}
      <section className="container mt-lg mb-lg">
        <h2 className="text-center" style={{ marginBottom: '48px', fontSize: '32px' }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                height: '200px',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                border: '1px solid #eee',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Background Image Placeholder */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundColor: 'var(--color-primary)' }}></div>
                <h3 style={{ fontSize: '24px', position: 'relative' }}>{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mt-lg mb-lg" style={{ paddingBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px' }}>New Arrivals</h2>
          <Link href="/shop" style={{ borderBottom: '1px solid currentColor', paddingBottom: '2px', textDecoration: 'none', color: 'inherit' }}>View All</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {loading ? (
            <p>Loading newest arrivals...</p>
          ) : featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!loading && featuredProducts.length === 0 && <p>No new arrivals yet. Stay tuned!</p>}
        </div>
      </section>

      {/* Quality Promise */}
      <section style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        padding: theme.spacing['3xl'] + ' 0',
      }}>
        <div className="container text-center">
          <h2 style={{
            color: theme.colors.secondary,
            marginBottom: '20px',
          }}>
            The Sri Lakshmi Promise
          </h2>
          <p style={{
            fontSize: theme.fontSize.lg,
            maxWidth: '700px',
            margin: '0 auto',
            opacity: 0.9,
          }}>
            Every saree in our collection is handpicked for its authenticity and quality. We bring the finest weaves directly from weavers to your doorstep.
          </p>
        </div>
      </section>

    </main>
  );
}
