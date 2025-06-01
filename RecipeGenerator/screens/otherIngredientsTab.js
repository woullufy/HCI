import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { manualItems } from '../dummyData/ingredients';
import { COLORS, FONTS, SPACING, RADIUS } from './theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';

export default function OtherIngredientsTab() {
  const [items, setItems] = useState(manualItems);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    amount: '',
    expiration: '',
  });

  // Lade gespeicherte Zutaten beim Mounten der Komponente
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('manualItems');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Fehler beim Laden der Zutaten:', error);
      }
    };
    loadItems();
  }, []);

  // Speichere Zutaten bei jeder Änderung
  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('manualItems', JSON.stringify(items));
      } catch (error) {
        console.error('Fehler beim Speichern der Zutaten:', error);
      }
    };
    saveItems();
  }, [items]);

  const handleDelete = (index) => {
    Alert.alert(
      'Zutat löschen?',
      'Möchtest du diese Zutat wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: () => {
            const newList = [...items];
            newList.splice(index, 1);
            setItems(newList);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (item, index) => {
    setEditingItem({ ...item });
    setEditingIndex(index);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem.name || !editingItem.amount || !editingItem.expiration) {
      Alert.alert('Fehler', 'Bitte fülle alle Felder aus.');
      return;
    }
    const updatedItems = [...items];
    updatedItems[editingIndex] = editingItem;
    setItems(updatedItems);
    setIsEditing(false);
    setEditingItem(null);
    setEditingIndex(null);
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.amount || !newItem.expiration) {
      Alert.alert('Fehler', 'Bitte fülle alle Felder aus.');
      return;
    }

    // Generiere eine neue ID basierend auf der höchsten bestehenden ID
    const maxId = items.reduce((max, item) => {
      const idNum = parseInt(item.id, 10);
      return idNum > max ? idNum : max;
    }, 0);
    const newId = (maxId + 1).toString();

    const itemToAdd = {
      id: newId,
      name: newItem.name.trim(),
      amount: newItem.amount.trim(),
      expiration: newItem.expiration.trim(),
      source: 'manual',
    };

    // Füge die neue Zutat am Anfang der Liste hinzu
    setItems([itemToAdd, ...items]);
    setNewItem({ name: '', amount: '', expiration: ''});
    setIsAdding(false);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={FONTS.subheading}>{item.name}</Text>
        <Text style={FONTS.body}>
          <Text style={{ fontWeight: 'bold' }}>Menge: </Text>{item.amount}
        </Text>
        <Text style={FONTS.body}>
          <Text style={{ fontWeight: 'bold' }}>Ablaufdatum: </Text>{item.expiration}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item, index)}>
          <MaterialIcons name="edit" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(index)}
          style={{ marginLeft: SPACING.md }}
        >
          <MaterialIcons name="delete" size={24} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAdding(true)}
      >
        <MaterialIcons name="add" size={28} color={'white'} />
        <Text style={styles.buttonText}>Zutat hinzufügen</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: SPACING.md }}
      />

      {isEditing && (
        <Modal visible={isEditing} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={FONTS.subheading}>Zutat bearbeiten</Text>
              <TextInput
                style={styles.input}
                value={editingItem.name}
                onChangeText={(text) =>
                  setEditingItem({ ...editingItem, name: text })
                }
                placeholder="Name"
              />
              <TextInput
                style={styles.input}
                placeholder="Menge"
                value={editingItem.amount}
                onChangeText={(text) =>
                  setEditingItem({ ...editingItem, amount: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Ablaufdatum (TT/MM/JJJJ)"
                value={editingItem.expiration}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const digits = text.replace(/\D/g, '');
                  let formatted = digits;
                  if (digits.length > 2) {
                    formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
                  }
                  if (digits.length > 4) {
                    formatted += `/${digits.slice(4, 8)}`;
                  }
                  setEditingItem({ ...editingItem, expiration: formatted });
                }}
              />
              
              <View style={{ flexDirection: 'row', marginTop: SPACING.md }}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: COLORS.error }]}
                  onPress={() => {
                    setIsEditing(false);
                    setEditingItem(null);
                    setEditingIndex(null);
                  }}
                >
                  <Text style={styles.buttonText}>Abbrechen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.buttonText}>Speichern</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {isAdding && (
        <Modal visible={isAdding} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={FONTS.subheading}>Neue Zutat hinzufügen</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={newItem.name}
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Menge"
                value={newItem.amount}
                onChangeText={(text) => setNewItem({ ...newItem, amount: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Ablaufdatum (TT/MM/JJJJ)"
                keyboardType="numeric"
                value={newItem.expiration}
                onChangeText={(text) => {
                  const digits = text.replace(/\D/g, '');
                  let formatted = digits;
                  if (digits.length > 2) {
                    formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
                  }
                  if (digits.length > 4) {
                    formatted += `/${digits.slice(4, 8)}`;
                  }
                  setNewItem({ ...newItem, expiration: formatted });
                }}
              />
              
              <View style={{ flexDirection: 'row', marginTop: SPACING.md }}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: COLORS.error }]}
                  onPress={() => setIsAdding(false)}
                >
                  <Text style={styles.buttonText}>Abbrechen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAddItem}
                >
                  <Text style={styles.buttonText}>Hinzufügen</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: SPACING.md,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.sm,
    fontSize: 16,
    paddingVertical: 4,
    color: COLORS.textPrimary,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: SPACING.sm,
    marginHorizontal: SPACING.xs,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 6,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-middle',
    gap: 6,
    paddingRight: 20,
  },
});