import type { ComponentMeta } from '@storybook/react'

import NewTasksPage from './NewTasksPage'

export const generated = () => {
  return <NewTasksPage />
}

export default {
  title: 'Pages/NewTasksPage',
  component: NewTasksPage,
} as ComponentMeta<typeof NewTasksPage>
