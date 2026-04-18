import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { Task } from '@/src/services/taskStorage';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onStartEdit: (id: string, currentTitle: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onStartEdit, onDelete }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onToggle(task.id)} style={styles.checkBtn}>
        <MaterialIcons
          name={task.completed ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={task.completed ? '#0ea5e9' : '#94a3b8'}
        />
      </Pressable>

      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completed]} numberOfLines={2}>
          {task.title}
        </Text>
        <Text style={styles.meta}>{new Date(task.createdAt).toLocaleString()}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => onStartEdit(task.id, task.title)} style={styles.iconBtn}>
          <MaterialIcons name="edit" size={20} color="#6b7280" />
        </Pressable>

        <Pressable onPress={() => onDelete(task.id)} style={styles.iconBtn}>
          <MaterialIcons name="delete" size={20} color="#ef4444" />
        </Pressable>
      </View>
    </View>
  );
  };
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  checkBtn: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
    fontWeight: '500',
  },
  meta: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconBtn: {
    padding: 8,
    marginLeft: 4,
  },
});

export default TaskItem;
