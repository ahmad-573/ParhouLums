# Parhou@Lums - API Specification Document - V 1.0.0

## APIs

## Note: Front End should check for empty forms/fields wherever required.

### 1. Sign in, Sign up, Logout
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|User Login|user submits login form|/api/login|{username: String (unique), password: String}|`POST`|response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}|N/A
|2|User Sign up|user submits sign up form|/api/signup|{username: String (unique), password: String, fullname: String, email:String, question:INT, answer:String}|`POST`|response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}|Compare Password and re-entered password at frontend. Number the questions arbitrarily and then keep them consistent.
|3|User logout|User presses logout|/api/logout|N/A|`POST`|response.status: 200 (success)|Raise alert if status not equal to 200. 
|4|Forgot Password|User presses forgot password|/api/forgot-password|{question:INT, answer:String, email:String, new_password:String}|`POST`|response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}|Compare Password and re-entered password at frontend. 

### 2. Group management
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|---------------|------------|----------|---------------|----------|
|1|Display group dashboard|Gets all groups of specific user|/api/getAllGroups|{username: String}|`POST`|{response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}, if 200, response.json: {groups: list({name: String, status: INT})}}|status=1 means admin, 0 otherwise|
|2|Display list of users for creating groups|Gets all users|/api/getUsers|{}|`POST`|200 for success, 400 for failure. 400: {error}, 200: {users : list({username: String, fullname: String, user_id: INT})}|Send this request when user clicks create a new group before modal opens (?). Do not display user id and current user|
|3|Create a new group|User presses create after entering info|/api/createGroup|{username: String, group_name: String, user_ids: list(INT)}|`POST`|200 for success, 400 for failure. 400: {error}. 200: {group_id: INT}|N/A
|4|Delete group|admin presses delete group|/api/deleteGroup|{}
