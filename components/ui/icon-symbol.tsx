// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}

export function MaterialSymbols({ name, size = 24, color, style }: any) {
  // Map some newer material symbols to existing material icons in Expo
  const map: any = {
    'partly-cloudy-day': 'wb-cloudy',
    'light-mode': 'wb-sunny',
    'air': 'air',
    'humidity-percentage': 'water-drop',
    'visibility': 'visibility',
    'grid-view': 'grid-view',
    'search': 'search',
    'location-on': 'location-on',
    'wb-sunny': 'wb-sunny',
    'cloud': 'cloud',
    'link': 'link',
    'download': 'file-download',
    'share': 'share',
    'palette': 'palette',
    'history': 'history',
    'chevron-right': 'chevron-right',
    'close': 'close',
    'remove': 'remove',
    'add': 'add',
    'equal': 'drag-handle' // fallback for 'equal'
  };
  return <MaterialIcons name={map[name] || name} size={size} color={color} style={style} />;
}
