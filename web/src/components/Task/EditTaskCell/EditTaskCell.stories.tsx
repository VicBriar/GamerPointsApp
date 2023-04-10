import type {ComponentStory} from '@storybook/react'
import EditTaskCell from '.'

export const generated: ComponentStory<typeof EditTaskCell> = (args) => {
  return <EditTaskCell {...args} />
}