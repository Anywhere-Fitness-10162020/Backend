### Anywhere Fitness App

## GET

API URL: https://anywherefitnesswebapi.herokuapp.com/

should get response that looks like this:
{"api":"running"}

## Register /api/auth/register

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
---
create instructor user
```json
{
    "username": "Sam",
    "email": "Sam@gmail.com",
    "password": "1234",
    "role": "instructor2020"
}
```
---
## Login
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

---

## Classes

---

## POST api/classes

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

## GET api/classes/

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

## GET api/classes/:id

---
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

## PUT api/classes/:id

---

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

## DELETE /:id

---

Send to remove an existing class.
Recieve message in response:
```json
"class id 13 was deleted"
```

---

## Reservations

---

## GET /api/reservations
---

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

## Post /api/reservations
---
Send request body:
```json
{
    "user_id": 11,
    "class_id": 8
}
```


Recieve response body:
```json
{
    "message": "success",
    "result": [
        16
    ]
}
```

## DELETE /:id

---

Removes an existing reservation and sends response of:
```json
{
    "message": "success",
    "result": 1
}
```

---
## Users
---
## GET api/users/:id/reservations
Sends back an array of all classes that the user with that id has a reservation for:
```json
[
    {
        "class_name": "yoga at sunrise",
        "username": "Todd",
        "class_city": "San Francisco",
        "start_time": "2020-10-21 09:00:00",
        "class_duration": "00:45:00",
        "user_id": 1
    },
    {
        "class_name": "running the hills of san fran",
        "username": "Todd",
        "class_city": "San Francisco",
        "start_time": "2020-10-22 09:00:00",
        "class_duration": "01:30:00",
        "user_id": 1
    }
]
```


## To do:

x setup make reservation endpoint
x move getClassByUserId to users router as that make more sense from url structure perspective
x get rid of addClassByUserId as that is now createReservation
x add instructor_id to classes table
- documentation for each endpoint
- instructors need to only be able to register their account if they have an auth code
  x ability for to search by
  - `class time`
  - `class date`
  - `class duration`
  - `class type`
  - `intensity level`
  - `class location`
  - This may not be necessary. It would be a better user experience if the classes page just displayed a card for every item in an array of all the classes, recieved from the basic classes get request. Then the could search without having to ping the backend, it would all be instant on the frontend. Made the endpoint just in case.
- tests
