import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  const tools = [
    {
      title: 'Unit Converter',
      description: 'Seamlessly swap between metric and imperial systems with precision.',
      icon: <MaterialIcons name="sync-alt" size={32} color="#0058be" />,
      route: '/converter',
      color: '#0058be',
      bgHint: 'rgba(0, 88, 190, 0.1)',
      btnBg: '#0058be',
      btnText: '#ffffff'
    },
    {
      title: 'Calculator',
      description: 'Advanced mathematical operations wrapped in a fluid, intuitive interface.',
      icon: <MaterialIcons name="calculate" size={32} color="#6b38d4" />,
      route: '/calculator',
      color: '#6b38d4',
      bgHint: 'rgba(107, 56, 212, 0.1)',
      btnBg: '#e0e3e5',
      btnText: '#191c1e'
    },
    {
      title: 'QR Generator',
      description: 'Create high-resolution custom QR codes for links, text, and Wi-Fi sharing.',
      icon: <MaterialIcons name="qr-code-2" size={32} color="#924700" />,
      route: '/qr',
      color: '#924700',
      bgHint: 'rgba(146, 71, 0, 0.1)',
      btnBg: '#e0e3e5',
      btnText: '#191c1e'
    },
    {
      title: 'Weather',
      description: 'Real-time local forecasts and atmospheric data at your fingertips.',
      icon: <MaterialIcons name="cloud" size={32} color="#0058be" />,
      route: '/weather',
      color: '#0058be',
      bgHint: 'rgba(0, 88, 190, 0.1)',
      btnBg: '#e0e3e5',
      btnText: '#191c1e'
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* TopAppBar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <Pressable style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}>
            <MaterialIcons name="grid-view" size={28} color="#0058be" />
          </Pressable>
          <Text style={styles.appBarTitle}>The Hub</Text>
        </View>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBffCnivkGQLnVhmlsD03EZx5R1nrY1vBNDos-CrO1l8FQS-flh9YZiHqswjhPyp4Mi2Li5ZEhz_lH-6wF9d6nIvR1BdZGWcxObgIEhwO4YV_B80PSEYtkZ0p45ujc-bS8aiaZMC-_5AMshaVHAjJn1wU9kTytnBLl9Aw4OreH1marx-AdQb5Kf4PE_XaoZMUlyGcZtnez_Qxjq_hTYaENot-fixTi7_5XAArsFYBxaJxRNu_EFUGgUs9Gqr1BJftCbPh_HbelLhm0P' }} 
          style={styles.avatar} 
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome to The Hub</Text>
          <Text style={styles.heroSubtitle}>All your tools in one place</Text>
          
          <View style={styles.badge}>
            <MaterialIcons name="auto-awesome" size={16} color="#0058be" />
            <Text style={styles.badgeText}>READY FOR TASKS</Text>
          </View>
        </View>

        {/* Tools Grid / List */}
        <View style={styles.toolsList}>
          {tools.map((tool, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.card,
                pressed && { transform: [{ scale: 0.98 }] }
              ]}
              onPress={() => router.push(tool.route as any)}
            >
              {/* Decorative Circle BG */}
              <View style={[styles.cardDecorCircle, { backgroundColor: tool.bgHint }]} />
              
              <View style={[styles.iconWrapper, { backgroundColor: tool.bgHint }]}>
                {tool.icon}
              </View>
              
              <Text style={styles.cardTitle}>{tool.title}</Text>
              <Text style={styles.cardDesc}>{tool.description}</Text>
              
              <View style={[styles.btnWrapper, { backgroundColor: tool.btnBg }]}>
                <Text style={[styles.btnText, { color: tool.btnText }]}>Open Tool</Text>
              </View>
            </Pressable>
          ))}
        </View>
        
        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>NEW FEATURE</Text>
          </View>
          <Text style={styles.featuredTitle}>Advanced Cloud Sync</Text>
          <Text style={styles.featuredSubtitle}>Your history and tools are now synchronized across all your premium digital devices.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb', // Match HTML Background
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(247, 249, 251, 0.8)',
    zIndex: 10,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    padding: 2,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0058be', // Match HTML primary
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6e8ea',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  heroSection: {
    marginBottom: 40,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#191c1e',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#424754',
    fontWeight: '500',
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#191c1e',
    letterSpacing: 1,
  },
  toolsList: {
    gap: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'flex-start',
  },
  cardDecorCircle: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#191c1e',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 15,
    color: '#424754',
    lineHeight: 24,
    marginBottom: 24,
  },
  btnWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  featuredSection: {
    marginTop: 40,
    backgroundColor: '#f2f4f6',
    borderRadius: 24,
    padding: 32,
  },
  featuredBadge: {
    backgroundColor: '#d0bcff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#23005c',
    letterSpacing: 1.5,
  },
  featuredTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#191c1e',
    marginBottom: 12,
    lineHeight: 32,
  },
  featuredSubtitle: {
    fontSize: 16,
    color: '#424754',
    lineHeight: 24,
  }
});

