import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import SuccessScreen from './screens/SuccessScreen';
import WishlistScreen from './screens/WishlistScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import Colors from './constants/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'Home') icon = focused ? '🏠' : '🏚️';
          else if (route.name === 'Wishlist') icon = focused ? '❤️' : '🤍';
          else if (route.name === 'Cart') icon = focused ? '🛒' : '🛍️';
          else if (route.name === 'Profile') icon = focused ? '👤' : '👤';

          return <Text style={{ fontSize: size, color }}>{icon}</Text>;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: '#eee',
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
              <Stack.Screen name="Success" component={SuccessScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Orders" component={OrdersScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
