import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import type { PersonalTask } from '../types'

type TaskItemProps = {
  task: PersonalTask
  onDelete: (id: string) => void
  onOpen: (id: string) => void
  onToggle: (id: string) => void
}

export function TaskItem({ task, onDelete, onOpen, onToggle }: TaskItemProps) {
  const createdDate = new Date(task.createdAt).toLocaleDateString()

  return (
    <View style={[styles.card, task.completed && styles.completedCard]}>
      <TouchableOpacity activeOpacity={0.82} onPress={() => onOpen(task.id)}>
        <View style={styles.headerRow}>
          <View style={styles.titleGroup}>
            <Text style={[styles.title, task.completed && styles.completedTitle]} numberOfLines={1}>
              {task.title}
            </Text>
            <Text style={styles.date}>Created {createdDate}</Text>
          </View>
          <Text style={[styles.badge, task.completed ? styles.completedBadge : styles.activeBadge]}>
            {task.completed ? 'Completed' : 'Active'}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.actionButton, task.completed ? styles.restoreButton : styles.completeButton]}
          onPress={() => onToggle(task.id)}
        >
          <Text style={[styles.actionButtonText, task.completed && styles.restoreButtonText]}>
            {task.completed ? 'Mark Active' : 'Mark Done'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(task.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    minHeight: 42,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
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
    marginTop: 12,
    padding: 16,
  },
  completeButton: {
    backgroundColor: '#0f766e',
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  completedCard: {
    backgroundColor: '#fbfdfb',
  },
  completedTitle: {
    color: '#6b7c73',
    textDecorationLine: 'line-through',
  },
  date: {
    color: '#6b7c73',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#fff7f7',
    borderColor: '#f4b4b4',
    borderWidth: 1,
  },
  deleteButtonText: {
    color: '#b42318',
    fontSize: 14,
    fontWeight: '800',
  },
  description: {
    color: '#4d5e55',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  headerRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  restoreButton: {
    backgroundColor: '#f1f7f4',
    borderColor: '#b9cec5',
    borderWidth: 1,
  },
  restoreButtonText: {
    color: '#25423a',
  },
  title: {
    color: '#16201c',
    fontSize: 17,
    fontWeight: '800',
  },
  titleGroup: {
    flex: 1,
  },
})