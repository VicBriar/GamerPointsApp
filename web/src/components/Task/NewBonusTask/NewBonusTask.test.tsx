import { render, screen, waitFor } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'
import NewBonusTask from './NewBonusTask'

describe('New Bonus Task', () => {
    it('renders heading', () => {
        render(<NewBonusTask />)

        expect(screen.getByText('New Bonus Task')).toBeInTheDocument()
    })

 

})