import { render } from '@redwoodjs/testing/web'

import GamerLayout from './GamerLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GamerLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GamerLayout />)
    }).not.toThrow()
  })
})
