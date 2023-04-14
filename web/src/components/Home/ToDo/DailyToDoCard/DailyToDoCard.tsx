import { FindToDoTasks} from "types/graphql"
import ToDoCard from "../ToDoCard/ToDoCard"

interface DailyToDoCardProps {
  day: number;
  toDos: FindToDoTasks
}

const DailyToDoCard = (props: DailyToDoCardProps) => {

  return (
    <ToDoCard title={props.day} day={props.day} toDos={props.toDos}  />
  )
}

export default DailyToDoCard
