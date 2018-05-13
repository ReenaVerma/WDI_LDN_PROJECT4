![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 4 - Hit Me Up (Travel App)
## Fully Authenticated MERN Stack App

For my final project, I developed a web app, (built with a mobile first experience in mind), using MERN stack technologies - MongoDB, Express, ReactJS and Node.js.  

The app is called "Hit Me Up", which is a website travellers can use, to connect with other travellers online, whilst abroad. The primary function is find and message other users nearby.  And the secondary function, is to see restaurant/bar related content, based on your logged in location, to help plan the user's social life!


##### Visit[ https://hit-me-up-app.herokuapp.com//](https://hit-me-up-app.herokuapp.com/) to register and search for users nearby.

<p align="center"><img src="https://i.imgur.com/9EBg6kV.jpg" width="700"></p>

---
## MVC Product:

<ul>
<li>User registration and login</li>
<li>User's location, (lat and lng), being captured and saved, with Google Maps geolocation.</li>
<li>Storing user data in MongoDB.</li>
<li>Being able to drop all registered user's locations on Google Maps.</li>
<li>Leave a comment on a user's profile.</li>
</ul>

---
## Extra Features Added:

<ul>
<li>Users login date/time being stored in the server side "auth" controller.</li>
<li>Customising Google Maps info window, so located users can be messaged directly from the Hub Page.</li>
<li>Displaying all registered users on a REST index route.
<li>Displaying individual user profiles on a REST show route.
<li>Allowing users to filter/search for users by username, or travelling preference. EG - "solo", "with friends", "business", "with gf/bf".
<li>Using Zomato API to pull through restaurants/social content, based on logged in users lat/lng.
<li>Uploading a user profile photo using Filestack API.</li>
<li>Flash messages.</li>
</ul>

<p align="center">
<img src="https://i.imgur.com/uGIeQds.jpg" width="250">
<img src="https://i.imgur.com/e4DhGd1.png" width="250">
<img src="https://i.imgur.com/BCJjjyM.png" width="250">
<img src="https://i.imgur.com/Wujqw23.png" width="250">
</p>



---
## Challenges:

The MVP of this app, was heavily based around accessing the user/mongoDB base and utilising Google Maps geolocation API.  As this was the first time, I had ever accessed user data to map and utilise in my app, (other than for user authentication/registration/logging in), this project was challenging to initially plan out.

One of the key benefits of ReactJS, is breaking down your code into components - so building your app can be scalable, components can be reused and the development client side, can be a lot more organised, than traditional frameworks.  As I learned how to build my code step-by-step, (rather than knowing the best approach before), a lot of my main MVP code, sits in one component, (GoogleMaps.js).

The next step for me would be to refactor my code, so this component is less clunky.


## Highlights:

As mentioned in project 2's readme, I really love working with APIs.  So I could resist to reuse Google Maps again, but also a new API - Zomato.  I just really love accessing data and utilising what's available, to make my application richer.  It's made me realise, I really love being resourceful when developing apps and it was great to work with a new API in this project.

I also love the fact, I've been able to build a networking app with this project. Social networking one of the most common ways, to meet other people in today's society.  And it's really rewarding i've been able to build something, which can be utilised anywhere, by anyone wanting to travel and socialise. Just knowing I've been able to replicate a messaging/networking app, is a massive highlight of my ReactJS journey.

Adding the filter function also made this app feel more realistic and user friendly.

<p align="center"><img src="https://i.imgur.com/TK3B5UD.jpg" width="700"></p>

---
### Summary:
This is by far my favourite app I've built so far.  The user experience and MVP is so simple, which I believe is the key to a great app. The added extras, also help to polish off the app well, to give it a modern day messaging app look and feel.  

I also really enjoyed developing with ReactJS.  Of all the frameworks I've used, it's by my favourite, due to it's simplicity in developing client-side and the use of components.

This project also made me learn the importance of really thinking out the development of an app, before even writing one line of code.  Ways I can mitigate this, is by planning with pen and paper first and really understanding how the MVP needs to be built and connected.

### Enhancements:
Further enhancements I'd like to make in future include:
- Adding an edit/update route, where users can add additional interests to their profile.  Such as - interested in "cycling, culture, bars, beaches" etc.  And then enhancing the search users filter, so travellers can be matched/searched for, by shared interests.
- I'd also like to change my API from Zomato to YELP, as YELP's API includes more nightlife related content.
- It would be great to allow a user to share/hide their location - to protect location privacy.


### Setup instructions:
<ul>
<li>Clone or download the repo. </li>
<li>Install dependencies with yarn install or npm install</li>
<li>Run mongod</li>
<li>Launch the app with yarn start:server.</li>
<li>And then yarn start:client.</li>
</ul>

<p align="center"><img src="https://i.imgur.com/oj42m5Q.jpg" width="700"></p>
