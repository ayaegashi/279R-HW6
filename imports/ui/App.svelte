<script>
    // Import collection containing tasks in the database
    import { TasksCollection } from '../db/TasksCollection';
    import { Meteor } from 'meteor/meteor';

    // Import the abstracted Task, TaskForm, and LoginForm components
    import Task from './Task.svelte';
    import TaskForm from './TaskForm.svelte';
    import LoginForm from './LoginForm.svelte';

    // Boolean defined so that users can decide between showing all or just 
    // uncompleted task items
    let hideCompleted = false;

    // This filters through all tasks in the Tasks Collection for only those
    // where the isChecked attribute is true
    const hideCompletedFilter = { isChecked: { $ne: true } };

    // Instantiate a variable to keep track of the number of incomplete tasks
    let incompleteCount;
    let pendingTasksTitle = '';
    // Instantiate list of tasks, which will be populated below
    let tasks = [];
    let user = null;
    let isLoading = true;

    // For the data we "published" to be available to the user, we need to subscribe 
    // to that data from the client side
    const handler = Meteor.subscribe('tasks');
    // $ marks an item as reactive, so $m is a reactive element or store
    $m: {
        // Set the value of the user variable
        user = Meteor.user();

        // If the user is logged in
        if (user) {

            isLoading = !handler.ready();

            // Create filter for the user, getting only tasks associated with the current user
            const userFilter = { userId: user._id };
            // Create filter for only uncompleted tasks associated with the current user
            const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

            // Set the value of tasks list to include the appropriate task items, 
            // depending on the user and their settings
            tasks = TasksCollection.find(
                    // If hideCompleted is true, then only show the user's incomplete tasks
                    // Otherwise, show all of the user's tasks
                    hideCompleted ? pendingOnlyFilter : userFilter,
                    { sort: { createdAt: -1 } }
                ).fetch();

            // Update the value of incomplete tasks
            incompleteCount = TasksCollection.find(pendingOnlyFilter).count();

            // If there are incomplete tasks, display the number
            pendingTasksTitle = `${
                incompleteCount ? ` (${incompleteCount})` : ''
            }`;
        }
    } 

    // Function to update hideComplete, updated when the user clicks on "Show All" or "Hide Completed"
    const setHideCompleted = value => {
        hideCompleted = value;
    };
    
    // When the user clicks the log out button, trigger Meteor's built-in logout function
    const logout = () => Meteor.logout();
</script>


<div class="app">
    <header>
        <div class="app-bar">
            <div class="app-header">
                <!-- Display the number of incomplete tasks, if there are any -->
                <h1>📝️ To Do List {pendingTasksTitle}</h1>
            </div>
        </div>
    </header>

    <div class="main">
        <!-- If there is a user, i.e. if the user is logged in -->
        {#if user}
            <!-- When user clicks on this text, they will be logged out -->
            <div class="user" on:click={logout}>
                Log out of {user.username} 🚪
            </div>

            <!-- Display the task form, allowing users to input a new task -->
            <TaskForm />

            <!-- Create a filter button -->
            <div class="filter">
                <!-- When the user clicks on the button, toggle between "Show All" and "Hide Completed" -->
                <!-- This will also update the list of tasks being displayed to the user -->
                <button on:click={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
            </div>

            <!-- If the page is loading, display text notifying the user -->
            {#if isLoading}
                <div class="loading">loading...</div>
            {/if}

            <!-- For each task in the tasks array -->
            <ul class="tasks">
              {#each tasks as task (task._id)}
                    <!-- Pass in the task object to the Task component and display -->
                    <Task task={task} />
              {/each}
            </ul>
        {:else}
            <!-- If the user is not logged in, display the LoginForm as defined in LoginForm.svelte -->
            <LoginForm />
        {/if}
    </div>
</div>
