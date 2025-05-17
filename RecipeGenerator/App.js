import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

import LoginScreen from './screens/loginScreen';
import DetailScreen from './screens/detailScreen';
import RecipeSuggestionsScreen from './screens/recipeSuggestionsScreen';
import FridgeScreen from './screens/fridgeScreen';
import ProfileScreen from './screens/profileScreen';
import SocialScreen from './screens/socialScreen';
import { COLORS } from './screens/theme';

const Stack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen
        name="ProfileHome"
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name="Social"
        component={SocialScreen}
        options={{ headerShown: true, title: 'Freund hinzufügen' }}
      />
    </ProfileStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Rezepte" 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Zutaten') {
            return <MaterialIcons name="kitchen" size={size} color={color} />;
          } else if (route.name === 'Rezepte') {
            return <Ionicons name="restaurant" size={size} color={color} />;
          } else if (route.name === 'Profil') {
            return <FontAwesome5 name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.surface,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Zutaten" component={FridgeScreen} />
      <Tab.Screen name="Rezepte" component={RecipeSuggestionsScreen} />
      <Tab.Screen name="Profil" component={ProfileStackScreen}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
