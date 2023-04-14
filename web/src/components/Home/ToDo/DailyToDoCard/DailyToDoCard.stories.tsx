// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DailyToDoCard> = (args) => {
//   return <DailyToDoCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import DailyToDoCard from './DailyToDoCard'

export const generated = () => {
  return <DailyToDoCard />
}

export default {
  title: 'Components/DailyToDoCard',
  component: DailyToDoCard,
} as ComponentMeta<typeof DailyToDoCard>
