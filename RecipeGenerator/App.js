import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/loginScreen';
import DetailScreen from './screens/detailScreen';
import RecipeSuggestionsScreen from './screens/recipeSuggestionsScreen';
import FridgeScreen from './screens/fridgeScreen';
import ProfileScreen from './screens/profileScreen';
import SocialScreen from './screens/socialScreen';

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
    <Tab.Navigator>
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

/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/loginScreen';   
import DetailScreen from './screens/detailScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/


/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quack quack</Text>
      <Image
        source={ require('./assets/duck.jpg') }
        style={styles.image}
        resizeMode="cover"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
  },
});*/
