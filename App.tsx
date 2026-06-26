import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TaskDetailsScreen } from './src/screens/TaskDetailsScreen'
import { TaskListScreen } from './src/screens/TaskListScreen'
import { TaskProvider } from './src/TaskContext'
import type { RootStackParamList } from './src/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              contentStyle: { backgroundColor: '#eef2f7' },
              headerShadowVisible: false,
              headerStyle: { backgroundColor: '#eef2f7' },
              headerTitleStyle: { color: '#0f172a', fontWeight: '800' },
            }}
          >
            <Stack.Screen name="Tasks" component={TaskListScreen} options={{ title: 'My Tasks' }} />
            <Stack.Screen
              name="TaskDetails"
              component={TaskDetailsScreen}
              options={{ title: 'Task Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </SafeAreaProvider>
  )
}
