<script lang="ts">
  import type { Item } from './components/filtering.svelte';
  import Filtering from './components/filtering.svelte';
  import Navbar from './components/navbar.svelte';
  import items from './stores/items';
  import loading from './stores/loading';
  import Recipe from './classes/recipe';
  let new_items: Item[] = [];
  $: new_items = [...$items.values()].map(item => {
    return {
      key: item.id,
      label: item.name
    };
  });

  function lookupRecipe(id: string) {
    console.log(Recipe.RecipesByOutput);
  }
</script>

<Navbar />

<div class="flex-grow p-2">
  {#if $loading}
    LOADING...
  {:else}

  <h1 class="text-3xl font-sans">Plantorio</h1>
  
  <Filtering mode='single' placeholder="Select an Item" on:selection={(e) => { console.log(e.detail); lookupRecipe(e.detail.selection[0].key)}} items={new_items}/>
  {/if}
  
</div>

<footer class="p-2 text-center bg-black text-gray-200">
  <p>&copy; Jim Burbridge 2021.</p>
  <p>This is just a calculator for a game. I don't own the rights to anything Satisfactory related. I'm just trying to not get sued man.</p>
</footer>