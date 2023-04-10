import {render, screen} from '@redwoodjs/testing/web'
import { Loading, Failure, Success } from 'web/src/components/Task/EditTaskCell/EditTaskCell'
import { standard } from './EditTaskCell.mock'

describe('Edit Task Cell', () => {
  it('renders loading sucessfully', () => {
    expect(async () => await render(<Loading />)).not.toThrow()
  })
  it('renders loading', () => {
    render(<Loading />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders failure sucessfully',() => {
    expect(async () => await render(<Failure error={new Error('oh no!')} />)).not.toThrow()
  })
  it('renders error message', () => {
    render(<Failure error={new Error("i'm an error message")} />)

    expect(screen.getByText("i'm an error message")).toBeInTheDocument()
  })

  it('renders success', () => {
    expect(() => render(<Success task={standard().one} />)).not.toThrow()
  })
  it('returns form', () => {
    render(<Success task={standard().one} />)

    expect(screen.getAllByRole('textbox').length).toBeGreaterThanOrEqual(2);
  })
})