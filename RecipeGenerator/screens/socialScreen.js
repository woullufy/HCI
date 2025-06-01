import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SocialScreen({ navigation }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = async () => {
    if (!name || !email) {
      Alert.alert('Fehler', 'Name und E-Mail dürfen nicht leer sein.');
      return;
    }
    try {
      const existing = await AsyncStorage.getItem('users');
      const users = existing ? JSON.parse(existing) : [];
      const newUser = { id: Date.now().toString(), name, email, enabled: false };
      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setName('');
      setEmail('');
      Alert.alert('Erfolg', 'Benutzer hinzugefügt.');
    } catch (e) {
      console.error('Speicherfehler:', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
          <MaterialIcons name="person-add" size={20} color="white" />
          <Text style={styles.addButtonText}>Hinzufügen</Text>
      </TouchableOpacity>
    </View>
  );
}


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
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
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