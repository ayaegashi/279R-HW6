// Meteor already sets up MongoDB for you.
import { Mongo } from 'meteor/mongo';

// This instantiates a new Mongo collection and exports it
// The Mongo collection will store our documents (i.e. tasks)
export const TasksCollection = new Mongo.Collection('tasks');
