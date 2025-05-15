
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from './theme'; 


export default function LoginScreen({ navigation }) {
    const handleLogin = () => {
    const dummyRecipe = {
      id: 1,
      title: 'Spaghetti Bolognese',
      image: require('../assets/spaghetti.jpg'),
      ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef', 'Garlic', 'Onion'],
      instructions:
        '1. Boil pasta.\n2. Cook ground beef with garlic and onion.\n3. Add tomato sauce.\n4. Mix with pasta and serve hot.',
    };
    navigation.replace('Main');
    //navigation.navigate('Details', { recipe: dummyRecipe });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Willkommen zurück!</Text>
      <Text style={styles.subtitle}>Bitte melde dich an, um deine Rezepte zu entdecken</Text>

      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        placeholderTextColor={ COLORS.placeholder}
      />

      <TextInput
        style={styles.input}
        placeholder="Passwort"
        placeholderTextColor={ COLORS.placeholder}
        secureTextEntry
      />

    
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Du hast noch kein Konto? <Text style={styles.link}>Registrieren</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: SPACING.xl,
  },
  title: {
    ...FONTS.heading,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...FONTS.body,
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.surface,
    padding:  SPACING.sm,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.md,
    fontSize: 16,
    color:  COLORS.textPrimary,
  },
  button: {
    width: '100%',
    backgroundColor:  COLORS.primary,
    padding:  SPACING.md,
    borderRadius:  RADIUS.md,
    alignItems: 'center',
    marginTop:  SPACING.sm,
  },
  buttonText: {
    ... FONTS.subheading,
    color: '#fff',
  },
  footerText: {
    marginTop:  SPACING.lg,
    ... FONTS.caption,
  },
  link: {
    color:  COLORS.primary,
    fontWeight: '600',
  },
});
