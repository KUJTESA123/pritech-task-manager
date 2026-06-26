import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { EmptyState } from '../components/EmptyState'
import { TaskForm } from '../components/TaskForm'
import { TaskItem } from '../components/TaskItem'
import { useTasks } from '../TaskContext'
import type { RootStackParamList, TaskStatus } from '../types'

type TaskListScreenProps = NativeStackScreenProps<RootStackParamList, 'Tasks'>

const filters: TaskStatus[] = ['all', 'active', 'completed']

export function TaskListScreen({ navigation }: TaskListScreenProps) {
  const { addTask, apiSuggestions, deleteTask, isLoading, tasks, toggleTask } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<TaskStatus>('all')

  const completedCount = tasks.filter((task) => task.completed).length
  const activeCount = tasks.length - completedCount

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(normalizedSearch)
      const matchesFilter =
        selectedFilter === 'all' ||
        (selectedFilter === 'completed' && task.completed) ||
        (selectedFilter === 'active' && !task.completed)

      return matchesSearch && matchesFilter
    })
  }, [searchTerm, selectedFilter, tasks])

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.eyebrow}>PRITECH technical task</Text>
          <Text style={styles.title}>Personal Tasks</Text>
          <Text style={styles.subtitle}>Plan the small things, finish them, and keep a clear record.</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{completedCount}</Text>
            <Text style={styles.statLabel}>Done</Text>
          </View>
        </View>

        <TaskForm onAddTask={addTask} />

        {apiSuggestions.length ? (
          <View style={styles.apiBox}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick ideas</Text>
              <Text style={styles.sectionCaption}>From public API</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {apiSuggestions.map((suggestion) => (
                <TouchableOpacity
                  activeOpacity={0.82}
                  key={suggestion.id}
                  style={styles.suggestionButton}
                  onPress={() =>
                    addTask(
                      suggestion.title,
                      'Task title fetched from JSONPlaceholder public API.',
                    )
                  }
                >
                  <Text style={styles.suggestionText} numberOfLines={2}>
                    {suggestion.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}

        <View style={styles.controls}>
          <TextInput
            placeholder="Search by title"
            placeholderTextColor="#8a9b93"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <View style={styles.filterRow}>
            {filters.map((filter) => (
              <TouchableOpacity
                activeOpacity={0.85}
                key={filter}
                style={[styles.filterButton, selectedFilter === filter && styles.activeFilterButton]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === filter && styles.activeFilterButtonText,
                  ]}
                >
                  {filter[0].toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Text style={styles.count}>{filteredTasks.length} shown</Text>
        </View>

        {isLoading ? (
          <ActivityIndicator color="#0f766e" size="large" style={styles.loader} />
        ) : filteredTasks.length ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onOpen={(taskId) => navigation.navigate('TaskDetails', { taskId })}
              onToggle={toggleTask}
            />
          ))
        ) : (
          <EmptyState
            title={tasks.length ? 'No matching tasks' : 'No tasks yet'}
            message={
              tasks.length
                ? 'Try changing the search text or status filter.'
                : 'Add your first task using the form above.'
            }
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  activeFilterButton: {
    backgroundColor: '#0f766e',
    borderColor: '#0f766e',
  },
  activeFilterButtonText: {
    color: '#ffffff',
  },
  apiBox: {
    marginTop: 20,
  },
  content: {
    padding: 20,
    paddingBottom: 44,
  },
  controls: {
    marginTop: 22,
  },
  count: {
    color: '#5b6b63',
    fontSize: 13,
    fontWeight: '800',
  },
  eyebrow: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  filterButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#cfd8d3',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 42,
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#2f3f38',
    fontSize: 13,
    fontWeight: '800',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  header: {
    marginBottom: 16,
  },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  loader: {
    marginTop: 28,
  },
  screen: {
    backgroundColor: '#edf3ef',
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderColor: '#cfd8d3',
    borderRadius: 8,
    borderWidth: 1,
    color: '#16201c',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  sectionCaption: {
    color: '#6b7c73',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#16201c',
    fontSize: 17,
    fontWeight: '800',
  },
  statBox: {
    backgroundColor: '#ffffff',
    borderColor: '#d8e1dc',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  statLabel: {
    color: '#6b7c73',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  statValue: {
    color: '#16201c',
    fontSize: 24,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  subtitle: {
    color: '#4d5e55',
    fontSize: 15,
    lineHeight: 22,
  },
  suggestionButton: {
    backgroundColor: '#ffffff',
    borderColor: '#9fd3c7',
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 10,
    minHeight: 64,
    paddingHorizontal: 13,
    paddingVertical: 11,
    width: 210,
  },
  suggestionText: {
    color: '#0f766e',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  title: {
    color: '#16201c',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 8,
  },
})