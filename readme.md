1. What is the difference between useContext and Redux in React? When would you
choose one over the other?

Ans-  Well though this is frequently asked question Redux is a wrapper over useContext as the    state function works in accord to react states and redux over that helps in

useContext-

	Redux- 

2. What’s  the role of NgRx Effects in Angular state management?
Ans-

3. How does event loop handle async/await compared to promises?
Ans- Though promise itself is an asynchronous function but it’s has its own 3 states of working stop in promise we can use states like onclick to start the working process and there can be a infinite wait if the button is not clicked 

 but in 

event loop after the shell code runs after certain retention time executes itself it cannot be manipulated by any state use.
	
4. In Webpack, what is the difference between loaders and plugins?
Ans- The difference between loader and plugins
	Loader- Loader is a downloadable module that can be used to do certain tasks usually in small single tasks.
	Plugin- This is an extension module time that also helps in tasks usually used in bigger or single linked pages or applications to lower the strain.
 
5. What are the key differences between yarn and npm in package management?
Ans- The key difference between yarn and npm package are 
	npm- It is a node.js implemented node modules package that has data type in module requires to run node made by node.

Yarn- It is a 3rd party node module package for node js it is faster has lower attribute pointer data and works better offline.

6. Which of the following will debounce an input field in React correctly? (Provide 4 code
snippets as options)
Ans-

7. What is the purpose of strict mode in JavaScript and when would enabling it in a
codebase be harmful?
Ans- Strict mode in Javascript helps in better parsing and better code practises.
8. In Git, how do rebase, merge, and cherry-pick differ in team collaboration workflows?
Ans- Rebase- It rewrites commit history and aslo removes merge commits. 
	Merge- It is mainly used in pushing branched code to main branch helps in debugging 
and maintaining quality of code.
	Cherry-pick- It helps in committing from one branch to another branch.

9. How do you ensure proper lazy loading in Angular modules?
Ans- To ensure proper lazing loading we use a state loading to route the children classes.

10. Which HTTP status codes would you handle explicitly in a frontend REST API
integration and why?
Ans- 404 not found- in react most cases a file must not ne file tagged in XML.
	200k - being the best at it says everything is working well.




Section 3: Debugging / Code Review

import React, { useEffect, useState } from &#39;react&#39;;

function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(&#39;&#39;);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() =&gt; {
    fetchUsers();
  }, []);
  useEffect(() =&gt; {
    setFilteredUsers(
      users.filter((user) =&gt; user.name.includes(filter))
    );
  });
  const fetchUsers = async () =&gt; {
    const res = await fetch(&#39;https://jsonplaceholder.typicode.com/users&#39;);
    const data = await res.json();
    setUsers(data);
  };
  const handleSearch = (e) =&gt; {
    setFilter(e.target.value);
  };
  return (
    &lt;div&gt;
      &lt;h2&gt;User List&lt;/h2&gt;
      &lt;input placeholder=&quot;Search user...&quot; onChange={handleSearch} /&gt;
      &lt;ul&gt;
        {filteredUsers.map((user) =&gt; (
          &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}
export default UserList;



1.
 return (
    &lt;div&gt;
      &lt;h2&gt;User List&lt;/h2&gt;
      &lt;input placeholder=&quot;Search user...&quot; onChange={handleSearch} /&gt;
      &lt;ul&gt;
        {filteredUsers.map((user) =&gt; (
          &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}

In this part there is a </ul> tag which is the end of a unlisted list but there is no start to the tag.The list will not work as the <li tag is not completed.i





2.
const fetchUsers = async () =&gt; {
    const res = await fetch(&#39;https://jsonplaceholder.typicode.com/users&#39;);
    const data = await res.json();
    setUsers(data);
  };

In this part as in the async function the await function is evoked so the setUsers(data) will fetch nothing.
3.

function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(&#39;&#39;);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() =&gt; {
    fetchUsers();
  }, []);


In the set filters the usestate hook calls no function thus generate functions as function and object pointer to null.




Section 4: System Design / Architecture
1. You are building a SPA with a dashboard that includes: a user profile, real-time
notifications, and a data table with infinite scroll. Describe the architecture for the app,
including:
- Component-level separation
- State management choices
- API structure and error handling strategy
- Performance optimizations
- Folder structure

Ans- For a single page application with a dashboard -
	-High level component like user login and another file for user data will be used in first sign up and also if only selected people have access.
	For a Single Page Application (SPA) dashboard with a user profile, real-time notifications, and an infinite scrolling data table, here's a possible architecture breakdown, covering component separation, state management, API structure, error handling, performance optimizations, and folder structure:

Component-level Separation:
Layout Components:
Header (Navigation, User Profile)
Footer
Main Content Container
Dashboard Components:
UserProfile Component
Notifications Component
DataTable Component (with infinite scrolling logic)
State Management (Consider Redux or similar):
Global State:
User Authentication/Profile Data
Current Notification List
Data Table Data (Pagination, Sorting, Filtering)
App Loading/Error States
Component-Specific State:
UI State for individual components (e.g., selected table sorting)
API Structure and Error Handling:
API Endpoints:
/user/profile: Fetch user profile data
/notifications: Get and update notifications
/data: Fetch data for the table (with pagination, filtering, sorting)
Error Handling:
Generic Error Handling (network errors, API errors): Display user-friendly error messages, retry mechanisms.
Specific Error Handling (e.g., authentication errors for API calls)
Performance Optimizations:
Data Fetching:
Lazy Loading: Only fetch data as the user scrolls (infinite scroll)
Caching: Cache frequently accessed data on the client-side to reduce server load.
Server-side Pagination: Pre-render paginated data on the server for initial load.
Rendering Optimizations:
Virtual DOM: Use a library like React to efficiently update the DOM.
Memoization: Cache component outputs to avoid unnecessary re-renders.
Code Splitting:
Split code into smaller bundles to load only what's needed initially and improve initial load time.
Folder Structure:
components:
layout/
dashboard/
api:
services.js (API functions)
utils:
helpers.js (utility functions)
store:
rootReducer.js (redux root reducer)
pages:
dashboard.js (main page)



2. How would you build a frontend caching mechanism to optimize repeated API calls for
dropdown values that rarely change?

Ans- To build frontend caching mechanism to optimize repeated API calls we can local store it and caching libraries like redux persist & cache hit and cache miss techniques.


Section 5: Git Workflow &amp; CI
1. Describe your branching strategy in a team of 6 developers working on sprints.
Ans- A new branching workflow and continuous delivery
	-Release Branch 
	-Integration branch
	-Enviroment branch
	
2. How would you handle a production bug introduced in the latest release via Git and CI?
Ans-  Bug fixing, continuous assessment.

3. How do you ensure consistent linting and formatting before committing?
Ans- to ensure consistent linting and formatting   leverage Git hooks, specifically the pre-commit hook
