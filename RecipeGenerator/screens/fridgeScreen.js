import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import IngredientsTab from './ingredientsTab';
import OtherIngredientsTab from './otherIngredientsTab';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';

export default function FridgeScreen() {
  const [activeTab, setActiveTab] = useState('fridge');

  return (
    <SafeAreaView style={styles.container}>
      
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
    </SafeAreaView>
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
    paddingVertical: SPACING.sm,
    marginTop: SPACING.lg,
    backgroundColor: COLORS.background, // gleiche Farbe wie der ganze Screen
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