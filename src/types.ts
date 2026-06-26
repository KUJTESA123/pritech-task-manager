export type TaskStatus = 'all' | 'active' | 'completed'

export type PersonalTask = {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
}

export type RootStackParamList = {
  Tasks: undefined
  TaskDetails: { taskId: string }
}
