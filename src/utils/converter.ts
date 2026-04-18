export const convertLength = (value: number, fromUnit: string, toUnit: string): number => {
  const rates: { [key: string]: number } = { m: 1, km: 0.001, miles: 0.000621371, feet: 3.28084 };
  return (value / rates[fromUnit]) * rates[toUnit];
};

export const convertWeight = (value: number, fromUnit: string, toUnit: string): number => {
  const rates: { [key: string]: number } = { kg: 1, g: 1000, lb: 2.20462 };
  return (value / rates[fromUnit]) * rates[toUnit];
};

export const convertTemp = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;
  let celsius = value;
  if (fromUnit === 'F') celsius = (value - 32) * (5 / 9);
  if (fromUnit === 'K') celsius = value - 273.15;
  
  if (toUnit === 'C') return celsius;
  if (toUnit === 'F') return (celsius * (9 / 5)) + 32;
  if (toUnit === 'K') return celsius + 273.15;
  return value;
};
