import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Colors from '../constants/Colors';

export default function WishlistScreen({ navigation }) {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
                <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => {
                            addToCart(item);
                            removeFromWishlist(item.id);
                        }}
                    >
                        <Text style={styles.cartButtonText}>Move to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFromWishlist(item.id)}
                    >
                        <Text style={styles.removeText}>🗑️</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Wishlist</Text>
                <View style={{ width: 20 }} />
            </View>

            {wishlist.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>❤️</Text>
                    <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
                    <Text style={styles.emptySubtitle}>Save the sarees you love for later. They will appear here!</Text>
                    <TouchableOpacity
                        style={styles.shopButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.shopButtonText}>Explore Collection</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={wishlist}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        fontSize: 24,
        color: Colors.primary,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textMain,
        fontFamily: 'serif',
    },
    list: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    imageContainer: {
        width: 100,
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    info: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    category: {
        fontSize: 12,
        color: Colors.textLight,
        marginTop: 2,
    },
    price: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: 'bold',
        marginTop: 5,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 10,
    },
    cartButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    cartButtonText: {
        color: Colors.secondary,
        fontSize: 12,
        fontWeight: 'bold',
    },
    removeButton: {
        padding: 8,
        backgroundColor: '#fff5f5',
        borderRadius: 6,
    },
    removeText: {
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 10,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        color: Colors.textLight,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    shopButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    shopButtonText: {
        color: Colors.secondary,
        fontWeight: 'bold',
        fontSize: 16,
    }
});
