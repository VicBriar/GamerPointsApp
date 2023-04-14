import { timeTag } from "src/lib/formatters";
import { FindToDoTasks } from "types/graphql"
import ToDoCard from "../ToDoCard/ToDoCard"

interface WeeklyToDoCardProps {
  title: number;
  toDos: FindToDoTasks;
}

const WeeklyToDoCard = (props: WeeklyToDoCardProps) => {
  let {title, toDos} = props;
  return (
    <ToDoCard title={title} day={title} toDos={toDos} />
  )
}

export default WeeklyToDoCard
