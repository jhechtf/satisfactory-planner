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
  <p>{$recipes?.length} Recipes</p>
</div>

<footer class="p-2 text-center bg-black text-gray-200">
  <p>&copy; Jim Burbridge 2021.</p>
  <p>This is just a calculator for a game. I don't own the rights to anything Satisfactory related. I'm just trying to not get sued man.</p>
</footer>