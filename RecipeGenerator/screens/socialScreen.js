import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';


export default function SocialScreen({ navigation }){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleAddFriend = () => {
    if (username && email) {
      Alert.alert('Freund hinzugefügt', `Benutzername: ${username}\nE-Mail: ${email}`);
      setUsername('');
      setEmail('');
    } else {
      Alert.alert('Fehler', 'Bitte füllen Sie alle Felder aus.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={FONTS.heading}>Freund hinzufügen</Text>
      <TextInput
        style={styles.input}
        placeholder="Benutzername"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Mail-Adresse"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
        <MaterialIcons name="person-add" size={20} color="white" />
        <Text style={styles.addButtonText}>Hinzufügen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flex: 1,
    padding: 20,
    justifyContent: 'top',
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 12,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});