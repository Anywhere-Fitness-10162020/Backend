### Anywhere Fitness App ###

# Endpoints

// I tried to make this into a table but couldn't figure out how. This is my first time writing "markup"
---
 | Login    |   Register    | Users | Classes | Reservations |
 |----------------|:------------------:|:---------------:|-------------------:|:---------------:|:---------------:|
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

__NOTE:__ You can NOT login a user without registering a user first. This is only true for the initial login / registration of a new user. Existing users can login. Failing to do so may or may not result in an error..

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

# ☝️ Proposal
 
---
 
- What problem does your app solve?
Matches fitness instructors with students
Brings structure of a regular gym to your home through an app
 
- Be as specific as possible; how does your app solve the problem?
Solves the problem by having a client and instructor login with different roles in the app, instructor can interact with clients directly.
 
- What is the mission statement?
Help people get healthier and keep people's lives as normal as possible during covid.
 
 
 
 
# 💡 Features
 
---
 
- What features are required for your minimum viable product?
Create and register a client
Create and register an instructor
Instructor: Create, display classes, update/delete classes. Create punchcard
Client: Select classes to sign up, search for classes, cancel registered classes. View punchcard
 
- What features may you wish to put in a future release?
Livestream instructor, video tutorial for workouts
 
- What do the top 3 similar apps do for their users?
Myfitnesspal,  peloton, sweat
They do live streaming and virtual courses for biking, diet advice and calorie counting, pay you to work out
 
 
# 🛠 Frameworks - Libraries
 
---
 
- What 3rd party frameworks/libraries are you considering using?
Axios
React-redux
React-router-dom
Yup or react hook form
Cypress?
Styled-components
 
- Do the APIs you need require you to contact them to gain access?
 no paid apis
 
- Are you required to pay to use said API(s)?
 
 
# 🎯 Target Audience
 
---
 
- Who is your target audience? Be specific.
Millennials, zoomers
Interested in fitness, not currently in a gym
 
 
- What feedback have you gotten from potential users?
Lifting - want someone to be able to check form while lifting
Be able to make calls, upload videos
 
 
- Have you validated this problem and your solution with a target audience? Describe how.
Yes, firsthand feedback
 
 
 
# 🔑 Prototype Key Feature(s)
 
---
 
- How long do you think it will take to implement these features?
One week
- Do you anticipate working on stretch functionality after completion of a Minimal Viable Product?
Yes, we'll aim for stretch
