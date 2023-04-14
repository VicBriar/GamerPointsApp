import { render } from '@redwoodjs/testing/web'

import Week from './Week'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Week', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Week />)
    }).not.toThrow()
  })
})
