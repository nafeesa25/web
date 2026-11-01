import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CRUDScreen() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  // 1. Load Data from AsyncStorage (Local Storage) jab app khule
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('@items_key');
      if (storedItems !== null) {
        setItems(JSON.parse(storedItems));
      }
    } catch (e) {
      console.error('Failed to load data', e);
    }
  };

  // 2. Save Data to AsyncStorage
  const saveData = async (newItems) => {
    try {
      await AsyncStorage.setItem('@items_key', JSON.stringify(newItems));
    } catch (e) {
      console.error('Failed to save data', e);
    }
  };

  // 3. Create or Update Record
  const handleAddOrUpdate = () => {
    if (text.trim() === '') return;

    if (editId !== null) {
      // Update Record
      const updatedItems = items.map((item) =>
        item.id === editId ? { ...item, name: text } : item
      );
      setItems(updatedItems);
      saveData(updatedItems);
      setEditId(null);
    } else {
      // Create Record
      const newItem = { id: Date.now().toString(), name: text };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveData(updatedItems);
    }
    setText('');
  };

  // 4. Delete Record
  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    saveData(filteredItems);
  };

  // 5. Edit Record Setup
  const handleEdit = (item) => {
    setText(item.name);
    setEditId(item.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Records (CRUD)</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter item name..."
        value={text}
        onChangeText={setText}
      />
      
      <Pressable style={styles.button} onPress={handleAddOrUpdate}>
        <Text style={styles.buttonText}>{editId !== null ? 'Update Record' : 'Add Record'}</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.actionButtons}>
              <Pressable onPress={() => handleEdit(item)} style={styles.editBtn}>
                <Text style={styles.btnText}>Edit</Text>
              </Pressable>
              <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#ff6348' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#ff6348', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#f9f9f9', marginBottom: 8, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  itemText: { fontSize: 16, color: '#333' },
  actionButtons: { flexDirection: 'row', gap: 10 },
  editBtn: { backgroundColor: '#4caf50', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5 },
  deleteBtn: { backgroundColor: '#f44336', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});