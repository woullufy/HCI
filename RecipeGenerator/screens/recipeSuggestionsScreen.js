import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';
import { MaterialIcons } from '@expo/vector-icons';


// import recipeData from '../dummyData/index';
// import recipeData from '../dummyData/output_2000';
import recipeData from '../dummyData/output_1_temp';

export default function RecipeSuggestionsScreen({ navigation }) {
  const [visibleCount, setVisibleCount] = useState(20);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { recipe: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>

    </TouchableOpacity>
  );

  const visibleData = recipeData.slice(0, 20);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialIcons name="restaurant-menu" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
        <Text style={FONTS.heading}>Rezepte</Text>
      </View>

      <View style={styles.divider} />

      <FlatList
        data={recipeData.slice(0, visibleCount)}
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
});