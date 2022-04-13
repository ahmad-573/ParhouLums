# Parhou@Lums - API Specification Document - V 1.0.0

## APIs

## Notes:
1) Front End should check for empty forms/fields wherever required.
2) Back End should always check if admin for admin specific rights.
3) Whenever Token Error occurs (which has the exact form: "Token error") *frontend* should redirect to *login* page.

### 1. IMPORTANT REQUESTS
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Get Status|checks user status in group|/api/checkStatus|{group_id: INT}|`POST`|response.status: 200 (success) or 400 (failure), if 400: {error: String} if 200: {status: INT}|two types of errors: 1) "Not in group" 2) "Some error occurred". If "Not in group", frontend should make changes accordingly (e.g. reload if on dashboard). If "Some error occurred", just raise alert. *This request should also be made when user clicks on a tile and redirection should wait until a response is received*

### 2. Sign in, Sign up, Logout
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|User Login|user submits login form|/api/login|{username: String (unique), password: String}|`POST`|response.status: 200 (success) or 400 (failure), if 400: {error: String} if 200: {}|N/A
|2|User Sign up|user submits sign up form|/api/signup|{username: String (unique), password: String, fullname: String, email:String, question:INT, answer:String}|`POST`|response.status: 200 (success) or 400 (failure), if 400: {error: String}, if 200: {}|Compare Password and re-entered password at frontend. Number the questions arbitrarily and then keep them consistent.
|3|User logout|User presses logout|/api/logout|N/A|`POST`|response.status: 200 (success)|Raise alert if status not equal to 200. 
|4|Forgot Password|User presses forgot password|/api/forgot-password|{question:INT, answer:String, email:String, new_password:String}|`POST`|response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}|Compare Password and re-entered password at frontend. 

### 3. Display, create group (on dashboard)
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Display group dashboard|Gets all groups of specific user|/api/getAllGroups|{}|`POST`|{response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}, if 200, response.json: {groups: list({name: String, status: INT, group_id: INT})}}|status=1 means admin, 0 otherwise|
|2|Display list of users for creating groups, <br /> adding/removing <br />/promoting members|Gets all the desired users, depending on request|/api/getUsers|{type: String, group_id:INT} *group_id is not needed in case of "new"*|`POST`|200 for success, 400 for failure. 400: {error},                         200: {users1 : list({username: String, fullname: String, user_id: INT}), users2 : list({username: String, fullname: String, user_id: INT})}                 *"new": only users1 containing all users except current,                "remove": only users1 containing all grp members except current,                     "add": users1 has all existing members and users2 has all other users,                 "promote": users1 has all existing admins and users2 has all other grp members*|Send this request when user clicks create a new group before modal opens (?). **IMP NOTES:** type has to be one of "new", "add","remove" and "promote". Do not display user_id's.|
|3|Create a new group|User presses create after entering info|/api/createGroup|{group_name: String, member_ids: list(INT)}|`POST`|200 for success, 400 for failure. 400: {error}. 200: {group_id: INT}|Backend should check that the user_id's sent do exist? Also append the current user.


### 4. Group management (on navbar/sidebar)
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Delete group|admin presses delete group|/api/deleteGroup|{group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|2|Add participants|admin presses add participants|/api/addParticipants|{group_id: INT, members: list(user_id: INT)}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Backend should check that the user_id's sent do exist?
|3|Remove participants|admin presses remove participants|/api/removeParticipants|{group_id: INT, members: list(user_id: INT)}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Backend should check that the user_id's sent do exist?
|4|Promote participants|admin presses promote members to admin|/api/promoteToAdmin|{group_id: INT, members: list(user_id: INT)}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Backend should check that the user_id's sent do exist?
|5|Rename group|any member renames group|/api/renameGroup|{group_id: INT, name: String}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Change group state in frontend as well
|6|Leave group|any member leaves group|/api/leaveGroup|{group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|If error says "sole admin", ask/alert to first make new admin(s).

### 5. User management
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Update Username|Updates the username of the user|/api/updateUsername|{username: STR}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Update username state on frontend|
|2|Update Password|Updates password of user|/api/updatePassword|{new_password: STR}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A

### 6. Flashcard
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Create a flashcard|users presses create after entering details|/api/createCard|{title: String, description: String, group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|2|Get all cards|For displaying all cards|/api/getCards|{group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {cards: list({id: INT, title: String, description: String})}
|3|Edit a flashcard|User presses edit after entering details|/api/editCard|{new_title: String, new_description: String, card_id: INT, group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|4|Delete flashcard|User presses delete on a flashcard|/api/deleteCard|{card_id: INT, group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A

### 7. Resources
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Get all topics|For displaying topics|/api/getTopics|{group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {topics: list({topic_id: INT, title: String})}|N/A
|2|Create a topic|A member/admin creates a topic in resources tab|/api/addTopic|{title: String, group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|3|Delete a topic|A member/admin deletes a topic in resources tab|/api/deleteTopic|{topic_id, group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|4|Edit a topic|A member/admin edits a topic title in resources tab|/api/editTopic|{topic_id, new_title: String, group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|5|Get all links|For displaying. Gets all links under a specific topic|/api/getLinks|{group_id: INT, topic_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {links: list({link_id: INT, link: String})}|N/A
|6|Add link|Member/admin can add link under a specific topic|/api/addLink|{group_id: INT, topic_id: INT, link: String}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|7|Delete link|Anyone can delete link in a topic|/api/deleteLink|{link_id: INT, group_id: INT, topic_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A

### 8. Tasklist
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Add a new taskcard|user presses create after entering details|/api/createTask|{category: INT, title: String, description: String, group_id: INT, deadline: DATE, assign_to: INT} **Note:** description, deadline and assign_to are optional. Also, DATE format in PostgreSQL is yyyy-mm-dd as a string. |`POST`|200 for success, 400 for failure. 400: {error}, 200: {task_id :INT}|'No Status' : 1, 'To Do' : 2, 'Doing' : 3, 'Done' : 4
|2|Get all taskcards|For displaying all cards|/api/getTasks|{group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {tasks: list({task_id: INT, category: INT, title: String, description: String, deadline: DATE, assign_to: INT})}|Note that the optional fields in response object may be null/undefined (Actually null in Postman e.g. "assign_to": null). Also, DATE issue ...
|3|Edit a taskcard|User presses edit after entering details|/api/editTask|{title: String, description: String, task_id: INT, group_id: INT, deadline: DATE, assign_to: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Again, description, deadline and assign_to are optional.
|4|Delete taskcard|User presses delete on a taskcard|/api/deleteTask|{task_id: INT, group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|5|Move taskcard|User decides new category from drop-down menu|/api/moveTask|{task_id: INT, group_id: INT, category: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
