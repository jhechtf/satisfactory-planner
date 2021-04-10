<script lang="ts">
  import Filtering from './components/filtering.svelte';
  import Navbar from './components/navbar.svelte';
  import items from './stores/items';
</script>

<Navbar />

<div class="flex-grow p-2">
  <h1 class="text-3xl font-sans">Plantorio</h1>
  
  <Filtering />
  
</div>

<footer class="p-2 text-center bg-black text-gray-200">
  <p>&copy; Jim Burbridge 2021.</p>
  <p>This is just a calculator for a game. I don't own the rights to anything Satisfactory related. I'm just trying to not get sued man.</p>
</footer>