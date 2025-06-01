import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { fridgeItems } from '../dummyData/ingredients';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';
import { Ionicons } from '@expo/vector-icons'; 

export default function IngredientsTab() {
  const handleSync = () => {
    alert('Zutaten synchronisiert!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={FONTS.subheading} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={FONTS.body} numberOfLines={1} ellipsizeMode="tail">
        <Text style={{ fontWeight: 'bold' }}>Menge: </Text>{item.amount}
      </Text>
      <Text style={FONTS.body} numberOfLines={1} ellipsizeMode="tail">
        <Text style={{ fontWeight: 'bold' }}>MHD: </Text>{item.expiration}
      </Text>
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
      contentContainerStyle={{ padding: SPACING.xs }}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      key="two-column"
    />
  );
}

const { width } = Dimensions.get('window');
const itemWidth = (width - SPACING.xs * 12) / 2; //für gleichmäßigen Abstand

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm, // Reduziert von SPACING.sm für weniger Zeilenabstand
    marginRight: SPACING.sm, // Abstand zwischen Spalten
    borderWidth: 1,
    borderColor: COLORS.border,
    width: itemWidth,
    height: 80,
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
  columnWrapper: {
    justifyContent: 'space-between',
    marginRight: -SPACING.xs, // Kompensiert marginRight der letzten Karte
  },
});