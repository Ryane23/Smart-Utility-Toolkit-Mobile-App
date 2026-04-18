import { MaterialSymbols } from '@/components/ui/icon-symbol';
import { fetchWeather, WeatherData } from '@/src/services/weather';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError('City not found or API error.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string): any => {
    if (!condition) return 'cloud';
    const cond = condition.toLowerCase();
    if (cond.includes('clear')) return 'light-mode';
    if (cond.includes('sunny')) return 'light-mode';
    if (cond.includes('cloud')) return 'cloud';
    if (cond.includes('rain')) return 'rainy';
    if (cond.includes('snow')) return 'cloud-snow';
    return 'cloud';
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
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBudgRFjHGHq7YR7yo3f0iqh9hHh7NlbDh79E3xFykRUyhS6Bb-ETY-_duM20CdBxTwOkDS4ZXAlYDLQL9O71fr_F7rrD3oTR42XwO70aX5NzHfzqyILnqRkn0k8XGrHvADrIi_z1DhiC_3Ufn9HA7eMEomU7jSY8xyRTp-ED3vt02_oLM3TK8D-l6mOtAxIV_u2644yBCx1-D7-x1-EUhegcU8U4E5UK5WcETKUZLTF4Cr4B7WhmVadQREyRoDTgUsfKn9oArxkZ-W' }}
          style={styles.avatar}
        />
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Weather Section */}
        <LinearGradient
          colors={['#e0f2fe', '#f7f9fb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchIcon}>
              <MaterialSymbols name="search" size={24} color="#727785" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search city..."
              placeholderTextColor="#c2c6d6"
              value={city}
              onChangeText={setCity}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>

          {loading ? (
            <View style={{ alignItems: 'center', padding: 40 }}>
              <ActivityIndicator size="large" color="#0058be" />
            </View>
          ) : error ? (
             <View style={{ alignItems: 'center', padding: 40 }}>
              <Text style={{ color: '#ba1a1a', fontWeight: 'bold' }}>{error}</Text>
            </View>
          ) : (
            /* Main Display */
            <View style={styles.mainDisplay}>
              <View style={styles.locationBadge}>
                <MaterialSymbols name="location-on" size={16} color="#0058be" />
                <Text style={styles.locationText}>{weather ? weather.cityName.toUpperCase() : 'SAN FRANCISCO, CA'}</Text>
              </View>
              
              <View style={styles.tempContainer}>
                <Text style={styles.tempNumber}>{weather ? Math.round(weather.temp) : 68}</Text>
                <Text style={styles.tempSymbol}>°</Text>
              </View>

              <View style={styles.conditionContainer}>
                <MaterialSymbols name={getWeatherIcon(weather?.condition || '') as any} size={64} color="#0058be" />
                <Text style={styles.conditionText}>{weather ? weather.condition : 'Mostly Sunny'}</Text>
                <Text style={styles.highLowText}>H: {weather ? Math.round(weather.temp + 4) : 72}°  L: {weather ? Math.round(weather.temp - 10) : 58}°</Text>
              </View>
            </View>
          )}
        </LinearGradient>

        <View style={styles.bottomContent}>
          {/* Bento Grid Stats */}
          <View style={styles.statsGrid}>
            
            {/* Card 1: Wind */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <MaterialSymbols name="air" size={24} color="#0058be" />
                <Text style={styles.statLabel}>WIND</Text>
              </View>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>12 <Text style={styles.statUnit}>mph</Text></Text>
                <Text style={styles.statDesc}>Northwest</Text>
              </View>
            </View>

            {/* Card 2: Humidity */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <MaterialSymbols name="humidity-percentage" size={24} color="#0058be" />
                <Text style={styles.statLabel}>HUMIDITY</Text>
              </View>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>42 <Text style={styles.statUnit}>%</Text></Text>
                <Text style={styles.statDesc}>The dew point is 54°</Text>
              </View>
            </View>

            {/* Card 3: UV Index */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <MaterialSymbols name="wb-sunny" size={24} color="#0058be" />
                <Text style={styles.statLabel}>UV INDEX</Text>
              </View>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>Moderate</Text>
                <Text style={styles.statDesc}>Index of 4</Text>
              </View>
            </View>

            {/* Card 4: Visibility */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <MaterialSymbols name="visibility" size={24} color="#0058be" />
                <Text style={styles.statLabel}>VISIBILITY</Text>
              </View>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>10 <Text style={styles.statUnit}>mi</Text></Text>
                <Text style={styles.statDesc}>Clear view</Text>
              </View>
            </View>

          </View>

          {/* Forecast Section */}
          <View style={styles.forecastSection}>
            <View style={styles.forecastHeader}>
              <Text style={styles.forecastTitle}>7-Day Forecast</Text>
              <TouchableOpacity>
                <Text style={styles.forecastDetailsBtn}>Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.forecastList}>
              <View style={styles.forecastRow}>
                <Text style={styles.forecastDay}>Today</Text>
                <MaterialSymbols name="wb-sunny" size={24} color="#0058be" />
                <View style={styles.forecastHighLow}>
                  <Text style={styles.forecastActiveTemp}>{weather ? Math.round(weather.temp + 4) : 72}°</Text>
                  <Text style={styles.forecastInactiveTemp}>{weather ? Math.round(weather.temp - 10) : 58}°</Text>
                </View>
              </View>
              
              <View style={styles.forecastRow}>
                <Text style={styles.forecastDay}>Tue</Text>
                <MaterialSymbols name="cloud" size={24} color="#3b82f6" />
                <View style={styles.forecastHighLow}>
                  <Text style={styles.forecastActiveTemp}>68°</Text>
                  <Text style={styles.forecastInactiveTemp}>55°</Text>
                </View>
              </View>

              <View style={styles.forecastRow}>
                <Text style={styles.forecastDay}>Wed</Text>
                <MaterialSymbols name="wb-sunny" size={24} color="#0058be" />
                <View style={styles.forecastHighLow}>
                  <Text style={styles.forecastActiveTemp}>75°</Text>
                  <Text style={styles.forecastInactiveTemp}>60°</Text>
                </View>
              </View>

              <View style={[styles.forecastRow, styles.forecastRowLast]}>
                <Text style={styles.forecastDay}>Thu</Text>
                <MaterialSymbols name="partly-cloudy-day" size={24} color="#2563eb" />
                <View style={styles.forecastHighLow}>
                  <Text style={styles.forecastActiveTemp}>70°</Text>
                  <Text style={styles.forecastInactiveTemp}>57°</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(247, 249, 251, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
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
    borderColor: '#e6e8ea',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 48,
  },
  searchInput: {
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    paddingLeft: 48,
    paddingRight: 24,
    fontSize: 16,
    color: '#191c1e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  mainDisplay: {
    alignItems: 'center',
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 8,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#424754',
    letterSpacing: 1,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tempNumber: {
    fontSize: 120,
    fontWeight: '800',
    color: '#191c1e',
    lineHeight: 120,
    letterSpacing: -4,
  },
  tempSymbol: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0058be',
    marginTop: 16,
  },
  conditionContainer: {
    alignItems: 'center',
    marginTop: -8,
  },
  conditionText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#191c1e',
    marginTop: 16,
  },
  highLowText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424754',
    marginTop: 4,
  },
  bottomContent: {
    paddingHorizontal: 24,
    marginTop: -32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    height: 160,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#727785',
    letterSpacing: 1,
  },
  statValueContainer: {
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191c1e',
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#727785',
  },
  statDesc: {
    fontSize: 12,
    color: '#424754',
  },
  forecastSection: {
    marginTop: 32,
    backgroundColor: '#f2f4f6',
    borderRadius: 16,
    padding: 24,
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191c1e',
  },
  forecastDetailsBtn: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0058be',
  },
  forecastList: {
    gap: 0,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(194, 198, 214, 0.3)',
  },
  forecastRowLast: {
    borderBottomWidth: 0,
  },
  forecastDay: {
    width: 48,
    fontSize: 16,
    fontWeight: '500',
    color: '#191c1e',
  },
  forecastHighLow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 100,
    gap: 16,
  },
  forecastActiveTemp: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191c1e',
  },
  forecastInactiveTemp: {
    fontSize: 14,
    color: '#727785',
  },
});
