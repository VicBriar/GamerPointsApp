

# To-Do list:
## api
- [ ] Create the UML Diagrams for the app
- [ ] Write tests
  - [ ] api (* is optional)
    - [ ] [x] User Table
      id, name, createdAt, email, password, salt, users(stretch, many, self-relation),tasks(many),role "Admin"
    - [ ] [x] Tasks Table
      id, adminId(one), createdAt, task,
      startDate*,
      dueDate*(if null, will be added to monthly cell every month),
      complete, completedOn, value, occurence {daily, weekly, monthly, bonus}
    - [ ] [x] Task can have one Admin
    - [ ] [x] Admin can have many tasks
    - [ ] [] Create Admin
    - [ ] [] Update Admin user's, name, email, password
    - [ ] [] Delete Admin

## BONUS REQUIRES a due date, Weekly REQUIREs a end-date
  - [ ] [x] Create single task
    - [ ] [] Create multiple tasks based on start date, due date, and occurence
      daily, 12/1/2023 - 12/15/2023 --> generates 16 tasks, each with a start and end date on the day
      weekly, 12/1/2023 - 12/31/2023 --> generates 4*7 tasks, start date is beginning of week, end is end of week.
      monthly, null - null OR date - null --> generates 1 task, start date is createdAt, and end is end of current month
      monthly 12/2023 - 5/2024 OR --> generates 6 monthly tasks with start date's on first of month, and enddates on last of month
      bonus, null - 6/13/2023 --> generates a bonus task, start date is CreatedAt, and have a due date of 6/13


    - [ ] [x] Query tasks
    - [ ] [] Mutate task complete: bool & completedOn: date fields
    - [ ] [] Mutate task complete: bool & completedOn: date fields
    - [ ] [] Delete tasks; can delete one with id
       - [ ] [] delete all tasks with specific title, if complete is false

    # STRETCH:
      - [ ] [] TrueUser Table
      - [ ] [] make a 'user' role
      - [ ] [] User can have many Admins (https://www.prisma.io/docs/concepts/components/prisma-schema/relations/self-relations)
      - [ ] [] Admin can have many Users
      - [ ] [] an authenticated user can edit task complete & completedOn
      - [ ] [] an Authorized Admin can create & edit tasks

## web
 - [ ] web
   - [ ] bonus task form
     - [ ] bonus tasks require start or end date
       - [ ] start date genereates a single bonus task that is never going to dissappear until completed
       - [ ] end date generages a single bonus task that will show up immediatly, but dissappear by the due date
       - [ ] both generates a single bonus task that will show up on start date, with a due date of end date
   - [ ] [] taskS form
     - [ ] [] daily task need a start and end date
       - [ ] []these create daily tasks with no start date, and an end date for every day in range
     - [ ] [] weekly tasks need start and end date
       - [ ] []this generates a weekly task for every monday(this can be a selection later) in the range, with start being monday, and end being the following sunday
     - [ ] []monthly tasks require start and end date
       - [ ] []this generates a monhtly task for every month in selected range, start date is first of month, end date is last of month


   - [ ] [] taskBox component
       - [ ] TB props
         - [ ] purpose; 0 = daily, 1 = weekly, 2 = monthly,3 = 'bonus'
            >this also drives behavoir for what is taken from query,
              >0 is 'occurence = daily' and 'completed = false' and 'endDate = TBdate'
              >1 is 'occurence = weekly' and 'completed = false' and 'endDate <= TBdate'
              >2 is 'occurence = monthly' and 'completed = false' and 'endDate <= TBdate'
              >3 is 'occurence = bonus' and 'completed = false' and 'endDate <= TBdate'
         - [ ] data; result of cell's query
         - [ ] TBdate; a date representing the due date of the TB
       - [ ] TB contains;
         - [ ] h2 title
         - [ ] subtitle date of title(weekly; day of week, monthly; last day of month, bonus; nothing)
         - [ ] ol tasks
           - [ ] Task Component
             - [ ] task date; empty unless on bonus, then it's displayed beside each task
             - [ ] task complete represented with input, checkbox
             - [ ] task description
               - [ ] STRETCH; collapsed unless tapped on

   - [ ] [] weekly (& daily) cell
     - [ ] weekly query; all tasks where occurence is weekly or daily due date <= end of this week
     - [ ] generates a taskBox for every day of the week, and end of week tasks
       - [ ] each taskbox has the results of the query
   - [ ] [] non-weekly cell
     - [ ] [] monthly query; all tasks where occurence is monthly, and start date >= first day of month, end date <= end of this month
     - [ ] [] bonus query; all tasks where occurence is bonus tasks that start or end in current month (start >= month start, or end >= month end)

## general to-do
- [x] write public readme, with how to setup dev envoirment
- [x] setup commands
- [ ] .env instructions
- [x] running commands & test commands
- [x] point of app
- [x] features
- [x] techstack and descions