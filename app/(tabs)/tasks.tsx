import TaskInput from '@/src/components/TaskInput';
import TaskItem from '@/src/components/TaskItem';
import { getTasks, saveTasks, Task } from '@/src/services/taskStorage';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = React.useRef<any>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    (async () => {
      const stored = await getTasks();
      setTasks(stored.sort((a, b) => b.createdAt - a.createdAt));
      setLoading(false);
    })();
  }, []);

  const persist = async (newTasks: Task[]) => {
    setTasks(newTasks.sort((a, b) => b.createdAt - a.createdAt));
    await saveTasks(newTasks);
  };

  const handleAdd = async (title: string) => {
    const newTask: Task = {
      id: String(Date.now()),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    await persist([newTask, ...tasks]);
  };

  const focusAdd = () => inputRef.current?.focus?.();

  const handleToggle = async (id: string) => {
    const newTasks = tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));
    await persist(newTasks);
  };

  const handleDelete = async (id: string) => {
    const newTasks = tasks.filter(t => t.id !== id);
    await persist(newTasks);
  };

  const startEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingText(currentTitle);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const trimmed = editingText.trim();
    if (!trimmed) return;
    const newTasks = tasks.map(t => (t.id === editingId ? { ...t, title: trimmed } : t));
    setEditingId(null);
    setEditingText('');
    await persist(newTasks);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const renderEmpty = () => (
    <View style={styles.empty}> 
      <MaterialIcons name="task-alt" size={48} color="#cbd5e1" />
      <Text style={styles.emptyText}>No tasks yet — add your first task.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.header}> 
          <View style={styles.headerLeft}>
            <Text style={styles.subtitle}>Productivity Suite</Text>
            <Text style={styles.title}>Tasks</Text>
            <Text style={styles.lead}>Organize your workflow with the Hub’s checklist tool.</Text>
          </View>
          <Pressable style={styles.headerAdd} onPress={focusAdd}>
            <MaterialIcons name="add" size={20} color="#fff" />
            <Text style={styles.headerAddText}>Add Task</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Active</Text>
            <Text style={styles.statValue}>{tasks.filter(t => !t.completed).length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Due Today</Text>
            <Text style={[styles.statValue, { color: '#6b38d4' }]}>{/* placeholder */ 0}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Efficiency</Text>
            <Text style={styles.statValue}>{tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) + '%' : '—'}</Text>
          </View>
        </View>

        <TaskInput ref={inputRef} onAdd={handleAdd} />

        {editingId && (
          <View style={styles.editRow}>
            <TextInput
              value={editingText}
              onChangeText={setEditingText}
              style={styles.editInput}
              placeholder="Edit task"
              returnKeyType="done"
              onSubmitEditing={saveEdit}
            />
            <Pressable onPress={saveEdit} style={styles.saveBtn}>
              <MaterialIcons name="check" size={20} color="#fff" />
            </Pressable>
            <Pressable onPress={cancelEdit} style={styles.cancelBtn}>
              <MaterialIcons name="close" size={20} color="#64748b" />
            </Pressable>
          </View>
        )}

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggle}
              onStartEdit={startEdit}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : { paddingBottom: 120 }}
          ListEmptyComponent={!loading ? renderEmpty : null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fb' },
  inner: { padding: 20, paddingBottom: 120 },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  editInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 16,
  },
  saveBtn: {
    marginLeft: 8,
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 10,
  },
  cancelBtn: {
    marginLeft: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  empty: { alignItems: 'center', gap: 12 },
  emptyText: { color: '#94a3b8', marginTop: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18 },
  headerLeft: { flex: 1 },
  subtitle: { fontSize: 12, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700' },
  title: { fontSize: 34, color: '#0f1724', fontWeight: '800', marginTop: 6 },
  lead: { fontSize: 14, color: '#6b7280', marginTop: 6 },
  headerAdd: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0058be', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 30 },
  headerAddText: { color: '#fff', fontWeight: '700', marginLeft: 6 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E6E8EA', alignItems: 'flex-start' },
  statLabel: { fontSize: 12, color: '#94a3b8', marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: '800', color: '#0058be' },
});
