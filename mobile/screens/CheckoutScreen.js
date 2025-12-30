import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Colors from '../constants/Colors';
import { ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import Config from '../constants/Config';

export default function CheckoutScreen({ navigation }) {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '',
        phone: '',
    });

    const handlePlaceOrder = async () => {
        if (!formData.name || !formData.email || !formData.address || !formData.phone) {
            Alert.alert('Required', 'Please fill in all shipping details');
            return;
        }

        setLoading(true);
        try {
            // 1. Create Order in Backend
            const orderResponse = await fetch(`${Config.API_BASE_URL}/api/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    totalAmount: cartTotal,
                    userDetails: formData
                }),
            });
            const orderData = await orderResponse.json();

            if (!orderData.success) throw new Error('Order creation failed');

            // 2. Generate Shipping Info (Shiprocket Mock)
            const shipResponse = await fetch(`${Config.API_BASE_URL}/api/shiprocket`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderData.orderId,
                    address: formData.address
                }),
            });
            const shipData = await shipResponse.json();

            // Success
            clearCart();
            navigation.navigate('Success', {
                orderId: orderData.orderId,
                trackingId: shipData.trackingId,
                estimatedDelivery: shipData.estimatedDelivery
            });

        } catch (error) {
            console.error('Checkout Error:', error);
            Alert.alert('Error', 'Something went wrong while processing your order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backBtn}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.sectionTitle}>Shipping Details</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                            value={formData.phone}
                            onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Complete Address"
                            multiline
                            numberOfLines={4}
                            value={formData.address}
                            onChangeText={(text) => setFormData({ ...formData, address: text })}
                        />
                    </View>

                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryContainer}>
                        {cart.map(item => (
                            <View key={item.id} style={styles.summaryRow}>
                                <Text style={styles.itemText}>{item.name} x {item.quantity}</Text>
                                <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</Text>
                            </View>
                        ))}
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Payable</Text>
                            <Text style={styles.totalValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
                        </View>
                    </View>

                    <View style={styles.paymentNote}>
                        <Text style={styles.noteText}>🔒 Secure Payment via Razorpay (Mock Mode)</Text>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.placeOrderBtn, loading && { opacity: 0.7 }]}
                        onPress={handlePlaceOrder}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.secondary} />
                        ) : (
                            <Text style={styles.placeOrderText}>Place Order • ₹{cartTotal.toLocaleString('en-IN')}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 16,
        fontFamily: 'serif',
    },
    form: {
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    summaryContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemText: {
        fontSize: 14,
        color: Colors.textLight,
        flex: 1,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    paymentNote: {
        marginTop: 20,
        alignItems: 'center',
    },
    noteText: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    placeOrderBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    placeOrderText: {
        color: Colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
