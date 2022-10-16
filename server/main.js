import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const MY_USERNAME = 'ayana';
const MY_PASSWORD = 'password';

const GUEST_USERNAME = 'guest';
const GUEST_PASSWORD = 'secure_password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(MY_USERNAME)) {
    Accounts.createUser({
      username: MY_USERNAME,
      password: MY_PASSWORD,
    });
  }

  if (!Accounts.findUserByUsername(GUEST_USERNAME)) {
    Accounts.createUser({
      username: GUEST_USERNAME,
      password: GUEST_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(MY_USERNAME);

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
