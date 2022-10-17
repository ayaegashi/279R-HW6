import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
// Import the collection to the server so it sets a skeletal structure up
import { TasksCollection } from '/imports/db/TasksCollection';
// Import methods associated with task items in the Mongo database
import '/imports/api/tasksMethods';
// Import the task publication method
import '/imports/api/tasksPublications';

// Define insertTask function to allow us to add default tasks at startup
const insertTask = (taskText, user) =>
  // Insert the new task item into the Task collection in the database
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

// First set of credentials
const MY_USERNAME = 'ayana';
const MY_PASSWORD = 'password';

// Second set of credentials
const GUEST_USERNAME = 'guest';
const GUEST_PASSWORD = 'secure_password';

Meteor.startup(() => {
  // Create user account using the first set of credentials
  if (!Accounts.findUserByUsername(MY_USERNAME)) {
    Accounts.createUser({
      username: MY_USERNAME,
      password: MY_PASSWORD,
    });
  }

  // Create second user account using the second set of credentials
  if (!Accounts.findUserByUsername(GUEST_USERNAME)) {
    Accounts.createUser({
      username: GUEST_USERNAME,
      password: GUEST_PASSWORD,
    });
  }

  // Let user be the primary user account (not guest)
  const user = Accounts.findUserByUsername(MY_USERNAME);

  // Add a few default tasks to this user account if there are no 
  // tasks currently in the collection
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});
