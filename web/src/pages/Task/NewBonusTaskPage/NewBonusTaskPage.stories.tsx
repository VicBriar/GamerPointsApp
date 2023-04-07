import type { ComponentMeta } from '@storybook/react'

import NewBonusTaskPage from './NewBonusTaskPage'

export const generated = () => {
  return <NewBonusTaskPage />
}

export default {
  title: 'Pages/NewTaskPage',
  component: NewBonusTaskPage,
} as ComponentMeta<typeof NewBonusTaskPage>
