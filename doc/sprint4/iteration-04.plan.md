# Passion Pals

## Iteration 04

 * Start date: July 27
 * End date: Aug 4

## Process

#### Changes from previous iteration

No changes for this sprint, so listing our most significant decisions.

1. Discord server

Our primary form of communication as a group has been via discord over the semester. We use it for standups/meetings and discussing our progress or issues we’re having. Over the semester it has helped us stay organized as it is much more live than Jira and GitHub and we can directly notify each other of things.

2. Adjusting how we used Git and Jira

At the start of the project our Git usage in terms of branching and pull requests, as well as keeping track of our progress on Jira was not very well done. This led to the project in the beginning being a bit messy and us losing marks. After we adjusted in sprint 2, it became much easier to keep organized as a group, and our mark was significantly higher.

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

In general everyone is full stack either finishing what they've been working on, or cleaning up what exists
* Amitoz: SMS
* Roger: Optimizing find events and cleaning up the fully functioning pages
* Nic: Adding more event card functions
* Nishu: Chat
* Mustafa: Friends
* Darren: Waitlist

#### Events

Standup Meetings
We will try to have an online standup meeting every 2-3 days of the sprint just to have a brief check-in with team members, discuss any blockers or challenges, and ensure everyone is on track for their goals.

Mid-sprint meeting
We will hold an online meeting halfway through the sprint to evaluate where everyone is at and possibly make changes.

Code Reviews
If we need in smaller groups we may get on a call online together to work on shared issues


#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

Jira:

Jira allows you to create user stories, assign tasks, set priorities, and track the status of each task, which ensures clarity and transparency within the team
It also allows you to break down larger project goals into manageable tasks, assign them to team members, and monitor their completion.
This artifact facilitates efficient task allocation, collaboration, and progress monitoring, ultimately helping the team stay organized and meet project milestones.
Discord:

Discord allows instant messaging and voice chats which makes a great environment for standup meetings, as it enables effective communication within the team.
It can be used for quick discussions, clarifications, and for sharing important updates or announcements.
This artifact fosters a collaborative environment, promotes transparency, and ensures everyone is aware of the current state of tasks and the project as a whole.


#### Git / GitHub workflow

We will be working off of the development branch. Once a team member completes their work on a branch, they open a pull request (PR) on GitHub to merge their changes into the development branch, as we want it to constantly stay updated. At the end of the sprint, a final PR will be made from development to main. Note PRs will be done by whoever is the last person to work on a component, which should generally be the person assigned to the task. They will be reviewed and merged by 1-2 others who did not directly work on the task.

For branch names going forward, they will have the ticket numbers associated at the front, along with a name that very briefly summarizes the stories being covered. For example: “01-login and signup”

We have decided to differentiate between the previous sprint’s work and the development branch so that we can revert to the previous sprint in case something new added breaks something that was supposed to be working. Naming convention is based on the marking scheme from sprint 1 and an additional name so that we won’t need to constantly be referring to Jira for ticket numbers.



## Product


#### Goals and tasks
We will likely be adding tasks as we go for this sprint if we notice changes we want to make, or given time permits us to add more.

Order of importance is rough - includes added tasks throughout sprint
* Quiz 4 SMS on event join or friend request - Amitoz
  * Adding phone numbers for user
  * Actual SMS notifications
* Group Chats - Nishu
* Waitlist - Darren
* Edit events - Nic
* Improving the friend functionality (Adding friend requests, page to view current friends, etc) - Mustafa
* Email Verification - Nishu
* Fix for login/signout so user cannot navigate between pages using arrows without being signed in properly - Nishu
* New register page for PFP, locations, and phone number - Amitoz
* Decoupling event cards so that they are a reusable standalone component - Nic
* Adding more event details in the event popup - Nic
* Displaying user name and PFP in chats - Nishu
* Filter by friends - Roger
* Navbar UI - Roger
* Location selector UI - Roger
* findEvents UI - Roger
* Profile UI - Darren
* Recommended modification - Roger
* Minor modificatins/fixes to findEvent - Roger



#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

The artifact we will produce to present our project idea is the functional website we've developed over the course of the project. The website server will be hosted locally, and be able to connect to our online database so that users can use the website to login/signup, create events, add and manage event subscriptions, view posted events and join others' events, along with many more smaller quality of life features throughout the site including smooth UI, navbar to navigate bewteen pages, etc.


