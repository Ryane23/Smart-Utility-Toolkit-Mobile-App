import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0ea5e9', // using the sky blue theme
        tabBarInactiveTintColor: '#94a3b8', // cool gray for inactive icons
        headerShown: false, // removes the top black header
        tabBarButton: HapticTab,
        tabBarStyle: { 
          paddingBottom: 8, 
          paddingTop: 8, 
          height: 65,
          backgroundColor: '#ffffff', // forces a crisp white background
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          elevation: 0,
          shadowOpacity: 0
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Smart Utility Hub',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          title: 'Converter',
          headerTitle: 'Unit Converter',
          tabBarIcon: ({ color }) => <MaterialIcons name="swap-horiz" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          headerTitle: 'Calculator',
          tabBarIcon: ({ color }) => <MaterialIcons name="calculate" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: 'QR Code',
          headerTitle: 'QR Code Generator',
          tabBarIcon: ({ color }) => <MaterialIcons name="qr-code" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: 'Weather',
          headerTitle: 'Current Weather',
          tabBarIcon: ({ color }) => <MaterialIcons name="wb-sunny" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
