import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

// "Publish" is a way of deciding what data is available to the users
// The second argument to Meteor.publish, the publishTasks() function,
// decides what is available. Since we want the user to be able to 
// interact with their tasks, we publish all tasks
Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
