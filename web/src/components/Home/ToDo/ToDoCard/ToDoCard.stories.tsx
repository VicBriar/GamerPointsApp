// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ToDoCard> = (args) => {
//   return <ToDoCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ToDoCard from './ToDoCard'

export const generated = () => {
  return <ToDoCard title={0} day={0} toDos={{}} />
}

export default {
  title: 'Components/ToDoCard',
  component: ToDoCard,
} as ComponentMeta<typeof ToDoCard>
