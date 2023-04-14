import SingleTaskToDo from "src/components/Home/ToDo/SingleTaskToDo/SingleTaskToDo"
import type { toDoTasks } from "../../Week/Week";
import { FindToDoTasks, FindToDoTasksVariables } from "types/graphql"
import CardEnum from "src/CardEnum";


interface props {
  title: number;
  day: number;
  date: string;
  toDos: toDoTasks[];
}

const ToDoCard = (props: props) => {

  let {toDos} = props;
  console.log(toDos)
  // let dateArr = new Date(toDos[0].endDate).toISOString().substring(0,10).split("-").reverse()
  // console.log(`day is ${CardEnum.day[props.day]}, date is ${dateArr[1]}/${dateArr[0]}/${dateArr[2]}. my props are; `,props.toDos)
  return (
    <div className="bg-slate-400 flex flex-col m-2 p-2 rounded-lg">
      <div className="flex flex-col items-center" >
        <h1 className="text-slate-50 text-lg font-montserrat">{CardEnum.title[props.title]}</h1>
        <h1 className="text-slate-50 text-lg font-montserrat">{CardEnum.day[props.day]}</h1>
        <h2>{props.date}</h2>
      </div>
      <article>
        <ul>
          {toDos.map(
            (toDo) => {
              return <SingleTaskToDo key={toDo.id} complete={toDo.complete} description={toDo.description} id={toDo.id} />
            }
          )}
        </ul>
      </article>
    </div>
  )
}

export default ToDoCard
