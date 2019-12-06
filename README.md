# task-manager-api
NodeJs rest api with authentication using MongoDb-Mongoose-JsonWebTokens 

Endpoints.

1) Creating User -> POST /users 
request body: 
{
	"name": "admin",
	"email": "admin@admin.com",
	"password": "1234567",
	"age": 21
}

2) Login -> POST /login
request body: 
{
	"email":"admin@admin.com",
	"password":"1234567"
}
 ->Note your token !
 
 
 3) Logout -> POST /logout
 *Request Header
Key: Authorization,Value:"Bearer <yourtoken>"

4) Get Your Profile -> GET /user/me
 *Request Header
Key: Authorization,Value:"Bearer <yourtoken>"

5) Create Task -> POST /tasks
 *Request Header
Key: Authorization,Value:"Bearer <yourtoken>"
request body: 
{
	"description" : "othertask",
	"completed" : false
}
	
6) Get Your Tasks -> GET/tasks
 *Request Header
Key: Authorization,Value:"Bearer <yourtoken>"

  
