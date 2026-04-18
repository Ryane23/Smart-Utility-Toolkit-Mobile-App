import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { View, TextInput, Pressable, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  onAdd: (title: string) => void;
}

export const TaskInput = forwardRef<RNTextInput, Props>(({ onAdd }, ref) => {
  const [text, setText] = useState('');
  const inputRef = React.useRef<RNTextInput | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={text}
        onChangeText={setText}
        placeholder="Add a new task..."
        placeholderTextColor="#9AA4B2"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={handleAdd}
      />

      <Pressable style={styles.addBtn} onPress={handleAdd}>
        <MaterialIcons name="add" size={20} color="#fff" />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  addBtn: {
    backgroundColor: '#0058be',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskInput;
