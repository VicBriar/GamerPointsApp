import { FindToDoTasks, FindToDoTasksVariables } from "types/graphql"
import type { toDoTasks } from "../../Week/Week";
import ToDoCard from "../ToDoCard/ToDoCard"

interface WeeklyToDoCardProps {
  title: number;
  toDos: toDoTasks[];
}

const WeeklyToDoCard = (props: WeeklyToDoCardProps) => {
  let {title, toDos} = props;
  return (
    <ToDoCard title={title} date={""} day={title} toDos={toDos} />
  )
}

export default WeeklyToDoCard
