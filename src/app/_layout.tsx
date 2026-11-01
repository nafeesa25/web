import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#ff6348' }}>
      {/* Home / Store Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Store',
          headerShown: false,
          tabBarIcon: (props: any) => (
            <Ionicons name="storefront" size={props.size} color={props.color} />
          ),
        }}
      />
      
      {/* CRUD / Manage Records Screen */}
      <Tabs.Screen
        name="crud"
        options={{
          title: 'Manage',
          headerShown: false,
          tabBarIcon: (props: any) => (
            <Ionicons name="create" size={props.size} color={props.color} />
          ),
        }}
      />
    </Tabs>
  );
}