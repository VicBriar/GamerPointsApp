import type { ComponentMeta } from '@storybook/react'

import NewTaskPage from './NewTaskPage'

export const generated = () => {
  return <NewTaskPage />
}

export default {
  title: 'Pages/NewTaskPage',
  component: NewTaskPage,
} as ComponentMeta<typeof NewTaskPage>
