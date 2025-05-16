import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [isVegetarian, setisVegetarian] = useState(false);
  const [isVegan, setisVegan] = useState(false);
  const [isLactosefree, setisLactosefree] = useState(false);
  const [isGlutenfree, setisGlutenfree] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [user1, setuser1] = useState(false);
  const [user2, setuser2] = useState(false);
  const [user3, setuser3] = useState(false);

const navigation = useNavigation();
  return (
  <ScrollView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <MaterialIcons name="settings" size={22} color="black" style={{ marginRight: 4 }} />
        <Text style={FONTS.heading}>Einstellungen</Text>
      </View>
      <View style={styles.divider} />
      <Text style={FONTS.subheading}>Lebensmittelvorlieben</Text>
      <View style={styles.switchContainer}>
         <View style={styles.container}>
            <Text style={FONTS.subheading}>Vegetarisch</Text>
            <Text style={FONTS.caption}>Zeig mir nur vegetarische oder vegane Rezepte.</Text>
         </View>
        <Switch
          trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
          thumbColor={isVegetarian ? 'green' : '#f4f3f4'}
          onValueChange={() => setisVegetarian(prev => !prev)}
          value={isVegetarian}
        />
      </View>

      <View style={styles.switchContainer}>
         <View style={styles.container}>
            <Text style={FONTS.subheading}>Vegan</Text>
            <Text style={FONTS.caption}>Zeig mir nur vegane Rezepte.</Text>
         </View>
        <Switch
          trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
          thumbColor={isVegan ? 'green' : '#f4f3f4'}
          onValueChange={() => setisVegan(prev => !prev)}
          value={isVegan}
        />
      </View>

      <View style={styles.switchContainer}>
         <View style={styles.container}>
            <Text style={FONTS.subheading}>Laktosefrei</Text>
            <Text style={FONTS.caption}>Zeig mir nur laktosefreie Rezepte.</Text>
         </View>
        <Switch
          trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
          thumbColor={isLactosefree ? 'green' : '#f4f3f4'}
          onValueChange={() => setisLactosefree(prev => !prev)}
          value={isLactosefree}
        />
      </View>

      <View style={styles.switchContainer}>
         <View style={styles.container}>
            <Text style={FONTS.subheading}>Glutenfrei</Text>
            <Text style={FONTS.caption}>Zeig mir nur glutenfreie Rezepte.</Text>
         </View>
        <Switch
          trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
          thumbColor={isGlutenfree ? 'green' : '#f4f3f4'}
          onValueChange={() => setisGlutenfree(prev => !prev)}
          value={isGlutenfree}
        />
      </View>
      <View style={styles.divider} />
      <Text style={FONTS.subheading}>Freunde berücksichtigen:</Text>
      <View style={styles.switchContainer}>
         <View style={styles.container}>
            <Text style={FONTS.subheading}>Robert Maier</Text>
            <Text style={FONTS.caption}>Lebensmitteleinschränkungen von Robert miteinbeziehen</Text>
         </View>
        <Switch
          trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
          thumbColor={user1 ? 'green' : '#f4f3f4'}
          onValueChange={() => setuser1(prev => !prev)}
          value={user1}
        />
      </View>
      <View style={styles.switchContainer}>
         <View style={styles.container}>
            <Text style={FONTS.subheading}>Lisa Fuchs</Text>
            <Text style={FONTS.caption}>Lebensmitteleinschränkungen von Lisa miteinbeziehen</Text>
         </View>
        <Switch
          trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
          thumbColor={user2 ? 'green' : '#f4f3f4'}
          onValueChange={() => setuser2(prev => !prev)}
          value={user2}
        />
      </View>
      <View style={styles.switchContainer}>
         <View style={styles.container}>
            <Text style={FONTS.subheading}>Sebastian Fuchs</Text>
            <Text style={FONTS.caption}>Lebensmitteleinschränkungen von Sebastian miteinbeziehen</Text>
         </View>
        <Switch
          trackColor={{ false: COLORS.primary, true: COLORS.secondary }}
          thumbColor={user3 ? 'green' : '#f4f3f4'}
          onValueChange={() => setuser3(prev => !prev)}
          value={user3}
        />
      </View>
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
  </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
