import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

type TaskFormProps = {
  onAddTask: (title: string, description: string) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  function handleSubmit() {
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedDescription) {
      setError('Please enter both a title and description.')
      return
    }

    if (trimmedTitle.length < 3) {
      setError('Task title must be at least 3 characters.')
      return
    }

    onAddTask(trimmedTitle, trimmedDescription)
    setTitle('')
    setDescription('')
    setError('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Add a task</Text>
        <Text style={styles.helperText}>Keep it short and clear so it is easy to review later.</Text>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="e.g. Prepare interview notes"
        placeholderTextColor="#8a9b93"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        multiline
        placeholder="Add a short task description"
        placeholderTextColor="#8a9b93"
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0f766e',
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  container: {
    backgroundColor: '#ffffff',
    borderColor: '#d8e1dc',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  descriptionInput: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  error: {
    color: '#b42318',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  header: {
    marginBottom: 6,
  },
  heading: {
    color: '#16201c',
    fontSize: 18,
    fontWeight: '800',
  },
  helperText: {
    color: '#5b6b63',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#f7faf8',
    borderColor: '#cfd8d3',
    borderRadius: 8,
    borderWidth: 1,
    color: '#16201c',
    fontSize: 15,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  label: {
    color: '#2f3f38',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 14,
  },
})