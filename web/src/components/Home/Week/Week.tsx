import { FindToDoTasks, FindToDoTasksVariables } from "types/graphql"
import DailyToDoCard from "../ToDo/DailyToDoCard/DailyToDoCard"
import WeeklyToDoCard from "../ToDo/WeeklyToDoCard/WeeklyToDoCard";

const Week = ({ tasks }) => {
  function sortTasks(section:number,tasks:FindToDoTasks):FindToDoTasks{
    return tasks;
  }
  let sunday = sortTasks(0,tasks);
  let monday = sortTasks(1,tasks);
  let tuesday = sortTasks(2,tasks);
  let wednesday = sortTasks(3,tasks);
  let thursday = sortTasks(4,tasks);
  let friday = sortTasks(5,tasks);
  let saturday = sortTasks(6,tasks);
  let week = sortTasks(7,tasks)
  return (
    <div className="grid grid-cols-4">
      <DailyToDoCard day={0} toDos={sunday} />
      <DailyToDoCard day={1} toDos={monday} />
      <DailyToDoCard day={2} toDos={tuesday} />
      <DailyToDoCard day={3} toDos={wednesday} />
      <DailyToDoCard day={4} toDos={thursday} />
      <DailyToDoCard day={5} toDos={friday} />
      <DailyToDoCard day={6} toDos={saturday} />
      <WeeklyToDoCard title={7} toDos={week} />
    </div>
  )
}

export default Week
