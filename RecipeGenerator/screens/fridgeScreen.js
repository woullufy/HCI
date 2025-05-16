import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IngredientsTab from './ingredientsTab';
import OtherIngredientsTab from './otherIngredientsTab';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';

export default function FridgeScreen() {
  const [activeTab, setActiveTab] = useState('fridge');

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'fridge' && styles.activeTab]}
          onPress={() => setActiveTab('fridge')}
        >
          <Text style={styles.tabText}>Kühlschrank</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'manual' && styles.activeTab]}
          onPress={() => setActiveTab('manual')}
        >
          <Text style={styles.tabText}>Andere Zutaten</Text>
        </TouchableOpacity>
      </View>

      {/* Inhalt */}
      <View style={styles.content}>
        {activeTab === 'fridge' ? <IngredientsTab /> : <OtherIngredientsTab />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
  },
  tab: {
    padding: SPACING.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.subheading,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
});