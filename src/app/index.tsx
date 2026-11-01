import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products. Please check your connection.');
        setLoading(false);
      });
  }, []);

  // JavaScript filter() method for search functionality[cite: 2, 3]
  const filteredProducts = products.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading State
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6348" />
        <Text style={{ marginTop: 10 }}>Loading Pick & Click...</Text>
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center', paddingHorizontal: 20 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Pick & Click Store</Text>
      
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Product List with Filter */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Pressable style={styles.button} onPress={() => alert(`${item.title} added!`)}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15, paddingTop: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#ff6348', marginBottom: 10, textAlign: 'center' },
  searchBar: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center', elevation: 2 },
  image: { width: 60, height: 60, resizeMode: 'contain', marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 13, color: '#888', marginVertical: 4 },
  button: { backgroundColor: '#ff6348', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' },
  buttonText: { color: '#fff', fontSize: 11, fontWeight: 'bold' }
});