<script>
    export let task;

    // When a task is checked, call the "setIsChecked" method defined in tasksMethods.js
    // and pass the task's id and current checked status as parameters
    const toggleChecked = () =>
      Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);

    // When a user wants to delete a task, called the "remove" method and pass the task's
    // id as a parameter
    const deleteThisTask = () => Meteor.call('tasks.remove', task._id);
</script>

<!-- Each item in the task will be defined as a list item -->
<li>
  <!-- Include an input field, which is a button that can be checked or unchecked  -->
  <!-- !! is a way of casting a truthy value as "true" or "false" -->
  <!-- When clicked, will call the toggleChecked method defined above -->
  <input
        type="checkbox"
        readonly
        checked={!!task.isChecked}
        on:click={toggleChecked}
  />
  <!-- If the "isChecked" attribute is true, then the task's text will display with a strikethrough -->
  <!-- Otherwise, the text will display without decoration -->
  <span>
    {#if task.isChecked}
    <s>{ task.text }</s>
    {:else}
    { task.text }
    {/if}
  </span>
  <!-- Create a button that allows the user to delete the task -->
  <!-- This will toggle the deleteThisTask function defined above -->
  <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>
