"use client";
import { useState, useEffect } from 'react';
import { theme } from '../../../store/uiStore';
import { products as mockProducts } from '../../../lib/data';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'Silk',
        fabric: '',
        color: '',
        stockQuantity: 25,
        description: '',
        imageUrl: '',
        isFeatured: false
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error("Fetch error:", error);
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            if (res.ok) {
                fetchProducts();
                setIsAdding(false);
                setNewProduct({ name: '', price: '', category: 'Silk', fabric: '', color: '', stockQuantity: 25, description: '', imageUrl: '', isFeatured: false });
            }
        } catch (error) {
            console.error("Add error:", error);
        }
    };

    return (
        <div style={{ display: 'grid', gap: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: '#666' }}>Manage your inventory and update product details.</p>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.secondary,
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {isAdding ? 'Cancel' : '+ Add New Saree'}
                </button>
            </div>

            {isAdding && (
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '2px solid #D4AF37' }}>
                    <h3 style={{ marginBottom: '20px', color: theme.colors.primary }}>Product Details</h3>
                    <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Saree Name</label>
                            <input
                                required
                                value={newProduct.name}
                                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                placeholder="e.g. Royal Banarasi Silk"
                            />
                        </div>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Category</label>
                            <select
                                value={newProduct.category}
                                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            >
                                <option>Silk</option>
                                <option>Cotton</option>
                                <option>Handloom</option>
                            </select>
                        </div>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Price (₹)</label>
                            <input
                                required
                                type="number"
                                value={newProduct.price}
                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                placeholder="0.00"
                            />
                        </div>
                        <div style={{ display: 'grid', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Stock Quantity</label>
                            <input
                                type="number"
                                value={newProduct.stockQuantity}
                                onChange={e => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gap: '8px', gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Image URL</label>
                            <input
                                required
                                value={newProduct.imageUrl}
                                onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                placeholder="Paste high-res image link here"
                            />
                        </div>
                        <div style={{ display: 'grid', gap: '8px', gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Description</label>
                            <textarea
                                value={newProduct.description}
                                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                rows={3}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                placeholder="Describe the saree's weave, colors, and occasion..."
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                id="isFeatured"
                                checked={newProduct.isFeatured}
                                onChange={e => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                            />
                            <label htmlFor="isFeatured" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Show on Homepage (Featured)</label>
                        </div>
                        <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                            <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: theme.colors.primary, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                Save Product to Live Site
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9f9f9' }}>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '15px 20px', fontSize: '14px' }}>Product</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px' }}>Category</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px' }}>Price</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px' }}>Stock</th>
                            <th style={{ padding: '15px 20px', fontSize: '14px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: '#eee', borderRadius: '4px' }}></div>
                                        <div>
                                            <p style={{ fontWeight: 'bold', margin: 0 }}>{p.name}</p>
                                            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>ID: {p.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>{p.category}</td>
                                <td style={{ padding: '20px' }}>₹{p.price.toLocaleString()}</td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ color: p.stock < 10 ? 'red' : 'green' }}>{p.stock || '25'} in stock</span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <button style={{ marginRight: '10px', color: '#2196F3', border: 'none', background: 'none', cursor: 'pointer' }}>Edit</button>
                                    <button style={{ color: '#F44336', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
