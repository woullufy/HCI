import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { fridgeItems } from '../dummyData/ingredients';
import { manualItems } from '../dummyData/ingredients';

// import recipeData from '../dummyData/index';
// import recipeData from '../dummyData/output_2000';
import recipeData from '../dummyData/output_1_temp';

export default function RecipeSuggestionsScreen({ navigation }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')

  const MIN_MATCH_COUNT = 3;
  const total_items = [...fridgeItems, ...manualItems];

  useFocusEffect(
    useCallback(() => {
      const loadPreferences = async () => {
        const vegan = JSON.parse(await AsyncStorage.getItem('vegan')) || false;
        const vegetarian = JSON.parse(await AsyncStorage.getItem('vegetarian')) || false;
        const lactoseFree = JSON.parse(await AsyncStorage.getItem('lactose_free')) || false;
        const glutenFree = JSON.parse(await AsyncStorage.getItem('gluten_free')) || false;

        const fridgeIngredientNames = total_items.map(item =>
          item.name.toLocaleLowerCase().trim()
        )

        const filtered = recipeData.filter((recipe) => {
          if (vegan && !recipe.tags.vegan) return false;
          if (vegetarian && !recipe.tags.vegetarian) return false;
          if (lactoseFree && !recipe.tags.lactose_free) return false;
          if (glutenFree && !recipe.tags.gluten_free) return false;

          const matchCount = recipe.sort.filter(ingredient =>
            fridgeIngredientNames.includes(ingredient.toLowerCase())
          ).length;

          return matchCount >= MIN_MATCH_COUNT;
        });

        setFilteredRecipes(filtered);
      };

      loadPreferences();
    }, [])

  );

  const searchedRecipes = filteredRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { recipe: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>

    </TouchableOpacity>
  );

  // const visibleData = recipeData.slice(0, 20);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialIcons name="restaurant-menu" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
        <Text style={FONTS.heading}>Rezepte</Text>
      </View>

      <View style={styles.divider} />

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Suche nach Rezepttitel..."
        placeholderTextColor={COLORS.placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={searchedRecipes.slice(0, visibleCount)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => setVisibleCount((prev) => prev + 20)}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  card: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  title: {
    ...FONTS.subheading,
    padding: SPACING.sm,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 16,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.textPrimary,
  },
});