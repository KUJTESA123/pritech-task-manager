import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { EmptyState } from '../components/EmptyState'
import { useTasks } from '../TaskContext'
import type { RootStackParamList } from '../types'

type TaskDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>

export function TaskDetailsScreen({ navigation, route }: TaskDetailsScreenProps) {
  const { deleteTask, findTask, toggleTask } = useTasks()
  const task = findTask(route.params.taskId)

  if (!task) {
    return (
      <View style={styles.screen}>
        <EmptyState title="Task not found" message="This task may have been deleted." />
        <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Back to Tasks</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const currentTask = task

  function handleDelete() {
    deleteTask(currentTask.id)
    navigation.goBack()
  }

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <View style={styles.titleGroup}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.title}>{currentTask.title}</Text>
          </View>
          <Text style={[styles.badge, currentTask.completed ? styles.completedBadge : styles.activeBadge]}>
            {currentTask.completed ? 'Completed' : 'Active'}
          </Text>
        </View>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{currentTask.description}</Text>

        <View style={styles.metaBox}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.metaText}>{new Date(currentTask.createdAt).toLocaleString()}</Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton} onPress={() => toggleTask(currentTask.id)}>
        <Text style={styles.primaryButtonText}>
          {currentTask.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.85} style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Task</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  activeBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
  },
  badge: {
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#d8e1dc',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#fff7f7',
    borderColor: '#f4b4b4',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 14,
  },
  deleteButtonText: {
    color: '#b42318',
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    color: '#2f3f38',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  label: {
    color: '#6b7c73',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  metaBox: {
    backgroundColor: '#f7faf8',
    borderRadius: 8,
    padding: 14,
  },
  metaText: {
    color: '#16201c',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0f766e',
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  screen: {
    backgroundColor: '#edf3ef',
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#16201c',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 34,
  },
  titleGroup: {
    flex: 1,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
})