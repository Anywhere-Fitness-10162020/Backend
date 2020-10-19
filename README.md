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
 ## GET /
 returns classes:


 ## GET /:id
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
-setup reservations endpoints
-documentation for each endpoint
-ability for to search by 
  - `class time`
  - `class date`
  - `class duration`
  - `class type`
  - `intensity level`
  - `class location`
-tests