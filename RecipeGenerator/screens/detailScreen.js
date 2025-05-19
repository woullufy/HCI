import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';


export default function RecipeDetailScreen() {
  const route = useRoute();
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={recipe.image} style={styles.image} />

      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={28} color={COLORS.border} />
        </TouchableOpacity>
      </View>

      {recipe.cookTime && (
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color={COLORS.text} />
          <Text style={styles.infoText}>{recipe.cookTime} Minuten</Text>
        </View>
      )}

      <Text style={styles.sectionHeader}>
        <MaterialCommunityIcons name="chef-hat" size={20} color={COLORS.primary} /> Zutaten
      </Text>
      {recipe.ingredients.map((item, index) => (
        <Text key={index} style={styles.text}>• {item}</Text>
      ))}

      <Text style={styles.sectionHeader}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={COLORS.primary} /> Zubereitung
      </Text>
      <Text style={styles.text}>{recipe.instructions}</Text>
      <View style={{ height: 10}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1,
    marginRight: 12
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    color: COLORS.secondary
  },
  text: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 6
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text
  }
});
