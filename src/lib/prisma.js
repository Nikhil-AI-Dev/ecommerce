// Safe Prisma client for development without requiring the generated Prisma package
const isPrismaAvailable = false; // We can set this once we have a real DB and generated client

let prisma;

function createMockPrisma() {
    console.log("Using decoupled mock Prisma client for stable local development.");
    return {
        user: {
            findUnique: ({ where }) => {
                if (where && where.email === 'demo@srilakshmi.com') {
                    return { id: '1', name: 'Demo User', email: 'demo@srilakshmi.com', passwordHash: 'mock_hash' };
                }
                return null;
            },
            create: ({ data }) => ({ id: 'mock-' + Math.random(), ...data }),
            count: () => 148
        },
        product: {
            findMany: ({ where } = {}) => {
                const products = [
                    {
                        id: '1',
                        name: 'Royal Banarasi Silk Saree',
                        description: 'A timeless classic, this deep maroon Banarasi silk saree features intricate gold zari work in a floral jangla pattern.',
                        price: 45000,
                        category: 'Silk',
                        isFeatured: true,
                        imageUrl: '/images/banarasi_maroon.jpg',
                        stockQuantity: 12,
                        createdAt: new Date()
                    },
                    {
                        id: '2',
                        name: 'Cream & Gold Kanchipuram',
                        description: 'Exquisite cream Kanchipuram silk with contrast maroon border and traditional motifs.',
                        price: 32000,
                        category: 'Silk',
                        isFeatured: true,
                        imageUrl: '/images/kanchi_cream.jpg',
                        stockQuantity: 8,
                        createdAt: new Date()
                    },
                    {
                        id: '3',
                        name: 'Handloom Cotton Daily Wear',
                        description: 'Breathable and lightweight cotton saree for everyday elegance.',
                        price: 4500,
                        category: 'Cotton',
                        isFeatured: false,
                        imageUrl: '/images/cotton_blue.jpg',
                        stockQuantity: 25,
                        createdAt: new Date()
                    }
                ];

                return products.filter(p => {
                    if (!where) return true;
                    if (where.isFeatured === true && !p.isFeatured) return false;

                    if (where.category) {
                        const catValue = typeof where.category === 'string' ? where.category : where.category.equals;
                        if (catValue) {
                            const cat = catValue.toLowerCase();
                            if (cat === 'new-arrivals') {
                                if (!p.isFeatured) return false;
                            } else if (cat !== 'all' && p.category.toLowerCase() !== cat) {
                                return false;
                            }
                        }
                    }
                    return true;
                });
            },
            findUnique: ({ where }) => null,
            create: ({ data }) => ({ id: 'mock-p-' + Math.random(), ...data })
        },
        order: {
            create: ({ data }) => ({ id: 'MOCK_ORDER_' + Date.now(), ...data }),
            aggregate: () => ({ _sum: { totalAmount: 452000 } }),
            count: () => 24,
            findMany: () => []
        },
    };
}

// In the future, when DATABASE_URL is present and prisma is generated:
/*
if (process.env.DATABASE_URL) {
    const { PrismaClient } = require('@prisma/client');
    prisma = global.prisma || new PrismaClient();
    if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
} else {
    prisma = createMockPrisma();
}
*/

prisma = createMockPrisma();

export default prisma;
