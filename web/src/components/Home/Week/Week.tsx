import { FindToDoTasks, FindToDoTasksVariables } from "types/graphql"
import DailyToDoCard from "../ToDo/DailyToDoCard/DailyToDoCard"
import WeeklyToDoCard from "../ToDo/WeeklyToDoCard/WeeklyToDoCard";
import CardEnum from "src/CardEnum";
import Occurence from "src/occurence";
import { makeNewDate } from "src/components/Task/TaskForm";
export interface toDoTasks {
  __typename?: "Task";
  id: number;
  description: string;
  complete?: boolean;
  occurence: string;
  startDate: string;
  endDate?: string;
  completedOn?: string;
}
interface sortedTasks {
        sun: toDoTasks[];
        mon: toDoTasks[];
        tues: toDoTasks[];
        wed: toDoTasks[];
        thurs: toDoTasks[];
        fri: toDoTasks[];
        sat: toDoTasks[];
        week: toDoTasks[];
}

function formatDateForCard(date:string):string{
  let dateArr = date.substring(0,10).split("-").reverse()
  return `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`
}
const Week = ({ tasks }:FindToDoTasks) => {
  let today = makeNewDate();
  let month = today.getMonth();
  let lastDayOfMonth = makeNewDate();
  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
  lastDayOfMonth.setDate(0);


  function sortTasks(tasks:toDoTasks[]):sortedTasks {
    let result:sortedTasks = {
        sun: [],
        mon: [],
        tues: [],
        wed: [],
        thurs: [],
        fri: [],
        sat: [],
        week: [],
    }

    tasks.map(
      (task) => {
        if(task.occurence === Occurence.enum.daily) {

          switch((new Date(task.startDate)).getDay()) {
            case 0:
              result.sun.push({
                ...task,
                startDate: formatDateForCard(task.startDate),
                endDate: formatDateForCard(task.startDate),
              })
              break;
            case 1:
              result.mon.push({
                ...task,
                startDate: formatDateForCard(task.startDate),
                endDate: formatDateForCard(task.startDate),
              })
              break;
            case 2:
              result.tues.push({
                ...task,
                startDate: formatDateForCard(task.startDate),
                endDate: formatDateForCard(task.startDate),
              })
              break;
            case 3:
              result.wed.push({
                ...task,
                startDate: formatDateForCard(task.startDate),
                endDate: formatDateForCard(task.startDate),
              })
              break;
            case 4:
              result.thurs.push({
                ...task,
                startDate: formatDateForCard(task.startDate),
                endDate: formatDateForCard(task.startDate),
              })
              break;
            case 5:
              result.fri.push({
                ...task,
                startDate: formatDateForCard(task.startDate),
                endDate: formatDateForCard(task.startDate),
              })
              break;
            case 6:
              result.sat.push({
                ...task,
                startDate: formatDateForCard(task.startDate),
                endDate: formatDateForCard(task.startDate),
              })
              break;
        }

        }else if(task.occurence === Occurence.enum.weekly) {
          result.week.push({
            ...task,
            startDate: formatDateForCard(task.startDate),
            endDate: formatDateForCard(task.startDate),
          })
        }
      }
    )

    return result;
  }
  let {sun,mon,tues,wed,thurs,fri,sat,week} = sortTasks(tasks);
  return (
    <div className="grid grid-cols-4">
      <DailyToDoCard day={0} date={"4/09/2023"} toDos={sun} />
      <DailyToDoCard day={1} date={"4/10/2023"}  toDos={mon} />
      <DailyToDoCard day={2} date={"4/11/2023"}  toDos={tues} />
      <DailyToDoCard day={3} date={"4/12/2023"}  toDos={wed} />
      <DailyToDoCard day={4} date={"4/13/2023"}  toDos={thurs} />
      <DailyToDoCard day={5} date={"4/14/2023"}  toDos={fri} />
      <DailyToDoCard day={6} date={"4/15/2023"}  toDos={sat} />
      <WeeklyToDoCard title={7} toDos={week} />
    </div>
  )
}

export default Week
