import SingleTaskToDo from "src/components/Home/ToDo/SingleTaskToDo/SingleTaskToDo"
import { FindToDoTasks } from "types/graphql";
import CardEnum from "src/CardEnum";


interface props {
  title: number;
  day: number;
  toDos: FindToDoTasks;
}

const ToDoCard = (props: props) => {
  console.log(props.toDos)
  let dateArr = new Date(props.toDos[0].endDate).toISOString().substring(0,10).split("-").reverse()
  return (
    <div className="bg-slate-400 flex flex-col m-2 p-2 rounded-lg">
      <div className="flex flex-col items-center" >
        <h1 className="text-slate-50 text-lg font-montserrat">{CardEnum.title[props.title]}</h1>
        <h1 className="text-slate-50 text-lg font-montserrat">{CardEnum.day[props.day]}</h1>
        <h2>{`${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`}</h2>
      </div>
      <article>
        <ul>
          <SingleTaskToDo />
          <SingleTaskToDo />
          <SingleTaskToDo />
          <SingleTaskToDo />
        </ul>
      </article>
    </div>
  )
}

export default ToDoCard
