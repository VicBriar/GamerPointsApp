import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const NewTasksPage = () => {
  return (
    <>
      <MetaTags title="NewTasks" description="NewTasks page" />

      <h1>NewTasksPage</h1>
      <p>
        Find me in <code>./web/src/pages/NewTasksPage/NewTasksPage.tsx</code>
      </p>
      <p>
        My default route is named <code>newTasks</code>, link to me with `
        <Link to={routes.newTasks()}>NewTasks</Link>`
      </p>
    </>
  )
}

export default NewTasksPage
