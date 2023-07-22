# Passion Pals

## Iteration 03

 * Start date: July 11
 * End date: July 21

## Process

#### Changes from previous iteration

* In the previous sprint our goal was to be more active on Jira which was true to an extent, but due to our self imposed shorter timeline most of our stories were finished in the final days and the burndown chart did not look ideal. This sprint we will continue to improve our Jira usage and aim to have a better burndown chart. Same success metric

* We will switch from 1-10 scoring to Fibonacci for user story estimates as it is closer to industry standard and we believe it will be more simple. No applicable success metric

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.
* Location stuff for events and users & Recommend Algorithm - Roger
* Chat - Nishu
* Event front end stuff (ie. pagination) - Nic
* Waitlist & live updating event availability - Darren
* Also Chat & Friends - Mustafa
* Pfp, Associating users to the events they create, delete event, search bar - Amitoz

#### Events

* Standup Meetings

We will try to have an online standup meeting every 2-3 days of the sprint just to have a brief check-in with team members, discuss any blockers or challenges, and ensure everyone is on track for their goals.

* Mid-sprint meeting

We will hold an online meeting halfway through the sprint to evaluate where everyone is at and possibly make changes.

* Code Reviews

If we need in smaller groups we may get on a call online together to work on shared issues

#### Artifacts

Jira:
* Jira allows you to create user stories, assign tasks, set priorities, and track the status of each task, which ensures clarity and transparency within the team
* It also allows you to break down larger project goals into manageable tasks, assign them to team members, and monitor their completion.
* This artifact facilitates efficient task allocation, collaboration, and progress monitoring, ultimately helping the team stay organized and meet project milestones.

Discord:
* Discord allows instant messaging and voice chats which makes a great environment for standup meetings, as it enables effective communication within the team.
* It can be used for quick discussions, clarifications, and for sharing important updates or announcements.
* This artifact fosters a collaborative environment, promotes transparency, and ensures everyone is aware of the current state of tasks and the project as a whole.


#### Git / GitHub workflow

We will be working off of the development branch. Once a team member completes their work on a branch, they open a pull request (PR) on GitHub to merge their changes into the development branch, as we want it to constantly stay updated. At the end of sprint 2, a final PR will be made from development to main. Note PRs will be done by whoever is the last person to work on a component, which should generally be the person assigned to the task. They will be reviewed and merged by 1-2 others who did not directly work on the task.

For branch names going forward, they will have the ticket numbers associated at the front, along with a name that very briefly summarizes the stories being covered. For example: “01-login and signup”

We have decided to differentiate between the previous sprint’s work and the development branch so that we can revert to the previous sprint in case something new added breaks something that was supposed to be working. Naming convention is based on the marking scheme from sprint 1 and an additional name so that we won’t need to constantly be referring to Jira for ticket numbers.



## Product

#### Goals and tasks


The priority for this sprint is getting a majority of the main functionality done. For the final sprint we will clean up the UI for everything and add any non-crucial functionality.
Order of importance is rough: 
* Associate created event w/ user (39) - Amitoz
* Delete event (19) - Amitoz
* Searching for event (21) - Amitoz
* Waitlist (23) - Darren
* Event details page (17) - Nic
* Locations for users and events (15) - Roger
* Individual chat (24) - Nishu
* Friends (48) - Mustafa
* Group Chat (25) - Mustafa
* Event recommendation (32) - Roger
* Pagination on event page (46) - Nic
* Real time enroll counter (47) - Darren
* Profile Pic (PFP) (8) - Amitoz
* Event card front end (45) - Nic

#### Artifacts

The artifact we will produce to present our project idea is building more on the functional website from the previous sprint. The website server will be hosted locally, and be able to connect to our online database so that users can use the website to login, signup, and edit profile completed last sprint, along with adding new features for creating events, joining them as users, adding and managing event subscriptions, viewing posted events, and navigating between pages.
