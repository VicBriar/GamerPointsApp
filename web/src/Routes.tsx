// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import TasksLayout from 'src/layouts/TasksLayout/TasksLayout'
import NewTask from './components/Task/NewTask/NewTask'
import GamerLayout from './layouts/GamerLayout/GamerLayout'

const Routes = () => {
  return (
    <Router>
      <Set
        wrap={GamerLayout}
        >
           <Route path="/" page={HomePage} name="home" />
           <Route notfound page={NotFoundPage} />
        </Set>

      <Set
        wrap={TasksLayout}
        title="Tasks"
        titleTo="tasks"
        createButtonLabel="Create Task(s)"
        createButtonTo="newTasks"
      >
        <Route path="/tasks/new" page={NewTask} name="newTasks" />
        {/* <Route path="/tasks/new" page={NewTasksPage} name="newTasks" /> */}
        <Route path="/tasks/{id:Int}/edit" page={TaskEditTaskPage} name="editTask" />
        <Route path="/tasks/{id:Int}" page={TaskTaskPage} name="task" />
        <Route path="/tasks" page={TaskTasksPage} name="tasks" />
      </Set>

    </Router>
  )
}

export default Routes
