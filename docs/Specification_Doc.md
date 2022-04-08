# Parhou@Lums - API Specification Document - V 1.0.0

## APIs

## Notes:
1) Front End should check for empty forms/fields wherever required.
2) Back End should always check if admin for admin specific rights.
3) Whenever Token Error occurs (which has the exact form: "Token error") *frontend* should redirect to *login* page.

### 1. IMPORTANT REQUESTS
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Get Admin Status|checks if user is currently an admin in a group|/api/checkAdmin|{group_id: INT}|`POST`|response.status: 200 (success) or 400 (failure), if 400: {error: String} if 200: {status: INT}|two types of error: 1) "Group deleted" 2) "Some error". If group has been deleted frontend should make changes accordingly (e.g. remove tile if on dashboard). *This request should also be made when user clicks on a tile and redirection should wait until a response is received*

### 2. Sign in, Sign up, Logout
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|User Login|user submits login form|/api/login|{username: String (unique), password: String}|`POST`|response.status: 200 (success) or 400 (failure), if 400: {error: String} if 200: {user_id: INT}|N/A
|2|User Sign up|user submits sign up form|/api/signup|{username: String (unique), password: String, fullname: String, email:String, question:INT, answer:String}|`POST`|response.status: 200 (success) or 400 (failure), if 400: {error: String}, if 200: {user_id: INT}|Compare Password and re-entered password at frontend. Number the questions arbitrarily and then keep them consistent.
|3|User logout|User presses logout|/api/logout|N/A|`POST`|response.status: 200 (success)|Raise alert if status not equal to 200. 
|4|Forgot Password|User presses forgot password|/api/forgot-password|{question:INT, answer:String, email:String, new_password:String}|`POST`|response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}|Compare Password and re-entered password at frontend. 

### 3. Display, create group (on dashboard)
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Display group dashboard|Gets all groups of specific user|/api/getAllGroups|{}|`POST`|{response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}, if 200, response.json: {groups: list({name: String, status: INT, group_id: INT})}}|status=1 means admin, 0 otherwise|
|2|Display list of users for creating groups, adding/removing/promoting members|Gets all the desired users, depending on request|/api/getUsers|{type: String}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {users : list({username: String, fullname: String, user_id: INT})}|Send this request when user clicks create a new group before modal opens (?). **IMP NOTES:** type has to be one of "new", "add","remove" and "promote". Do not display user_id's. **Question:** How does front end want modal to look like? Might have to change response object accordingly|
|3|Create a new group|User presses create after entering info|/api/createGroup|{group_name: String, member_ids: list(INT)}|`POST`|200 for success, 400 for failure. 400: {error}. 200: {group_id: INT}|Backend should check that the user_id's sent do exist? Also append the current user.


### 4. Group management (on navbar/sidebar)
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Delete group|admin presses delete group|/api/deleteGroup|{group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|2|Add participants|admin presses add participants|/api/addParticipants|{group_id: INT, members: list(user_id: INT)}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Backend should check that the user_id's sent do exist?
|3|Remove participants|admin presses remove participants|/api/removeParticipants|{group_id: INT, members: list(user_id: INT)}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Backend should check that the user_id's sent do exist?
|4|Promote participants|admin presses promote members to admin|/api/promoteToAdmin|{group_id: INT, members: list(user_id: INT)}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|Backend should check that the user_id's sent do exist?
|5|Rename group|any member renames group|/api/renameGroup|{group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|N/A
|6|Leave group|any member leaves group|/api/leaveGroup|{group_id: INT}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {}|If error says "sole admin", ask/alert to first make new admin(s).





