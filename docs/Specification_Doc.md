# Parhou@Lums - API Specification Document - V 1.0.0

## APIs

## Note: Front End should check for empty forms/fields wherever required. 

### 1. Sign in, Sign up, Logout
|#|Name|Description|Route|Request Object|Request Type|Response Object|Additional Note
|-|----|-----------|-----|------------|--------------|---------------|----------|
|1|User Login|user submits login form|/api/login|{username: String (unique), password: String}|`POST`|response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}|N/A
|2|User Sign up|user submits sign up form|/api/signup|{username: String (unique), password: String, fullname: String, email:String, question:INT, answer:String}|`POST`|response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}|Compare Password and re-entered password at frontend. Number the questions arbitrarily and then keep them consistent.
|3|User logout|User presses logout|/api/logout|N/A|`GET`|response.status: 200 (success)|Raise alert if status not equal to 200. 
|4|Forgot Password|User presses forgot password|/api/forgot-password|{question:INT, answer:String, email:String, new_password:String}|`POST`|response.status: 200 (success) or 400 (failure), if 400, response.json: {error: String}|Compare Password and re-entered password at frontend. 
