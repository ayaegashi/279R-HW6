<script>
    export let user = null;
    // Initialize empty text for a new task
    let newTask = '';

    // This function is called when the user tries to submit a new task
    const handleSubmit = () => {
      // If the input field for the task is empty, then don't do anything
      if (!newTask) return;

      // If the user has input a valid task, call the "insert" method defined
      // in tasksMethods.js and pass the task's text value as a parameter
      Meteor.call('tasks.insert', newTask);

      // Clear form
      newTask = '';
    }
</script>

<!-- Define the input field as a form -->
<form class="task-form" on:submit|preventDefault={handleSubmit}>
  <!-- The user's input value will be stored in the newTask variable -->
    <input
            type="text"
            name="text"
            placeholder="Type to add new tasks"
            bind:value={newTask}
    />
    <!-- Call the submit function defined above when the user clicks "Submit" -->
    <button type="submit">Add Task</button>
</form>
