# 279R HW6: To-Do List App using Meteor and Svelte

## Reflection

#### What are the significant software concepts that this combination of technologies has that each previous set of technologies did not? Or that they handle significantly differently?

One difference between Meteor and many of the other combinations of technologies we have seen until now is that Meteor is a full stack Javascript framework. As a result, Meteor allows you to handle both the front and back end of the web app. In this respect, it is similar to Flask, which also allowed for easy backend integration. However, Meteor goes beyond just allowing the developer to connect a database to their app without leaving the code editor. As this to-do app demonstrates, Meteor has some built-in functionality such as the Accounts functionality. This apps uses this in `LoginForm.svelte` as well as in the `main.js` file inside the `server` folder. Thus, the developer doesn't need to explicitly create a user accounts collection in MongoDB since this is abstracted away by Meteor.

I also thought that Meteor allowed a very straightforward way to deploy the web app. Using cloud.meteor.com, I just had to link my GitHub account and then run one line of code in my terminal to deploy the app. This contrasts with using Heroku, a third party deployment service which took a lot of debugging for me, or even GitHub pages, which I used to deploy my React Doodle app. I think in this way, Meteor is really streamlined and easy to make a web app from start to finish.

## Citations

This to-do list app was created by following this online tutorial: https://svelte-tutorial.meteor.com/simple-todos/


## How to Open my To-Do List App

I deployed my To-Do List App at https://ayana-todo-list.meteorapp.com/. This To-Do List app includes a login feature. I have created two logins which you can use to see how the web app allows for multiple independent lists.

**Test Login 1**\
Username: ayana\
Password: password

**Test Login 2**\
Username: guest\
Password: secure_password
