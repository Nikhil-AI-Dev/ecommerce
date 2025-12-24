import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Colors from '../constants/Colors';
import Config from '../constants/Config';

export default function OrdersScreen({ navigation }) {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${Config.API_BASE_URL}/api/mobile/orders?email=${user.email}`);
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (error) {
                console.error("Fetch Orders Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{item.id}</Text>
                <Text style={[styles.status, { color: item.status === 'Delivered' ? '#4CAF50' : Colors.primary }]}>
                    {item.status}
                </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.orderBody}>
                {item.items.map((prod, index) => (
                    <Text key={index} style={styles.itemName}>• {prod.name} (x{prod.qty})</Text>
                ))}
                <View style={styles.footer}>
                    <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                    <Text style={styles.total}>₹{item.totalAmount.toLocaleString('en-IN')}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Orders</Text>
                <View style={{ width: 24 }} />
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            ) : orders.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyIcon}>🛍️</Text>
                    <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id}
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
    orderCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
    },
    orderBody: {
        gap: 5,
    },
    itemName: {
        fontSize: 14,
        color: Colors.textLight,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center',
    },
    date: {
        fontSize: 12,
        color: Colors.gray,
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        fontSize: 50,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textLight,
        textAlign: 'center',
    }
});
