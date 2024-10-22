import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ToDoCell from 'src/components/Home/ToDo/ToDoCell'
import { makeNewDate } from 'src/components/Task/TaskForm'

const HomePage = () => {

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <ToDoCell />

    </>
  )
}

export default HomePage
