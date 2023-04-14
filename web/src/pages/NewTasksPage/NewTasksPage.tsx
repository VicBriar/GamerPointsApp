import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import NewTasks from 'src/components/NewTasks/NewTasks'

const NewTasksPage = () => {
  return (
    <>
      <MetaTags title="NewTask(s)" description="NewTasks page" />
      <NewTasks />
    </>
  )
}

export default NewTasksPage
