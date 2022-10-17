import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

// Define the methods through which the program can interact with task items and the Task collection
Meteor.methods({
  // Define insertion method
  'tasks.insert'(text) {
    // Check that the task is a string
    check(text, String);

    // If the user is not logged in, then we cannot create a valid task
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Insert the element into the Task collection, and associate with the user's id
    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  // Define deletion method
  'tasks.remove'(taskId) {
    // Check the that id passed in is a string
    check(taskId, String);

    // Check that the user is logged in
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Find the task in the database
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // If no such task exists, throw an error
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    // Remove the task from the collection
    TasksCollection.remove(taskId);
  },

  // Define setIsChecked method
  // Toggles the completion status of the task
  'tasks.setIsChecked'(taskId, isChecked) {
    // Check that the task id is a string
    check(taskId, String);
    // Check that the isChecked parameter is a boolean
    check(isChecked, Boolean);

    // Check that the user is logged in
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Find the task in the database
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // Throw an error if no task can be found
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    // Toggle the state of the task's isChecked attribute
    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
