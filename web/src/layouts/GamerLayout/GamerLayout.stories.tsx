import type { ComponentMeta, ComponentStory } from '@storybook/react'

import GamerLayout from './GamerLayout'

export const generated: ComponentStory<typeof GamerLayout> = (args) => {
  return <GamerLayout {...args} />
}

export default {
  title: 'Layouts/GamerLayout',
  component: GamerLayout,
} as ComponentMeta<typeof GamerLayout>
