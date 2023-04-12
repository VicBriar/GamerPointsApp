import { render,screen,waitFor } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'
import Task from '../Task/Task'

import TaskForm, {formatDate} from './TaskForm'
import { standard } from './TaskForm.mock'

function validWeeklyDate(start:Date,date:Date):boolean {
    if((start.getUTCDate() - date.getUTCDate()) >= 0){
        console.log("didn't pass first check, ", start.getUTCDate() - date.getUTCDate())
      return false;
    }
    return !!( ( ( date.getUTCDate()-start.getUTCDate() ) % 7 ) === 0 );
  }

function validMonthlyDate(start:Date,date:Date):boolean {
    if((start.getUTCDate() - date.getUTCDate()) >= 0){
      return false;
    }
    const expected = new Date(date.getFullYear(),date.getMonth() + 1,0)
    return (date.getUTCDate() === expected.getUTCDate());
  }

describe('functions',() => {
    it('validweeklydate returns false for enddates that are not a week away from startdate',() =>{
        let today = new Date;
        let end = new Date;
        let endOfWeek = today.getUTCDate() + 7
        end.setUTCDate(endOfWeek);

        expect(today.getUTCDate()-today.getUTCDate()).toBe(0)
        expect(validWeeklyDate(today,today)).toBe(false);
        expect(validWeeklyDate(end,today)).toBe(false);
        expect(validWeeklyDate(today,end)).toBe(true)
    })
    it('validmonthlydate returns false for endDates that are not a month away',() => {
        let today = new Date;
        let endOfMonth = new Date(today.getFullYear(),today.getMonth()+1,0);

        expect(validMonthlyDate(today,today)).toBeFalsy()
        expect(validMonthlyDate(endOfMonth,today)).toBeFalsy()
        expect(validMonthlyDate(today,endOfMonth)).toBeTruthy()
    })
})

describe('TaskForm', () => {
    it('renders form', () => {
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText('Occurence')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByLabelText("Start date")).toBeInTheDocument()
        expect(screen.getByLabelText("End date")).toBeInTheDocument()
    })
    it('renders given props',() => {
        const task = standard().one
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} task={task} />)
        const startDate = new Date(task.startDate)
        const endDate = new Date(task.endDate)


        expect(screen.getByDisplayValue(task.description)).toBeInTheDocument()
        expect(screen.getByDisplayValue(task.value)).toBeInTheDocument()
        expect(screen.getByDisplayValue(task.occurence)).toBeInTheDocument()
        expect(screen.getByLabelText('Start date')).not.toBeNull()
        expect(screen.getByLabelText('End date')).not.toBeNull()
    })

    it("displays today's date, and 'select occurence' if no props passed", async () => {
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByLabelText('Description').nodeValue).toBeNull()
        expect(screen.getByDisplayValue(0)).toBeInTheDocument()
        expect(screen.getByDisplayValue("- Please Select Occurence -")).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatDate())).toBeInTheDocument()
        expect(screen.getByLabelText("End date").nodeValue).toBeNull()
    })

    it('changes end date to start date on daily occurence', async () => {
        const user = userEvent.setup()
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByDisplayValue("- Please Select Occurence -")).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatDate())).toBeInTheDocument()
        expect(screen.getByLabelText("End date").nodeValue).toBeNull()

        await user.selectOptions(screen.getByRole('combobox'), "daily")

        expect(await screen.findByDisplayValue("daily")).not.toBeNull()
        expect((await (screen.findAllByDisplayValue(formatDate()))).length).toBe(2)
    })
    it('changes end date to one week after startdate on weekly occurence', async () => {
        const user = userEvent.setup()
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByDisplayValue("- Please Select Occurence -")).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatDate())).toBeInTheDocument()
        expect(screen.getByLabelText("End date").nodeValue).toBeNull()

        await user.selectOptions(screen.getByRole('combobox'), "weekly")
        const startDate = (await screen.findByLabelText("Start date")).getAttribute("value")
        const endDate = (await screen.findByLabelText("End date")).getAttribute("value")
        const startDateDate = new Date(startDate)
        const endDateDate = new Date(endDate)

        expect((new Date()).getUTCDate() === startDateDate.getUTCDate())
        expect(await screen.findByDisplayValue("weekly")).not.toBeNull()
        expect(validWeeklyDate(startDateDate,endDateDate)).toBeTruthy()

    })
    it('changes end date to one month after startdate on monthly occurence', async () => {
        const user = userEvent.setup()
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByDisplayValue("- Please Select Occurence -")).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatDate())).toBeInTheDocument()
        expect(screen.getByLabelText("End date").nodeValue).toBeNull()

        await user.selectOptions(screen.getByRole('combobox'), "monthly")
        const startDate = (await screen.findByLabelText("Start date")).getAttribute("value")
        const endDate = (await screen.findByLabelText("End date")).getAttribute("value")
        const startDateDate = new Date(startDate)
        const endDateDate = new Date(endDate)

        expect((new Date()).getUTCDate() === startDateDate.getUTCDate())
        expect(await screen.findByDisplayValue("monthly")).not.toBeNull()
        expect(validMonthlyDate(startDateDate,endDateDate)).toBeTruthy()

    })
})
