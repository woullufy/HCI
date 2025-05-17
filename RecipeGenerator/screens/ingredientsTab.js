import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fridgeItems } from '../dummyData/ingredients';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';
import { Ionicons } from '@expo/vector-icons'; 

export default function IngredientsTab() {
  const handleSync = () => {
    alert('Zutaten synchronisiert!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={FONTS.subheading}>{item.name}</Text>

      <Text style={FONTS.body}>
        <Text style={{ fontWeight: 'bold' }}>Menge: </Text>{item.amount}
      </Text>

      <Text style={FONTS.body}>
        <Text style={{ fontWeight: 'bold' }}>Ablaufdatum: </Text>{item.expiration}
      </Text>

      <Text style={FONTS.body}>{item.calories} kcal</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.connectionBox}>
        <Text style={styles.connectionText}>🔗 Samsung Fridge 2024</Text>
      </View>
      <TouchableOpacity onPress={handleSync} style={styles.syncButton}>
        <Ionicons name="sync" size={24} color={COLORS.text} />
        <Text style={styles.syncText}>Sync</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={fridgeItems}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{ padding: SPACING.md }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  connectionBox: {
    borderWidth: 1,
    borderColor: '#A4C2A5', 
    backgroundColor: '#DEEBDA',
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },

  connectionText: {
    fontWeight: '500',
    ...FONTS.subheading,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  syncText: {
    ...FONTS.body,
  },
});