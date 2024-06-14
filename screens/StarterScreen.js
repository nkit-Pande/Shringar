import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import WishlistScreen from './WishlistScreen';
import OrderScreen from './OrderScreen';
import ProfileScreen from './ProfileScreen';
import * as Icon from 'react-native-feather';
import { Colors } from '../color';
import CartScreen from './CartScreen';

const Tab = createBottomTabNavigator();

export default function StarterScreen({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="firstRoute"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'Home';
              break;
            case 'Wishlist':
              iconName = 'Heart';
              break;
            case 'Order':
              iconName = 'ShoppingBag';
              break;
            case 'Profile':
              iconName = 'User';
              break;
            case 'Cart':
              iconName = 'ShoppingCart';
              break;
            default:
              iconName = 'Circle';
              break;
          }

          const IconComponent = Icon[iconName];
          return <IconComponent color={color} size={size} />;
        },
        tabBarActiveTintColor: Colors.dark,
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        tabBarStyle: { 
          backgroundColor: Colors.primary,
          display: route.name === 'Cart' ? 'none' : 'flex',
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
