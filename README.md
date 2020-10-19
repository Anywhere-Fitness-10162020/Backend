### Anywhere Fitness App ###

# Endpoints


---
Login
Register
Users
Classes
Reservations

 | _api/auth/login_ | _api/auth/register_ | _api/users_ | _api/classes_ | _api/reservations_ |
---
## Register
---
1. To register a user you will need to send data to _api/auth/register_ endpoint:
 * The shape of the user data should have the following shape:
    ```json
        {
          username: "Chris",
          password: "12345",
          user_type: 1
        }
    ```
    * user_type 1 is a client from a business perspective, and 2 is a fitness class instructor with the authorization to make and view all classes, as well as edit, and delete the classes they make.

2. Once a new user registered the API will return JSON data with the following shape:

---
## Login
---
To log in use the following steps in order:

__NOTE:__ You can NOT login a user without registering a user first. This is only true for the initial login / registration of a new user. Existing users can login. Failing to do so may or may not result in an error.

1. To Login you will need to send a request to the API with the login data.
   * The data should be _JSON_ data with the following shape:

    ```json
            "username" : "MyUsername",
            "Pasword": "MyPassword"
    ```
    * Once you successfully login you should recieve a JSON response with the following data: 
        ```json 
        {
        "message": "Welcome to our API",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6IkNocmlzdG9waGVyIiwiaWF0IjoxNjAwNzIwNzMwLCJleHAiOjE2MDA3MjQzMzB9.__SevXXb6OXZO_TXfhLe88_cgppEGhgG_Ag5Vw28qsw" 
        }
        ```
        _NOTE_: The token will be different everytime you login, you won't need the token and this is returned solely for backend development purposes
---
## Classes
---
 ## GET api/classes/
 returns array of all classes. Example:
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


 ## GET api/classes/:id
 ----
 returns a class with the given id

## PUT /:id
---

Updates an existing class:

## DELETE /:id
---
Removes an existing class:

---
## Reservations
---
 ## GET /
 returns reservations:


 ## GET /:id
 ----
 returns a reservation with the given id

## PUT /:id
---

Updates an existing reservation:

## DELETE /:id
---
Removes an existing reservation:

## To do:
x setup make reservation endpoint
x move getClassByUserId to users router as that make more sense from url structure perspective
x get rid of addClassByUserId as that is now createReservation
-documentation for each endpoint
-instructors need to only be able to register their account if they have an auth code
x ability for to search by 
  - `class time`
  - `class date`
  - `class duration`
  - `class type`
  - `intensity level`
  - `class location`
  - This may not be necessary. It would be a better user experience if the classes page just displayed a card for every item in an array of all the classes, recieved from the basic classes get request. Then the could search without having to ping the backend, it would all be instant on the frontend. Made the endpoint just in case.
-tests