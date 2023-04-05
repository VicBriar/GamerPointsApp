# GamerPointsApp
An app for organizing to-dos and rewarding yourself for hard work!

To-Do list;

## api

[] Create the UML Diagrams for the app
[] Write tests
  [] api (* is optional)
    [][] User Table
      id, name, createdAt, email, password, salt, users(stretch, many, self-relation),tasks(many),role "Admin"
    [][] Tasks Table
      id, adminId(one), createdAt, task, 
      startDate* (if null, will be ignored by bonus cell),
      dueDate*(if null, will be added to monthly cell every month),
      complete, completedOn, value, occurence {daily, weekly, monthly, bonus}
    [][] Task can have one Admin
    [][] Admin can have many tasks
    C [][] Create Admin
    U [][] Update Admin user's, name, email, password
    D [][] Delete Admin 

    
BONUS REQUIRES a due date, Weekly REQUIREs a end-date
    
    C [][] Create single task
    C [][] Create multiple tasks based on start date, due date, and occurence
              daily, 12/1/2023 - 12/15/2023 --> generates 16 tasks, each with a start and end date on the day
              weekly, 12/1/2023 - 12/31/2023 --> generates 4*7 tasks, start date is beginning of week, end is end of week.
              monthly, null - null OR date - null --> generates 1 task, start date is createdAt, and end is end of current month
              monthly 12/2023 - 5/2024 OR --> generates 6 monthly tasks with start date's on first of month, and enddates on last of month
              bonus, null - 6/13/2023 --> generates a bonus task, start date is CreatedAt, and have a due date of 6/13
              
              
    R [][] Query tasks
    U [][] Mutate task complete: bool & completedOn: date fields
    U [][] Mutate task complete: bool & completedOn: date fields
    D [][] Delete tasks; can delete one with id
        [][] delete all tasks with specific title, if complete is false
    
    # STRETCH:
      [][] TrueUser Table
         [][] make a 'user' role         
      [][] User can have many Admins (https://www.prisma.io/docs/concepts/components/prisma-schema/relations/self-relations)
      [][] Admin can have many Users
      [][] an authenticated user can edit task complete & completedOn
      [][] an Authorized Admin can create & edit tasks

===========================      
## web
  [] web
    [][] taskBox component
        [] TB props
          [] purpose; 0 = daily, 1 = weekly, 2 = monthly,3 = 'bonus'
            >this also drives behavoir for what is taken from query, 
              >0 is 'occurence = daily' and 'completed = false' and 'endDate = TBdate'
              >1 is 'occurence = weekly' and 'completed = false' and 'endDate <= TBdate'
              >2 is 'occurence = monthly' and 'completed = false' and 'endDate <= TBdate'
              >3 is 'occurence = bonus' and 'completed = false' and 'endDate <= TBdate'  
          [] data; result of cell's query
          [] TBdate; a date representing the due date of the TB
        [] TB contains;
          [] h2 title
          [] subtitle date of title(weekly; day of week, monthly; last day of month, bonus; nothing)
          [] ol tasks
            [] Task Component
              [] task date; empty unless on bonus, then it's displayed beside each task
              [] task complete represented with input, checkbox
              [] task description
                [] STRETCH; collapsed unless tapped on
        
    [][] weekly (& daily) cell
      []weekly query; all tasks where occurence is weekly or daily due date <= end of this week
      [] generates a taskBox for every day of the week, and end of week tasks
        [] each taskbox has the results of the query
    [][] non-weekly cell
      [][] monthly query; all tasks where occurence is monthly, and start date >= first day of month, end date <= end of this month
      [][] bonus query; all tasks where occurence is bonus tasks that start or end in current month (start >= month start, or end >= month end)
      
   ## general to-do   
[] write public readme, with how to setup dev envoirment
  [] setup commands
  [] .env instructions
  [] running commands & test commands
  [] point of app
  [] features
  [] techstack and descions

===========================
<img width="758" alt="Screenshot 2023-04-04 at 6 09 30 PM" src="https://user-images.githubusercontent.com/80186785/229955728-6645241b-1538-4d40-9334-1241ad7eb391.png">

# README

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
cd my-redwood-project
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 where you'll see the Welcome Page, which links out to a ton of great resources.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).

## Prisma and the database

Redwood wouldn't be a full-stack framework without a database. It all starts with the schema. Open the [`schema.prisma`](api/db/schema.prisma) file in `api/db` and replace the `UserExample` model with the following `Post` model:

```
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` is short for `redwood`

You'll be prompted for the name of your migration. `create posts` will do.

Now let's generate everything we need to perform all the CRUD (Create, Retrieve, Update, Delete) actions on our `Post` model:

```
yarn redwood g scaffold post
```

Navigate to http://localhost:8910/posts/new, fill in the title and body, and click "Save":

Did we just create a post in the database? Yup! With `yarn rw g scaffold <model>`, Redwood created all the pages, components, and services necessary to perform all CRUD actions on our posts table.

## Frontend first with Storybook

Don't know what your data models look like?
That's more than ok—Redwood integrates Storybook so that you can work on design without worrying about data.
Mockup, build, and verify your React components, even in complete isolation from the backend:

```
yarn rw storybook
```

Before you start, see if the CLI's `setup ui` command has your favorite styling library:

```
yarn rw setup ui --help
```

## Testing with Jest

It'd be hard to scale from side project to startup without a few tests.
Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

```
yarn rw test
```

To make the integration even more seamless, Redwood augments Jest with database [scenarios](https://redwoodjs.com/docs/testing.md#scenarios)  and [GraphQL mocking](https://redwoodjs.com/docs/testing.md#mocking-graphql-calls).

## Ship it

Redwood is designed for both serverless deploy targets like Netlify and Vercel and serverful deploy targets like Render and AWS:

```
yarn rw setup deploy --help
```

Don't go live without auth!
Lock down your front and backends with Redwood's built-in, database-backed authentication system ([dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)), or integrate with nearly a dozen third party auth providers:

```
yarn rw setup auth --help
```

## Next Steps

The best way to learn Redwood is by going through the comprehensive [tutorial](https://redwoodjs.com/docs/tutorial/foreword) and joining the community (via the [Discourse forum](https://community.redwoodjs.com) or the [Discord server](https://discord.gg/redwoodjs)).

## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)
