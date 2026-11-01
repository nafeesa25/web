import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Fjallraven Backpack', price: 109.95, qty: 1 },
    { id: '2', name: 'Mens Casual T-Shirt', price: 22.3, qty: 2 },
  ]);

  const updateQuantity = (id: string, action: 'inc' | 'dec') => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = action === 'inc' ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart ({cartItems.length} items)</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Aapka cart khali hai!</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
              </View>

              <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'dec')} style={styles.btn}>
                  <Text style={styles.btnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'inc')} style={styles.btn}>
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, alignItems: 'center', elevation: 2 },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemPrice: { color: '#ff5722', marginTop: 4, fontWeight: 'bold' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  btn: { backgroundColor: '#ddd', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  btnText: { fontWeight: 'bold', fontSize: 16 },
  qtyText: { marginHorizontal: 8, fontSize: 16, fontWeight: 'bold' },
  deleteBtn: { backgroundColor: '#ff4d4d', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  deleteText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});