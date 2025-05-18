import React from 'react';
import { View, Text, Button } from 'react-native';


export default function RecipeSuggestionsScreen({ navigation }) {
  const handleDetails = () => {
    const dummyRecipe = {
      id: 1,
      title: 'Spaghetti Bolognese',
      image: require('../assets/spaghetti.jpg'),
      ingredients: ['Spaghetti', 'Tomato Sauce', 'Ground Beef', 'Garlic', 'Onion'],
      instructions:
        '1. Boil pasta.\n2. Cook ground beef with garlic and onion.\n3. Add tomato sauce.\n4. Mix with pasta and serve hot.',
    };
    navigation.navigate('Details', { recipe: dummyRecipe });
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recipe Suggestions</Text>
      <Button title="Go to Details" onPress={handleDetails} />
      
    </View>
  );
}