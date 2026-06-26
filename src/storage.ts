import AsyncStorage from '@react-native-async-storage/async-storage'
import type { PersonalTask } from './types'

const TASKS_STORAGE_KEY = '@pritech_tasks'

export async function loadStoredTasks() {
  const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
  return storedTasks ? (JSON.parse(storedTasks) as PersonalTask[]) : []
}

export async function saveTasks(tasks: PersonalTask[]) {
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
}
