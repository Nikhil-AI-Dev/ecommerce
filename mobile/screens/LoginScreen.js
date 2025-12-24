import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Colors from '../constants/Colors';

export default function LoginScreen({ navigation }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();

    const handleSubmit = async () => {
        if (!email || !password || (!isLogin && !name)) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        let result;
        if (isLogin) {
            result = await login(email, password);
        } else {
            result = await register(name, email, password);
        }
        setLoading(false);

        if (result.success) {
            navigation.navigate('Main'); // Navigate to the tab navigator
        } else {
            Alert.alert('Error', result.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.logoText}>SLNH</Text>
                        <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
                        <Text style={styles.subtitle}>
                            {isLogin
                                ? 'Sign in to access your wishlist and orders.'
                                : 'Join us to experience the heritage of handlooms.'}
                        </Text>
                    </View>

                    <View style={styles.form}>
                        {!isLogin && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your name"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        )}

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="name@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={Colors.secondary} />
                            ) : (
                                <Text style={styles.submitButtonText}>{isLogin ? 'LOG IN' : 'SIGN UP'}</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setIsLogin(!isLogin)}
                        >
                            <Text style={styles.toggleText}>
                                {isLogin
                                    ? "Don't have an account? Sign Up"
                                    : "Already have an account? Log In"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        padding: 30,
        justifyContent: 'center',
        flexGrow: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.primary,
        fontFamily: 'serif',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textLight,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textMain,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: Colors.primary,
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    submitButtonText: {
        color: Colors.secondary,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
    toggleButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    toggleText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
});
