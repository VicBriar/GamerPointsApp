// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Week> = (args) => {
//   return <Week {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Week from './Week'

export const generated = () => {
  return <Week />
}

export default {
  title: 'Components/Week',
  component: Week,
} as ComponentMeta<typeof Week>
