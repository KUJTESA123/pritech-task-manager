import { StyleSheet, Text, View } from 'react-native'

type EmptyStateProps = {
  title: string
  message: string
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>i</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d8e1dc',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
    padding: 26,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#edf7f4',
    borderRadius: 999,
    height: 34,
    justifyContent: 'center',
    marginBottom: 12,
    width: 34,
  },
  iconText: {
    color: '#0f766e',
    fontSize: 16,
    fontWeight: '800',
  },
  message: {
    color: '#5b6b63',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  title: {
    color: '#16201c',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
})