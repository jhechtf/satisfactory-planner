<script lang="ts">
  export let id: string = '';
  export let checked = false;
</script>
<style>

  .checkbox-container {
    background-color: gray;
    display: inline-block;
    border-radius: 0.5em;
    width: 1.5em;
    height: 1em;
  }

  label input[type="checkbox"] {
    display: none;
  }

  .checkbox-indicator {
    @apply bg-gray-200;
    transition: transform ease-in 400ms, background-color linear 400ms;
    width: 1em;
    height: 1em;
    border-radius: 0.5em;
    transform: scale(0.70);
  }
  
  input:checked + .checkbox-container .checkbox-indicator {
    @apply bg-green-600;
    position: relative;
    transform: translateX(50%) scale(0.70);
  }
</style>
<label>
  <input type="checkbox" bind:checked={checked} id={id} on:change>
  <div class="checkbox-container">
    <div class="checkbox-indicator"></div>
  </div>
</label>