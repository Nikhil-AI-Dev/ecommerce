import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';

export default function SuccessScreen({ navigation, route }) {
    const { orderId, trackingId, estimatedDelivery } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>✓</Text>
                </View>
                <Text style={styles.title}>Order Placed!</Text>
                <Text style={styles.subtitle}>
                    Thank you for choosing Sri Lakshmi Narayana Handlooms.
                    Your elegant selection is being prepared with care.
                </Text>

                <View style={styles.orderInfo}>
                    <Text style={styles.orderId}>Order ID: #{orderId || 'ORD-SYNC'}</Text>
                    {trackingId && (
                        <>
                            <Text style={styles.tracking}>Tracking: {trackingId}</Text>
                            <Text style={styles.delivery}>Est. Delivery: {estimatedDelivery}</Text>
                        </>
                    )}
                    <Text style={styles.status}>Status: Processing</Text>
                </View>

                <TouchableOpacity
                    style={styles.homeBtn}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.homeBtnText}>Continue Shopping</Text>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e8f5e9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    icon: {
        fontSize: 50,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 16,
        fontFamily: 'serif',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textLight,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    orderInfo: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 40,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    status: {
        fontSize: 14,
        color: '#4CAF50',
        marginTop: 4,
        fontWeight: 'bold',
    },
    tracking: {
        fontSize: 14,
        color: Colors.textMain,
        marginTop: 8,
    },
    delivery: {
        fontSize: 14,
        color: Colors.textLight,
        marginTop: 4,
    },
    homeBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 12,
    },
    homeBtnText: {
        color: Colors.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
