# GamerPointsApp
## An app for organizing to-dos and rewarding yourself for hard work!
  This is a project I'm still actively working on, but was initially created to satisfy an apprenticeship project. Right now, this application has a admin section, and a small database which is populated by that admin section.
  I'm using the [todo list](./TODO.md) to measure my progress. Eventually, I'd like this app to be deployed, with a user-login and a dedicated to-do list created for each user. 
### what is Gamer Points?
  I love the concept of 'game-ifying' diffucult tasks. I also hate to repeat work (I love DRY!). Right now, I have a spreadsheet that contains all the things I'd like to do daily, weekly, and monthly. I make one for a whole year, and painstakingly add a checkbox for each item. When an item is checked off, a progress bar in the spreadsheet ticks up, and a I earn a few pennies (called gamer-points to avoid the demoralizing effect of earning 2 cents for watering a plant).
  I also have a spending area that keeps track of how much gamer points -covnerted to money, that I've 'earned' by keeping my contract with myself. This money can be spent on a 'prize list' of things I've been wanting. 
  At this point, if you feel like I've created a grown-ups chore chart, and chuck-e-cheese prize counter all rolled into one spreadsheet, you'd be right. What could possibly be the drawbacks of such a fun concept? Well, the spreadsheet implementation is unwieldy, error prone, and hard to upkeep. Each month takes about ~30 minutes of copy, pasting, formatting, task updates, ect..

  Enter my apprenticeship! This project is going to be a re-implementation of what I have right now. However, I don't want to just copy what I have. In addition to keeping all my existing behavoir, I plan to extend it by adding secure login, and the ability to share "keys" to the deployed project with my friends, so they can make their own Gamer Points boards as well.


  I chose to use redwood because it seperates front and back end, with TS and GraphqL. This strongly matches the tech stack I used on the job at my apprenticeship, and I wanted to 

## Current MVP:
<img width="758" alt="Screenshot 2023-04-04 at 6 09 30 PM" src="https://user-images.githubusercontent.com/80186785/229955728-6645241b-1538-4d40-9334-1241ad7eb391.png">
===========================

# Info about the stack & local dev
This is a [RedwoodJS](https://redwoodjs.com) bootstrapped app.

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

To run locally:

```
yarn install
```

Then, run the dev command in project

```
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910 
[CLI reference here](https://redwoodjs.com/docs/cli-commands).
