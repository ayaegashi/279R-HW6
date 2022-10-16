<script>
  export let task;

  const toggleChecked = () =>
    Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);


  const deleteThisTask = () => Meteor.call('tasks.remove', task._id);
</script>

<li>
    <input
            type="checkbox"
           readonly
           checked={!!task.isChecked}
           on:click={toggleChecked}
    />
    <span>
      {#if task.isChecked}
       <s>{ task.text }</s>
      {:else}
      { task.text }
      {/if}
    </span>
    <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>
