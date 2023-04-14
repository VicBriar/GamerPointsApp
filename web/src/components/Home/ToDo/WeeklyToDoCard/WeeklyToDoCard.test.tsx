import { render } from '@redwoodjs/testing/web'

import WeeklyToDoCard from './WeeklyToDoCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WeeklyToDoCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WeeklyToDoCard />)
    }).not.toThrow()
  })
})
