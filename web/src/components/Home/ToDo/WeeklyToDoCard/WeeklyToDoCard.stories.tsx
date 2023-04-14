// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof WeeklyToDoCard> = (args) => {
//   return <WeeklyToDoCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import WeeklyToDoCard from './WeeklyToDoCard'

export const generated = () => {
  return <WeeklyToDoCard />
}

export default {
  title: 'Components/WeeklyToDoCard',
  component: WeeklyToDoCard,
} as ComponentMeta<typeof WeeklyToDoCard>
