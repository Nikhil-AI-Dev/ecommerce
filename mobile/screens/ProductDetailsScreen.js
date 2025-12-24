import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetailsScreen({ route, navigation }) {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = () => {
        addToCart(product, quantity);
        Alert.alert('Success', `Added ${quantity} ${product.name} to Cart!`);
        navigation.navigate('Cart');
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <StatusBar style="light" backgroundColor={Colors.primary} />

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Image Header */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.divider} />

                    {/* Specifications */}
                    <Text style={styles.sectionTitle}>Product Details</Text>
                    <View style={styles.specsContainer}>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Fabric</Text>
                            <Text style={styles.specValue}>{product.fabric || 'Silk'}</Text>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Color</Text>
                            <Text style={styles.specValue}>{product.color || 'Multicolor'}</Text>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Blouse</Text>
                            <Text style={styles.specValue}>{product.blouse || 'Included'}</Text>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Occasion</Text>
                            <Text style={styles.specValue}>{product.occasion || 'Festive'}</Text>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Wash Care</Text>
                            <Text style={styles.specValue}>{product.washCare || 'Dry Clean'}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Quantity Selector */}
                    <View style={styles.quantityRow}>
                        <Text style={styles.quantityLabel}>Quantity</Text>
                        <View style={styles.quantityControls}>
                            <TouchableOpacity
                                style={styles.qBtn}
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Text style={styles.qBtnText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.qValue}>{quantity}</Text>
                            <TouchableOpacity
                                style={styles.qBtn}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Text style={styles.qBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.wishlistBtn, isInWishlist(product.id) && styles.wishlistBtnActive]}
                    onPress={() => toggleWishlist(product)}
                >
                    <Text style={{ fontSize: 24 }}>{isInWishlist(product.id) ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
                    <Text style={styles.addToCartText}>Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: 400,
        width: '100%',
        backgroundColor: '#f0f0f0',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: -2,
    },
    content: {
        padding: 20,
        marginTop: -20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    category: {
        color: Colors.textLight,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontSize: 12,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 8,
        fontFamily: 'serif',
    },
    price: {
        fontSize: 22,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.textMain,
    },
    description: {
        fontSize: 16,
        color: Colors.textLight,
        lineHeight: 24,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    qBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    qBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    qValue: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 12,
        minWidth: 40,
        textAlign: 'center',
    },
    addToCartText: {
        color: Colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingBottom: 30,
        flexDirection: 'row',
        gap: 15,
    },
    wishlistBtn: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wishlistBtnActive: {
        backgroundColor: '#fff5f5',
        borderColor: '#ffdada',
    },
    addToCartBtn: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    specsContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    specLabel: {
        color: '#666',
        fontSize: 14,
    },
    specValue: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 14,
        textAlign: 'right',
        flex: 1,
        marginLeft: 20,
    },
});
