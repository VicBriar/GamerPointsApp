import type {ComponentStory} from '@storybook/react'

import {Loading,Success,Failure} from './EditTaskCell'
import { standard } from './EditTaskCell.mock'

export const loading = () => {
  return <Loading />
}

export const success = () => {
  return <Success task={standard().one}/>
}

export const failure = () => {
  return <Failure error={new Error("oh no! and error")} />
}

export default { title: 'Cells/EditTaskCell' }