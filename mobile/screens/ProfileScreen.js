import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, StatusBar } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Colors from '../constants/Colors';

export default function ProfileScreen({ navigation }) {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContent}>
                    <Text style={styles.emptyIcon}>👤</Text>
                    <Text style={styles.emptyTitle}>You are not logged in</Text>
                    <Text style={styles.emptySubtitle}>Log in to view your profile and track orders.</Text>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginButtonText}>LOG IN</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</Text>
                    </View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>

                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Orders')}>
                        <View style={styles.menuIconContainer}>
                            <Text style={styles.menuIcon}>📦</Text>
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuTitle}>My Orders</Text>
                            <Text style={styles.menuSubtitle}>View your order history</Text>
                        </View>
                        <Text style={styles.arrowIcon}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Wishlist')}>
                        <View style={styles.menuIconContainer}>
                            <Text style={styles.menuIcon}>❤️</Text>
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuTitle}>Wishlist</Text>
                            <Text style={styles.menuSubtitle}>Your favorite items</Text>
                        </View>
                        <Text style={styles.arrowIcon}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIconContainer}>
                            <Text style={styles.menuIcon}>📍</Text>
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={styles.menuTitle}>Saved Addresses</Text>
                            <Text style={styles.menuSubtitle}>Manage your shipping locations</Text>
                        </View>
                        <Text style={styles.arrowIcon}>→</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.version}>SLNH Mobile v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    email: {
        fontSize: 14,
        color: Colors.textLight,
        marginTop: 5,
    },
    menu: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 1,
    },
    menuIconContainer: {
        width: 45,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 20,
    },
    menuTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textMain,
    },
    menuSubtitle: {
        fontSize: 12,
        color: Colors.textLight,
        marginTop: 2,
    },
    arrowIcon: {
        fontSize: 18,
        color: Colors.gray,
    },
    logoutButton: {
        marginTop: 20,
        marginHorizontal: 20,
        padding: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F44336',
        alignItems: 'center',
    },
    logoutText: {
        color: '#F44336',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 10,
    },
    emptySubtitle: {
        fontSize: 16,
        color: Colors.textLight,
        textAlign: 'center',
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 10,
    },
    loginButtonText: {
        color: Colors.secondary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        padding: 40,
        alignItems: 'center',
    },
    version: {
        fontSize: 12,
        color: Colors.gray,
    }
});
