# DROAD

## Description


 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **dashboard** - As a user I want to see all the news available so that I can choose which ones I want to read
- **Headlines** - As a user I want to read only the headlines of the news.
- **Everything/ All news** - As a user I want to see the news details.
- **Sources** - As a user I want to be able to check the sources and read specific news from the source.
- **Mobiles responsive ** 

## Backlog

##News recomendation 
on the basis of user interest
Ask the user to get notified or not.
if yes
{
Notify the user (1notification per day) via email / sms
}

else{
no nitification will be send to the user
}
##
1)mobile responsive design
2)offline mode reading 
3)Save to read to later
4)Notification through email
5)Progressive Web Application implementation
6)Notification to mobile/ web
7)sharing news via various apps
8)Custom blogs(like and dislike)
- ...


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /news
  - renders the news
  - body: 
    - headlines
    - everything
    - sources
    - description
  -GET /v2/top-headlines
    - renders the headlines of all news.
  -GET /v2/everything
   - renders all news.
   -GET /v2/sources
    -renders all sources available.




## Models

User model
 
```
username: type : objectId,ref:user
password: String
```
Blog model

```
  user : String
  text :String
  name : String
  likes : ref=>"User"
  
```


## Links
### wireframes

https://balsamiq.cloud/svkqwoq/pjaepsx

### Trello

[Link to your trello board](https://trello.com/b/egyihsQe/droad) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/14imran/droad)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
