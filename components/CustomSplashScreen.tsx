import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
  onFinish?: () => void;
};

export function CustomSplashScreen({ onFinish }: Props) {
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Show splash screen for 2.5 seconds before triggering fade out
    const timer = setTimeout(() => {
      setIsFinishing(true);
      if (onFinish) {
        // Complete the unmount after fade animation ends
        setTimeout(onFinish, 800); 
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (isFinishing && !onFinish) return null;

  return (
    <Animated.View 
      style={styles.container}
      exiting={FadeOut.duration(800)}
    >
      <LinearGradient
        colors={['#0284c7', '#0ea5e9', '#38bdf8']} // Deep sky blue to bright sky blue
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <Animated.View entering={FadeIn.duration(1000).delay(200)} style={styles.content}>
          
          {/* Glowing Icon Container */}
          <View style={styles.iconContainer}>
            <View style={styles.glowLayer1} />
            <View style={styles.glowLayer2} />
            <Ionicons name="flash" size={64} color="#ffffff" style={styles.icon} />
          </View>

          {/* Typography */}
          <Text style={styles.appName}>The Hub</Text>
          <Text style={styles.tagline}>Intelligent Utility Toolkit</Text>

        </Animated.View>

        {/* Minimal Loader */}
        <Animated.View entering={FadeIn.duration(1000).delay(1000)} style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#ffffff" />
        </Animated.View>

      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999, // Ensure it sits on top of navigation
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  glowLayer1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#bae6fd', // light sky blue
    borderRadius: 70,
    opacity: 0.25,
    transform: [{ scale: 1.4 }],
  },
  glowLayer2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e0f2fe', // very light sky blue
    borderRadius: 70,
    opacity: 0.4,
    transform: [{ scale: 1.1 }],
    shadowColor: '#bae6fd',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  icon: {
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#e0f2fe', // soft sky blue text
    fontWeight: '500',
    letterSpacing: 0.8,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
});
