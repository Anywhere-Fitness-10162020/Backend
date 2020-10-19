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
"class_name": "CON BODY",
"class_duration": "1 hour",
"class_intensity_level": "High",
"class_city": "New York",
"class_date": "October 20, 2020",
"start_time": "7 am",
"class_timezone": "Eastern",
"type": "Body Weight",
"attendees": 0,
"max_attendees": 30,
"instructor_id": 4
}
```

Recieve response:
```json
{
    "id": 13,
    "class_name": "CON BODY",
    "class_duration": "1 hour",
    "class_intensity_level": "High",
    "class_city": "New York",
    "class_date": "October 20, 2020",
    "start_time": "7 am",
    "class_timezone": "Eastern",
    "type": "Body Weight",
    "attendees": 0,
    "max_attendees": 30,
    "instructor_id": 4
}
```

## GET api/classes/

returns array of all classes
```json
[
{
"id": 1,
"class_name": "yoga at sunrise",
"class_duration": "45 minutes",
"class_intensity_level": "low",
"class_city": "San Francisco",
"class_date": "February 15, 2020",
"start_time": "7am",
"class_timezone": null,
"type": "general",
"attendees": 0,
"max_attendees": 1
},
{
"id": 2,
"class_name": "running the hills of san fran",
"class_duration": "1.5 hours",
"class_intensity_level": "high",
"class_city": "San Francisco",
"class_date": "February 16, 2020",
"start_time": "6am",
"class_timezone": null,
"type": "general",
"attendees": 0,
"max_attendees": 1
},
]
```

## GET api/classes/:id

---
returns a class with the given id
{
"id": 1,
"class_name": "yoga at sunrise",
"class_duration": "45 minutes",
"class_intensity_level": "low",
"class_city": "San Francisco",
"class_date": "February 15, 2020",
"start_time": "7am",
"class_timezone": null,
"type": "general",
"attendees": 0,
"max_attendees": 1
}

## PUT api/classes/:id

---

Send request body with modified version of an existing class:
``` json
{
    "class_name": "CON BODY",
    "class_duration": "45 minutes",
    "class_intensity_level": "High",
    "class_city": "New York",
    "class_date": "October 20, 2020",
    "start_time": "7 am",
    "class_timezone": "Eastern",
    "type": "Body Weight",
    "attendees": 0,
    "max_attendees": 30,
    "instructor_id": 4
}
```

Recieve updated object in response:
```json
{
    "id": 13,
    "class_name": "CON BODY",
    "class_duration": "45 minutes",
    "class_intensity_level": "High",
    "class_city": "New York",
    "class_date": "October 20, 2020",
    "start_time": "7 am",
    "class_timezone": "Eastern",
    "type": "Body Weight",
    "attendees": 0,
    "max_attendees": 30,
    "instructor_id": 4
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
        "username": "Liam",
        "class_city": "San Francisco",
        "start_time": "7am",
        "class_duration": "45 minutes",
        "user_id": 2,
        "class_date": "February 15, 2020"
    },
    {
        "class_name": "brazialian jui jitsu white to blue belt rolling practice",
        "username": "Liam",
        "class_city": "Miami",
        "start_time": "1pm",
        "class_duration": "3 hours",
        "user_id": 2,
        "class_date": "February 18, 2020"
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
