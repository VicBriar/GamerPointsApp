import type { ComponentMeta } from '@storybook/react'
import NewTasks from 'src/components/NewTasks/NewTasks'
import NewBonusTask from './NewTask'

export function generated () {
  return <NewBonusTask />
}

export default {
  title: 'Task/NewBonusTask',
  component: NewTasks,
} as ComponentMeta<typeof NewBonusTask>