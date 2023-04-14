import { FindToDoTasks, FindToDoTasksVariables } from "types/graphql"
import type { toDoTasks } from "../../Week/Week";
import ToDoCard from "../ToDoCard/ToDoCard"

interface DailyToDoCardProps {
  day: number;
  date: string;
  toDos: toDoTasks[];
}

const DailyToDoCard = (props: DailyToDoCardProps) => {
  return (
    <ToDoCard title={props.day} date={props.date} day={props.day} toDos={props.toDos}  />
  )
}

export default DailyToDoCard
