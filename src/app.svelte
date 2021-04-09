<script lang="ts">
  import Navbar from './components/navbar.svelte';
  import items from './stores/items';
  import recipes from './stores/recipe';
</script>

<Navbar />

<div class="flex-grow">
  <h1>Plantorio</h1>
  I am jim
  {$items.size}
  <p>{$recipes}</p>
</div>

<footer>
  I am the footer
</footer>