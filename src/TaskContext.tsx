import { createContext, useContext, useEffect, useState } from 'react'
import { loadStoredTasks, saveTasks } from './storage'
import type { PersonalTask } from './types'

type ApiSuggestion = {
  id: number
  title: string
}

type TaskContextValue = {
  apiSuggestions: ApiSuggestion[]
  addTask: (title: string, description: string) => void
  deleteTask: (id: string) => void
  findTask: (id: string) => PersonalTask | undefined
  isLoading: boolean
  tasks: PersonalTask[]
  toggleTask: (id: string) => void
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<PersonalTask[]>([])
  const [apiSuggestions, setApiSuggestions] = useState<ApiSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false)

  useEffect(() => {
    async function hydrateTasks() {
      try {
        const storedTasks = await loadStoredTasks()
        setTasks(storedTasks)
      } finally {
        setIsLoading(false)
        setHasLoadedStorage(true)
      }
    }

    hydrateTasks()
  }, [])

  useEffect(() => {
    if (hasLoadedStorage) {
      saveTasks(tasks)
    }
  }, [hasLoadedStorage, tasks])

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        const suggestions = (await response.json()) as ApiSuggestion[]
        setApiSuggestions(suggestions)
      } catch {
        setApiSuggestions([])
      }
    }

    fetchSuggestions()
  }, [])

  function addTask(title: string, description: string) {
    const task: PersonalTask = {
      id: `${Date.now()}`,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) => [task, ...currentTasks])
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  function findTask(id: string) {
    return tasks.find((task) => task.id === id)
  }

  const value = { apiSuggestions, addTask, deleteTask, findTask, isLoading, tasks, toggleTask }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider')
  }

  return context
}

