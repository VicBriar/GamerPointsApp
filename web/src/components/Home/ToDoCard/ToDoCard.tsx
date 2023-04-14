import SingleTaskToDo from "src/components/SingleTaskToDo/SingleTaskToDo"
const ToDoCard = () => {
  return (
    <div className="bg-slate-400 flex flex-col m-2 p-2 rounded-lg">
      <div className="flex flex-col items-center" >
        <h1 className="text-slate-50 text-lg font-montserrat">title</h1>
        <h2>date</h2>
      </div>
      <article>
        <ul>
          <SingleTaskToDo />
        </ul>
      </article>
    </div>
  )
}

export default ToDoCard
