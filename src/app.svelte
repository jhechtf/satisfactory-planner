<script lang="ts">
  import Navbar from './components/navbar.svelte';
  let mode = 'resource';
</script>

<Navbar />

<div class="flex-grow">
  <h1>Plantorio</h1>
  {#if mode === 'resource'}
    Hello
  {/if}
</div>

<footer>
  I am the footer
</footer>