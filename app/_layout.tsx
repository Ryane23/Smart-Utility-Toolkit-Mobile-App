import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import { CustomSplashScreen } from '@/components/CustomSplashScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Prevent auto hiding of the native splash screen until our layout mounts.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide the native splash screen so our custom one immediately takes over
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style={showSplash ? 'light' : 'auto'} />
      </ThemeProvider>
      
      {showSplash && (
        <CustomSplashScreen onFinish={() => setShowSplash(false)} />
      )}
    </View>
  );
}
