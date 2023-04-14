import type { ComponentMeta } from '@storybook/react'

import NewTask from './NewTask'

export function generated () {
  return <NewTask />
}

export default {
  title: 'Task/NewBonusTask',
  component: NewTask,
} as ComponentMeta<typeof NewTask>