# Anywhere Fitness App
---------

### GET
---

API URL: https://anywherefitnesswebapi.herokuapp.com/

should get response that looks like this:
{"api":"running"}

### Register /api/auth/register
---

Send request body like:
```json
{
    "username": "Sam",
    "email": "Sam@gmail.com",
    "password": "1234",
    "role": "client"
}
```
recieve response body of:
```json
{
    "message": "new user created",
    "savedUser": [
        {
            "id": 18,
            "username": "Sam",
            "email": "Sam@gmail.com",
            "password": "$2a$10$DDZx1uJr692LVu4KdUTLAu82xmNbnelLgYHAx8D9pjBp/XWtXQhGO",
            "role": "client",
            "created_at": "2020-10-19 12:23:31",
            "updated_at": "2020-10-19 12:23:31"
        }
    ]
}
```

create instructor user:
```json
{
    "username": "Sam",
    "email": "Sam@gmail.com",
    "password": "1234",
    "role": "instructor2020"
}
```

### Login
---

send request body:
```json
{
    "username": "Sam",
    "password": "1234"
}
```
recieve response body:
{
    "message": "Welcome Sam. Thanks for being an client today! ",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOCwidXNlcm5hbWUiOiJTYW0iLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjAzMTE1OTU0LCJleHAiOjE2MDMyMDIzNTR9.sXu4S8uisRZ17v9_pk39FS8rzURPUDJ7-7Onnx9PR9w"
}

## Classes
---

### POST api/classes
---

Requires Authorization header with instructor JSON Web Token
send request body:
```json
{
  "class_name": "Rock Climbing",
  "type": "Adventure",
  "start_time": "2020-10-21 09:00:00",
  "class_intensity_level": "high",
  "class_city": "Yosemite",
  "attendee_count": 0,
  "max_attendees": 30,
  "class_duration": "03:00:00",
  "class_timezone": null
}
```

Recieve response:
```json
{
    "id": 11,
    "class_name": "Rock Climbing",
    "type": "Adventure",
    "start_time": "2020-10-21 09:00:00",
    "class_intensity_level": "high",
    "class_city": "Yosemite",
    "attendee_count": 0,
    "max_attendees": 30,
    "class_duration": "03:00:00",
    "class_timezone": null
}
```

### GET api/classes/
---

Requires Authorization header with client or instructor JSON Web Token
returns array of all classes
```json
[
    {
        "id": 1,
        "class_name": "yoga at sunrise",
        "type": "yoga",
        "start_time": "2020-10-21 09:00:00",
        "class_intensity_level": "low",
        "class_city": "San Francisco",
        "attendee_count": 0,
        "max_attendees": 30,
        "class_duration": "00:45:00",
        "class_timezone": null
    },
    {
        "id": 2,
        "class_name": "running the hills of san fran",
        "type": "running",
        "start_time": "2020-10-22 09:00:00",
        "class_intensity_level": "high",
        "class_city": "San Francisco",
        "attendee_count": 0,
        "max_attendees": 30,
        "class_duration": "01:30:00",
        "class_timezone": null
    },
    {
        "id": 3,
        "class_name": "mma beginner training",
        "type": "martial arts",
        "start_time": "2020-10-23 15:30:00",
        "class_intensity_level": "medium",
        "class_city": "Los Angeles",
        "attendee_count": 0,
        "max_attendees": 30,
        "class_duration": "02:00:00",
        "class_timezone": null
    }
]
```

### GET api/classes/:id
---

Requires Authorization header with client or instructor JSON Web Token
returns a class with the given id
```json
{
    "id": 11,
    "class_name": "Rock Climbing",
    "type": "Adventure",
    "start_time": "2020-10-21 09:00:00",
    "class_intensity_level": "high",
    "class_city": "Yosemite",
    "attendee_count": 0,
    "max_attendees": 30,
    "class_duration": "03:00:00",
    "class_timezone": null
}
```

### PUT api/classes/:id
---

Requires Authorization header with instructor JSON Web Token
Send request body with modified version of an existing class:
``` json
{
    "id": 11,
    "class_name": "Rock Climbing",
    "type": "Adventure",
    "start_time": "2020-10-21 09:00:00",
    "class_intensity_level": "high",
    "class_city": "Yosemite",
    "attendee_count": 0,
    "max_attendees": 30,
    "class_duration": "03:00:00",
    "class_timezone": null
}
```

Recieve updated object in response:
```json
{
    "id": 11,
    "class_name": "Rock Climbing",
    "type": "Adventure",
    "start_time": "2020-10-21 09:00:00",
    "class_intensity_level": "high",
    "class_city": "Yosemite",
    "attendee_count": 0,
    "max_attendees": 30,
    "class_duration": "03:00:00",
    "class_timezone": null
}
```

### DELETE /:id
---

Requires Authorization header with instructor JSON Web Token
Send to remove an existing class.
Recieve message in response:
```json
"class id 13 was deleted"
```

## Reservations
---

### GET /api/reservations
---

Requires Authorization header with instructor JSON Web Token
get an array of all reservations.
Shortened example response body:
```json
[
    {
        "id": 1,
        "user_id": 1,
        "class_id": 1
    },
    {
        "id": 2,
        "user_id": 1,
        "class_id": 2
    }
]
```

### Post /api/reservations
---

Requires Authorization header with client or instructor JSON Web Token

> [!NOTE]
> This previously allowed a user to register another user for a class because the user_id was sent in the request body. Now the server retrieves the user_id from the JWT instead

In this example user_id: 16 and the request header contains the JWT
Sent request body:
```json
{
    "class_id": 12
}
```


Recieve response body:
```json
"user_id: 16 is now registered for class_id: 12 reservation id is 12"
```

### DELETE /:id
---

Removes an existing reservation and sends response of:
```json
{
    "message": "success",
    "result": 1
}
```

## Users
---

### GET api/users/:id/reservations
---

Requires Authorization header with client or instructor JSON Web Token
Sends back an array of all classes that the user with that id has a reservation for:
```json
[
    {
        "class_name": "Skydiving",
        "type": "adventure",
        "start_time": "2020-10-18 06:00:00",
        "class_intensity_level": "low",
        "class_city": "Knoxville",
        "class_duration": "01:00:00",
        "username": "Sam",
        "user_id": 16
    }
]
```

## Punch Passes
---
### Create Punch Pass
---
#### POST api/punch-pass

Requires Authorization header with instructor JSON Web Token
Send request body:
```json
{
    class_type: "running",
    max_punches: 5
}
```

Recieve response:
```json
{
    id: 1,
    instructor_id: 1,
    class_type: "running",
    max_punches: 5
}
```

#### GET api/punch-pass

Requires Authorization header with instructor JSON Web Token
Recieve array of all punch passes

#### PUT api/punch-pass

Requires Authorization header with instructor JSON Web Token
Send request body:
```json
{
    id: 1,
    instructor_id: 1,
    class_type: "running",
    max_punches: 10
}
```

Recieve response:
```json
{
    id: 1,
    instructor_id: 1,
    class_type: "running",
    max_punches: 10
}
```
#### DELETE /api/punch-pass/:id
Delete if logged as instructor who made the pass


-----
## To do:

x setup make reservation endpoint
x move getClassByUserId to users router as that make more sense from url structure perspective
x get rid of addClassByUserId as that is now createReservation
x add instructor_id to classes table
x documentation for each endpoint
x instructors need to only be able to register their account if they have an auth code
x Authentication and Authorization
- punch cards
- attendence increments and decrements
- tests
