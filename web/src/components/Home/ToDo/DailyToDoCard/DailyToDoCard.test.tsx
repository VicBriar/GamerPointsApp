import { render } from '@redwoodjs/testing/web'

import DailyToDoCard from './DailyToDoCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DailyToDoCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DailyToDoCard />)
    }).not.toThrow()
  })
})
