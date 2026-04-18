import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialSymbols } from '@/components/ui/icon-symbol';

export default function QRScreen() {
  const [text, setText] = useState('https://expo.dev');
  const [inputValue, setInputValue] = useState('');

  const generateQR = () => {
    if (inputValue.trim()) {
      setText(inputValue);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialSymbols name="grid-view" size={24} color="#0058be" />
          <Text style={styles.headerTitle}>The Hub</Text>
        </View>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxxbNpJhfL1jhZwdkMQBhcpD68cEjJrwOA5DGqeoFMplUbI6-y4heCRQ1Kj-2wmeFKuqxogoQXS0lr30zqTfr9gaXfvNukPHUdlY2ah6bsq63KPzYUWaN6Z8TWzqvvBVfolt4ltZWiw83-mHvQOqzLZjvm2IIUc6F3jm-xI3ykPMika7B9KLyJATTSVJjikzI3MYKP5cdFdsMqNxOkAKvwgFFIGk2849s58y-MtOB4EGpcF1hTw9TV9xF58wUzUW7DaPrKdy7P1ZUp' }}
          style={styles.avatar}
        />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>GENERATE QR CODE</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter text or paste URL..."
                placeholderTextColor="#727785"
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={generateQR}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.inputIcon} onPress={generateQR}>
                <MaterialSymbols name="link" size={24} color="#0058be" />
              </TouchableOpacity>
            </View>
          </View>

          {/* QR Display Section - Prismatic Element */}
          <View style={styles.qrSection}>
            <View style={styles.qrWrapper}>
              <View style={styles.qrGlow} />
              <View style={styles.qrCard}>
                <View style={styles.qrImageContainer}>
                  {text ? (
                    <QRCode
                      value={text}
                      size={200}
                      color="#191c1e"
                      backgroundColor="transparent"
                      ecl="M"
                    />
                  ) : null}
                </View>
                <View style={styles.qrTextContainer}>
                  <Text style={styles.qrStatus}>Scanning ready</Text>
                  <Text style={styles.qrVersion}>V2.4.0 HIGH PRECISION</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionBtnPrimary}>
              <MaterialSymbols name="download" size={24} color="#ffffff" />
              <Text style={styles.actionBtnPrimaryText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtnSecondary}>
              <MaterialSymbols name="share" size={24} color="#191c1e" />
              <Text style={styles.actionBtnSecondaryText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Tool Features */}
          <View style={styles.featureList}>
            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureLeft}>
                <View style={styles.featureIconWrapper}>
                  <MaterialSymbols name="palette" size={20} color="#6b38d4" />
                </View>
                <View>
                  <Text style={styles.featureTitle}>Customize Style</Text>
                  <Text style={styles.featureSubtitle}>Colors, logos, and frames</Text>
                </View>
              </View>
              <MaterialSymbols name="chevron-right" size={24} color="#727785" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureLeft}>
                <View style={styles.featureIconWrapper}>
                  <MaterialSymbols name="history" size={20} color="#6b38d4" />
                </View>
                <View>
                  <Text style={styles.featureTitle}>History</Text>
                  <Text style={styles.featureSubtitle}>View your last 20 codes</Text>
                </View>
              </View>
              <MaterialSymbols name="chevron-right" size={24} color="#727785" />
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(247, 249, 251, 0.8)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0058be',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(0, 88, 190, 0.1)',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
    gap: 40,
  },
  inputSection: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#424754',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 4,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 56,
    backgroundColor: '#f2f4f6',
    borderRadius: 16,
    paddingLeft: 24,
    paddingRight: 56,
    fontSize: 16,
    color: '#191c1e',
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
  },
  qrSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  qrWrapper: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 1,
    position: 'relative',
  },
  qrGlow: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#e9ddff',
    borderRadius: 32,
    opacity: 0.6,
  },
  qrCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(194, 198, 214, 0.1)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    elevation: 10,
  },
  qrImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrTextContainer: {
    marginTop: 24,
    alignItems: 'center',
    gap: 4,
  },
  qrStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#424754',
  },
  qrVersion: {
    fontSize: 10,
    color: '#727785',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtnPrimary: {
    flex: 1,
    height: 56,
    backgroundColor: '#0058be',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#0058be',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  actionBtnPrimaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionBtnSecondary: {
    flex: 1,
    height: 56,
    backgroundColor: '#e6e8ea',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  actionBtnSecondaryText: {
    color: '#191c1e',
    fontSize: 16,
    fontWeight: '600',
  },
  featureList: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f4f6',
    padding: 20,
    borderRadius: 16,
  },
  featureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e9ddff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#191c1e',
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#424754',
  },
});
