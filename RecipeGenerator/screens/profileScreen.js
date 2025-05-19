import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Switch, FlatList, StyleSheet, TouchableOpacity, Alert, onValueChange } from 'react-native';
import { COLORS, FONTS } from './theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function UserListScreen() {
  const [users, setUsers] = useState([]);
  const [isVegetarian, setisVegetarian] = useState(false);
  const [isVegan, setisVegan] = useState(false);
  const [isLactosefree, setisLactosefree] = useState(false);
  const [isGlutenfree, setisGlutenfree] = useState(false);
  const navigation = useNavigation();

  const updatePreference = async (key, value, setValue) => {
    try {
      setValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Fehler beim Speichern der Präferenz:', e);
    }
  };


  useFocusEffect(
    useCallback(() => {
      const loadPreferences = async () => {
        try {
          const vegan = JSON.parse(await AsyncStorage.getItem('vegan')) || false;
          const vegetarian = JSON.parse(await AsyncStorage.getItem('vegetarian')) || false;
          const lactoseFree = JSON.parse(await AsyncStorage.getItem('lactose_free')) || false;
          const glutenFree = JSON.parse(await AsyncStorage.getItem('gluten_free')) || false;

          setisVegan(vegan);
          setisVegetarian(vegetarian);
          setisLactosefree(lactoseFree);
          setisGlutenfree(glutenFree);


          const data = await AsyncStorage.getItem('users');
          if (data) {
            setUsers(JSON.parse(data));
          }
        } catch (e) {
          console.error('Ladefehler:', e);
        }
      };
      loadPreferences();
    }, [])
  );

  const deleteUser = async (id) => {
    Alert.alert(
      'Benutzer löschen',
      'Möchten Sie diesen Benutzer wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const toggleSwitch = async (id) => {
    const updated = users.map((user) =>
      user.id === id ? { ...user, enabled: !user.enabled } : user
    );
    setUsers(updated);
    await AsyncStorage.setItem('users', JSON.stringify(updated));
  };

  const renderPreferenceSwitch = (label, caption, value, onValueChange) => (
    <View style={styles.switchContainer}>
      <View style={styles.container}>
        <Text style={FONTS.subheading}>{label}</Text>
        <Text style={FONTS.caption}>{caption}</Text>
      </View>
      <Switch
        trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
        thumbColor={value ? 'green' : '#f4f3f4'}
        // onValueChange={() => setValue((prev) => !prev)}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <View style={styles.headingContainer}>
              <MaterialIcons
                name="settings"
                size={22}
                color="black"
                style={{ marginRight: 4 }}
              />
              <Text style={FONTS.heading}>Einstellungen</Text>

            </View>
            <View style={styles.divider} />
            <View style={styles.subContainer}>
              <Text style={FONTS.heading}>Meine Lebensmittelvorlieben</Text>
            </View>
            {renderPreferenceSwitch(
              'Vegetarisch',
              'Zeig mir nur vegetarische oder vegane Rezepte.',
              isVegetarian,
              // setisVegetarian,
              (value) => updatePreference('vegetarian', value, setisVegetarian)
            )}
            {renderPreferenceSwitch(
              'Vegan',
              'Zeig mir nur vegane Rezepte.',
              isVegan,
              // setisVegan,
              (value) => updatePreference('vegan', value, setisVegan)
            )}
            {renderPreferenceSwitch(
              'Laktosefrei',
              'Zeig mir nur laktosefreie Rezepte.',
              isLactosefree,
              // setisLactosefree,
              (value) => updatePreference('lactose_free', value, setisLactosefree)
            )}
            {renderPreferenceSwitch(
              'Glutenfrei',
              'Zeig mir nur glutenfreie Rezepte.',
              isGlutenfree,
              // setisGlutenfree,
              (value) => updatePreference('gluten_free', value, setisGlutenfree)
            )}

            <View style={styles.subContainer}>
              <Text style={FONTS.heading}>Freunde berücksichtigen</Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{ padding: 0 }}>
            <TouchableOpacity
              style={styles.addFriendButton}
              onPress={() => navigation.navigate('Social')}
            >
              <View style={styles.addFriendButtonContent}>
                <MaterialIcons name="add" size={22} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.addFriendButtonText}>Freund hinzufügen</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Switch
                value={item.enabled}
                onValueChange={() => toggleSwitch(item.id)}
                trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
                thumbColor={item.enabled ? 'green' : '#f4f3f4'} // Knob color
                ios_backgroundColor={COLORS.primary} // iOS fallback color
              />
              <TouchableOpacity
                onPress={() => deleteUser(item.id)}
                style={{ marginLeft: 12 }}
              >
                <Ionicons name="trash-bin" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#666' },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginLeft: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 0,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
    marginVertical: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 20,
    marginLeft: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
    marginLeft: 5,
  },
  subMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 0,
    marginLeft: 5,
  },
  addFriendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  addFriendButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
  },
  addFriendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

