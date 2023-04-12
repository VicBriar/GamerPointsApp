import { render, screen, waitFor,fireEvent } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'
import TaskForm, { formatDate } from '../TaskForm/TaskForm'

import NewBonusTask from './NewBonusTask'
import { standard } from './NewBonusTask.mock'
import { generateDailyRange } from './NewBonusTask'

describe('New Bonus Task', () => {
    it('renders heading', () => {
        render(<NewBonusTask />)

        expect(screen.getByText('New Task(s)')).toBeInTheDocument()
    })

    it('renders form', () => {
        render(<NewBonusTask />)

        expect(screen.getAllByRole('textbox').length).toBeGreaterThanOrEqual(2)
    })

    it('saving bonus task creates single task',async ()=>{
        const user = userEvent.setup()
        // const onSave = jest.fn()
        // render(<TaskForm error={null} onSave={onSave} loading={false} />)
        render(<NewBonusTask />)
        const saveBtn = screen.getByText("Save")
        const form:HTMLFormElement = screen.getByTestId("form")

        const description = (screen.getByLabelText("Description"));
        expect(description.getAttribute("value")).toBe("");
        expect(description).toBeEnabled()
        const value = (screen.getByLabelText("Value"));
        expect(value.getAttribute("value")).toBe("0")
        const occurence = (screen.getByRole("combobox"));
        expect(occurence).not.toBeNull()
        const selections = (screen.getAllByRole("option"))
        expect(selections).not.toBeNull()
        const startDate:HTMLInputElement = (screen.getByLabelText("Start date"));
        expect(startDate.getAttribute("value")).not.toBeNull()
        const endDate = (screen.getByLabelText("End date"));
        expect(endDate.getAttribute("value")).not.toBeNull()

        await user.selectOptions(occurence,"bonus")
        await user.type(description,"test task")
        await user.type(value,"0.23")

        await waitFor(() => user.clear(startDate))
        await waitFor(() => user.type(startDate,'2020-05-01'))
        await waitFor(() => user.clear(endDate))
        await waitFor(() => user.type(endDate,'2020-05-30'))

        expect(selections.find((item: HTMLOptionElement) => item.selected === true).getAttribute("value")).toBe("bonus")
        expect(screen.getByDisplayValue("test task")).toBeInTheDocument()
        expect(screen.getByDisplayValue("00.23")).toBeInTheDocument()
        expect(screen.getByDisplayValue("2020-05-01")).toBeInTheDocument()
        expect(screen.getByDisplayValue("2020-05-30")).toBeInTheDocument()

        // await user.click(saveBtn)
        // expect(form.onsubmit).toBeCalledTimes(1)



    })

    it('generateDailyRange generates an array of dates between start and end points', () => {
        const start = new Date("2020-3-1");
        const end = new Date("2020-3-30");
        const dayAfter = new Date(start);
        dayAfter.setDate(dayAfter.getUTCDate() + 1)
        const result = generateDailyRange(start,end)

        expect(typeof result).toBe("object")
        expect(result.length).toBe(30)
        expect(start.getUTCDate()).toBe(new Date("2020-3-1").getUTCDate())
        expect(result[0].getUTCDate()).toBe(start.getUTCDate())
        expect(result[29].getUTCDate()).toBe(end.getUTCDate())
        expect(result[1].toISOString()).toBe(dayAfter.toISOString())

    })
})