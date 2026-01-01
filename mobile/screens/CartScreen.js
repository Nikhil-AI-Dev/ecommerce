import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useCart } from '../context/CartContext';
import Colors from '../constants/Colors';

export default function CartScreen({ navigation }) {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.qBtn}
                        onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                        <Text style={styles.qBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.qBtn}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        <Text style={styles.qBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
        </View>
    );

    if (cart.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backBtn}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Shopping Cart</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <TouchableOpacity
                        style={styles.shopBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.shopBtnText}>Start Shopping</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backBtn}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Shopping Cart</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutBtn}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
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
        padding: 16,
        backgroundColor: Colors.primary,
    },
    headerTitle: {
        color: Colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    backBtn: {
        color: Colors.secondary,
        fontSize: 24,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    qBtn: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    qBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    qText: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 8,
    },
    removeBtn: {
        padding: 8,
    },
    removeText: {
        fontSize: 18,
        color: '#ccc',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: Colors.textLight,
        marginBottom: 20,
    },
    shopBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    shopBtnText: {
        color: Colors.secondary,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 16,
        color: Colors.textLight,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    checkoutBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    checkoutBtnText: {
        color: Colors.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
