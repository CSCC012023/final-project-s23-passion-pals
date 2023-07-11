Sprint 2 feature implementation:

# Passion Pals
## Iteration 02

 * Start date: June 30, 2023
 * End date: June 8, 2023

## Process

#### Changes from previous iteration

* Manage Jira and user stories better since we lost a lot of marks for it. Our success metric will be not losing the marks for it going forward
* More effective and disciplined branching and pull requests so that we be more organized in who is doing what as the project gets more complex. The success metric will again be based on our mark for it as we also lost a bit on it for sprint 1.

#### Roles & responsibilities
* Amitoz: Finishing Create event 
* Roger: Navigation bar and Homepage
* Nic: Event page
* Nishu: Event page category filter
* Mustafa: Event Categories
* Event enrolment and availability for users - Darren

#### Events

Standup Meetings

We will try to have an online standup meeting every day of the sprint just to have a brief check-in with team members, discuss any blockers or challenges, and ensure everyone is on track for their goals.

Code Reviews

We will hold a code review on July 4th at 2 pm to review code changes made by team members, provide feedback, identify potential issues, and ensure code quality and consistency.


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

The main priority for this sprint is getting the dashboard and event pages all setup.

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

The main priority for this sprint is finishing creating events, getting all the main pages set up and navigation between them, and getting started on the functionality and frontend for those pages.
The tasks and associated user stories/task number on Jira are as follows:
* Finishing Create event (30) - Amitoz
* Navigation bar (36) - Roger
* Event Page (14/40) - Nishu & Nic
* Event categories (9/12) - Mustafa
* Event enrolment and availability for users (20/22) - Darren
* Dashboard/Homepage (13) - Roger

We are prioritizing functionality over pretty UI so that we can work on other user stories going forward. We will likely update the UI in later sprints.

#### Artifacts

The artifact we will produce to present our project idea is building more on the functional website from the previous sprint. The website server will be hosted locally, and be able to connect to our online database so that users can use the website to login, signup, and edit profile completed last sprint, along with adding new features for creating events, joining them as users, adding and managing event subscriptions, viewing posted events, and navigating between pages.
