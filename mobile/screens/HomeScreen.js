import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { products, categories } from '../data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function HomeScreen({ navigation }) {
    const { addToCart, cartCount } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const renderCategory = ({ item }) => {
        const isSelected = selectedCategory === item.name;
        return (
            <TouchableOpacity
                style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                onPress={() => setSelectedCategory(isSelected ? null : item.name)}
            >
                <Image source={{ uri: item.image }} style={styles.catImage} />
                <View style={[styles.catOverlay, isSelected && styles.catOverlaySelected]} />
                <Text style={styles.catText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderFeaturedItem = ({ item }) => (
        <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.featuredImage} />
            <View style={styles.featuredOverlay} />
            <View style={styles.featuredContent}>
                <Text style={styles.featuredName}>{item.name}</Text>
                <Text style={styles.featuredPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderProduct = ({ item }) => (
        <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.prodImage} resizeMode="cover" />
                <TouchableOpacity
                    style={styles.wishlistIcon}
                    onPress={() => toggleWishlist(item)}
                >
                    <Text style={{ fontSize: 16 }}>{isInWishlist(item.id) ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.prodInfo}>
                <Text style={styles.prodCat}>{item.category}</Text>
                <Text style={styles.prodName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.prodPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        addToCart(item);
                        Alert.alert('Cart', 'Added to Cart!');
                    }}
                >
                    <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor={Colors.primary} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.wishlistHeaderIcon}
                    onPress={() => navigation.navigate('Wishlist')}
                >
                    <Text style={styles.iconEmoji}>❤️</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.headerTitle}>Sri Lakshmi Narayana</Text>
                    <Text style={styles.headerSubtitle}>Handlooms</Text>
                </View>
                <TouchableOpacity
                    style={styles.cartIconContainer}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Text style={styles.cartIcon}>🛒</Text>
                    {cartCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cartCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Hero Section */}
                <View style={styles.hero}>
                    <Text style={styles.heroTitle}>Traditional Elegance</Text>
                    <Text style={styles.heroSubtitle}>Exclusive Saree Collection</Text>
                    <TouchableOpacity style={styles.heroButton}>
                        <Text style={styles.heroButtonText}>Shop Now</Text>
                    </TouchableOpacity>
                </View>

                {/* Featured Products */}
                <View style={[styles.section, { marginTop: 24 }]}>
                    <Text style={styles.sectionTitle}>Handpicked for You</Text>
                    <FlatList
                        horizontal
                        data={products.filter(p => p.isFeatured)}
                        renderItem={renderFeaturedItem}
                        keyExtractor={item => 'featured_' + item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    />
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Collections</Text>
                    <FlatList
                        horizontal
                        data={categories}
                        renderItem={renderCategory}
                        keyExtractor={item => item.slug}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    />
                </View>

                {/* Collection List */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { paddingHorizontal: 16 }]}>
                        {selectedCategory ? `${selectedCategory} Collection` : 'All Collections'}
                    </Text>
                    <View style={styles.grid}>
                        {products
                            .filter(p => !selectedCategory || p.category === selectedCategory)
                            .map(product => (
                                <View key={product.id} style={{ width: '48%', marginBottom: 16 }}>
                                    {renderProduct({ item: product })}
                                </View>
                            ))
                        }
                    </View>
                    {products.filter(p => !selectedCategory || p.category === selectedCategory).length === 0 && (
                        <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>No sarees found in this category.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        backgroundColor: Colors.primary,
        padding: 16,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: Colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    headerSubtitle: {
        color: Colors.white,
        fontSize: 12,
        opacity: 0.8,
    },
    cartIconContainer: {
        position: 'relative',
        padding: 4,
    },
    cartIcon: {
        fontSize: 24,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    badgeText: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
    wishlistHeaderIcon: {
        padding: 4,
    },
    iconEmoji: {
        fontSize: 22,
    },
    hero: {
        backgroundColor: '#fff0f5',
        padding: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.textMain,
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'serif',
    },
    featuredCard: {
        width: 280,
        height: 180,
        marginRight: 16,
        borderRadius: 15,
        overflow: 'hidden',
    },
    featuredImage: {
        ...StyleSheet.absoluteFillObject,
    },
    featuredOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    featuredContent: {
        position: 'absolute',
        bottom: 15,
        left: 15,
    },
    featuredName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    featuredPrice: {
        color: Colors.secondary,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
    heroSubtitle: {
        fontSize: 14,
        color: Colors.textLight,
        marginBottom: 20,
    },
    heroButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    heroButtonText: {
        color: Colors.secondary,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 12,
        paddingHorizontal: 16, // Categories handles padding in FlatList content
        fontFamily: 'serif',
    },
    categoryCard: {
        width: 140,
        height: 90,
        marginRight: 12,
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    categoryCardSelected: {
        borderColor: Colors.secondary,
        elevation: 5,
        shadowColor: Colors.secondary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    catImage: {
        ...StyleSheet.absoluteFillObject,
    },
    catOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    catOverlaySelected: {
        backgroundColor: 'rgba(94, 11, 21, 0.4)',
    },
    catText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        zIndex: 1,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        height: 150,
        backgroundColor: '#f9f9f9',
    },
    prodImage: {
        width: '100%',
        height: '100%',
    },
    wishlistIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 12,
        padding: 4,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prodInfo: {
        padding: 10,
    },
    prodCat: {
        fontSize: 10,
        color: Colors.textLight,
        textTransform: 'uppercase',
    },
    prodName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginVertical: 2,
    },
    prodPrice: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addButton: {
        backgroundColor: Colors.primary,
        padding: 6,
        alignItems: 'center',
        borderRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    }
});
