import type { ComponentMeta } from '@storybook/react'

import NewBonusTaskPage from './NewTaskPage'

export const generated = () => {
  return <NewBonusTaskPage />
}

export default {
  title: 'Pages/NewTaskPage',
  component: NewBonusTaskPage,
} as ComponentMeta<typeof NewBonusTaskPage>
