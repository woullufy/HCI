import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { fridgeItems } from '../dummyData/ingredients';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';

export default function IngredientsTab() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={FONTS.subheading}>{item.name}</Text>
      <Text style={FONTS.body}>Menge: {item.amount}</Text>
      <Text style={FONTS.body}>Ablaufdatum: {item.expiration}</Text>
      <Text style={FONTS.body}>{item.calories} kcal/100g</Text>
    </View>
  );

  return (
    <FlatList
        data={fridgeItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: SPACING.md }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.lg,
  },
  item: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
});