import { convertLength, convertTemp, convertWeight } from '@/src/utils/converter';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = 'Length' | 'Weight' | 'Temperature';

const UNITS = {
  Length: ['m', 'km', 'miles', 'feet'],
  Weight: ['kg', 'lb', 'g'],
  Temperature: ['C', 'F', 'K'],
};

const CATEGORIES = [
  { id: 'Length', icon: 'straighten', label: 'Length' },
  { id: 'Weight', icon: 'line-weight', label: 'Weight' },
  { id: 'Temperature', icon: 'thermostat', label: 'Temp' },
];

export default function ConverterScreen() {
  const [category, setCategory] = useState<Category>('Length');
  const [value, setValue] = useState<string>('150');
  const [fromUnit, setFromUnit] = useState<string>(UNITS.Length[1]); // km
  const [toUnit, setToUnit] = useState<string>(UNITS.Length[2]); // miles

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setFromUnit(UNITS[cat][0]);
    setToUnit(UNITS[cat][1]);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const result = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';

    let converted = 0;
    if (category === 'Length') {
      converted = convertLength(numValue, fromUnit, toUnit);
    } else if (category === 'Weight') {
      converted = convertWeight(numValue, fromUnit, toUnit);
    } else {
      converted = convertTemp(numValue, fromUnit, toUnit);
    }

    return converted.toFixed(2).replace(/\.?0+$/, '');
  }, [value, fromUnit, toUnit, category]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* TopAppBar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="grid-view" size={28} color="#0058be" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>The Hub</Text>
        </View>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJQB1qhpme9ZWrX298nePkWqigMmIcVJ3unNU646Ia5xQcCbTxRxrtg9ceYezoPLzQgECDH-VJ5WrRbhx0hFNgRLgv8Dorou0NM6_0z11-XaPndfYjJ-cRX7kXDaxT_Bt7QVFWZSZ22q98bo9gvvx6e0Kyda-eM_kiFpG9ksAI3k0napPHYNAPL0YrO9xv7r3JeiCpLLZj0TutF0ORwztgxGXUyUfy4sO8UQhasY8fYfrkrhbXXa6xB2LFKVXbigunkRI_y5bH48u9' }} 
          style={styles.avatar} 
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Category Selector */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionLabel}>ACTIVE UTILITY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                  onPress={() => handleCategoryChange(cat.id as Category)}
                >
                  <MaterialIcons 
                    name={cat.icon as any} 
                    size={18} 
                    color={isActive ? '#ffffff' : '#191c1e'} 
                  />
                  <Text style={[styles.categoryPillText, isActive && styles.categoryPillTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Input Field Container */}
        <View style={styles.cardWrapper}>
          <View style={styles.inputCard}>
            <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
            <TextInput
              style={styles.hugeInput}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#e0e3e5"
              value={value}
              onChangeText={setValue}
            />

            <View style={styles.dropdownsGrid}>
              {/* From Dropdown */}
              <View style={styles.dropdownWrapper}>
                <Text style={styles.sectionLabel}>FROM</Text>
                <View style={styles.dropdownBox}>
                  <Picker
                    selectedValue={fromUnit}
                    onValueChange={setFromUnit}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {UNITS[category].map(u => <Picker.Item key={u} label={u} value={u} />)}
                  </Picker>
                </View>
              </View>

              {/* To Dropdown */}
              <View style={styles.dropdownWrapper}>
                <Text style={styles.sectionLabel}>TO</Text>
                <View style={styles.dropdownBox}>
                  <Picker
                    selectedValue={toUnit}
                    onValueChange={setToUnit}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {UNITS[category].map(u => <Picker.Item key={u} label={u} value={u} />)}
                  </Picker>
                </View>
              </View>
            </View>

            {/* Swap Button (Floating) */}
            <View style={styles.swapBtnContainer}>
              <TouchableOpacity style={styles.swapBtn} onPress={handleSwap}>
                <MaterialIcons name="swap-vert" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Result Display Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.resultCard}>
            {/* Subtle Gradient Accent */}
            <View style={styles.resultDecorCircle} />
            
            <View style={styles.resultContent}>
              <Text style={styles.sectionLabel}>CALCULATED RESULT</Text>
              <View style={styles.resultDisplayRow}>
                <Text style={styles.resultHugeText} numberOfLines={1} adjustsFontSizeToFit>
                  {result || '0'}
                </Text>
                <Text style={styles.resultUnitText}>{toUnit}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons name="info" size={16} color="#424754" />
                <Text style={styles.infoText}>
                  Convert {fromUnit} to {toUnit}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Grid (Bento Style) */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconWrapper}>
              <MaterialIcons name="history" size={24} color="#0058be" />
            </View>
            <Text style={styles.actionCardText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconWrapper}>
              <MaterialIcons name="star" size={24} color="#0058be" />
            </View>
            <Text style={styles.actionCardText}>Favorites</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb', // background
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
    color: '#0058be', // primary
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
  categorySection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#424754', // on-surface-variant
    marginBottom: 12,
  },
  categoryList: {
    gap: 12,
    paddingRight: 24,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f2f4f6', // surface-container-low
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  categoryPillActive: {
    backgroundColor: '#0058be', // primary
    shadowColor: '#0058be',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#191c1e', // on-surface
  },
  categoryPillTextActive: {
    color: '#ffffff', // on-primary
  },
  cardWrapper: {
    backgroundColor: '#f2f4f6', // surface-container-low perimeter
    borderRadius: 20,
    padding: 4,
    marginBottom: 24,
  },
  inputCard: {
    backgroundColor: '#ffffff', // surface-container-lowest
    borderRadius: 18,
    padding: 32,
  },
  hugeInput: {
    fontSize: 60,
    fontWeight: '800',
    color: '#191c1e',
    padding: 0,
    margin: 0,
    letterSpacing: -2,
    marginBottom: 24,
  },
  dropdownsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  dropdownWrapper: {
    flex: 1,
  },
  dropdownBox: {
    backgroundColor: '#f2f4f6', // surface-container-low
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    height: 56, // Match height of typical inputs
  },
  picker: {
    width: '100%',
    marginLeft: -8, // Tweak native picker offset
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191c1e',
  },
  swapBtnContainer: {
    alignItems: 'center',
    marginTop: -20, // Negative margin to overlap the bottom
    marginBottom: -56, // Push it out of the container bounds
    zIndex: 10,
    elevation: 10,
  },
  swapBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2170e4', // primary-container
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0058be',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 32,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 24, // spacing to let the swap button breathe
  },
  resultDecorCircle: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(0, 88, 190, 0.05)',
  },
  resultContent: {
    position: 'relative',
    zIndex: 1,
  },
  resultDisplayRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginTop: 8,
  },
  resultHugeText: {
    fontSize: 72,
    fontWeight: '800',
    color: '#0058be', // matching primary tint
    letterSpacing: -3,
    flexShrink: 1,
  },
  resultUnitText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#424754',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#424754',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#e6e8ea', // surface-container-high
    padding: 24,
    borderRadius: 16,
    gap: 16,
  },
  actionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191c1e',
  }
});
