# Student-Management-backend
## Appliation for manage students details for personal teachers.


- User Model
```yaml
{ 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
      },
      password: {
        type: String,
        required: true,
      }
}
```


## User APIs 
### POST /login
- Login and create a user document from request body. 
- Save password in encrypted format. (use bcrypt)
- __Response format__
  - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "User created successfully",
    "data": {
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "_id": "6162876abdcb70afeeaf9cf5",
        "createdAt": "2021-10-10T06:25:46.051Z",
        "updatedAt": "2021-10-10T06:25:46.051Z",
        "__v": 0
    }
    token : jwt token
}
```


## POST /user/logout
- __Response format__
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": Success,
    "message": "User Logout",
    }
}
```

- User Model
```yaml
{ 
    : {
        type: String,
        required: true,
        unique: true,
        lowercase:true
      },
      password: {
        type: String,
        required: true,
      }
}
```

## POST /student/user/:userId (Authentication and Authorization required)
- Allow an user to create student details with their userId.
- A user can add subjects and marks to students for maintain results.
- 
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    userId: {type:ObjectId, required:true, ref : "User",trim:true},
    name:{
        type:String,
    },

    lname:{
        type:String
    },
    subject:[

        {
            name:{type:String},
            marks:{type:Number}
        }
    ],
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
}
```


## GET /student/user/:userId (Authentication and Authorization required)
-Uuser can see their students details
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Student details",
    "data": [ {
        "fname": "Jane",
        "lname": "Austin",
         subject:[
        {
        _id:6162876abdcb70afeeaf9cf2
            name:Math,
            marks:67
        },
        
         {
        "fname": "ash",
        "lname": "royal",
         subject:[
        {
            _id:6162876abdcb70afeeaf9cf1
            name:Science,
            marks:67
        }
    ],
        }, ]
        "_id": "6162876abdcb70afeeaf9cf5",
        "UserId :6162876abdcb70afeeaf9cf6
    }
}
```


## PUT /student/:studentId/user/:userId (Authentication and Authorization required)
-User can see Update their students details ( marks and subjects )
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Student details updated",
    "data": [ {
        "fname": "Jane",
        "lname": "Austin",
         subject:[
        {
          _id : 6162876abdcb70afeeaf9cf4
            name:Math,
            marks:88
        },
        
         {
         _id:6162876abdcb70afeeaf9cf8
        "fname": "ash",
        "lname": "royal",
         subject:[
        {
            name:Science,
            marks:67
        }
    ],
        }, ]
        "_id": "6162876abdcb70afeeaf9cf5",
    }
}
```

## DELETE /student/:studentId/user/:userId (Authentication and Authorization required)
-User can see delete their students profile 
- __Response format__
  - _**On success**_ - Return HTTP status 200. Also return the updated user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
```yaml
{
    "status": true,
    "message": "Student deleted",
}
```



