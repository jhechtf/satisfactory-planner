<script lang="ts">
  import type { Item as FilteringItem } from './components/filtering.svelte';
  import Filtering from './components/filtering.svelte';
  import Navbar from './components/navbar.svelte';
  import items from './stores/items';
  import loading from './stores/loading';
  import Recipe from './classes/recipe';
  import recipe from './stores/recipe';
  let new_items: FilteringItem[] = [];
  let items_with_recipes: string[] = [];
  let recipes_for_item: Recipe[] = [];
  let chosen_recipe:  Recipe;
  $: new_items = [...$items.values()].map(item => {
    return {
      key: item.id,
      label: item.name
    };
  });
  $: items_with_recipes = [...Recipe.RecipesByOutput.keys()]
  $: {
    if(chosen_recipe) {
      chosen_recipe.calculateRawMaterials();
    }
  }

  function lookupRecipe(id: string) {
    const recipes = Recipe.RecipesByOutput.get(id);
    if(!recipes) return;
    recipes_for_item = recipes;
  }

</script>

<Navbar />

<div class="flex-grow p-2">
  {#if $loading}
    LOADING...
  {:else}

  <h1 class="text-3xl font-sans">Plantorio</h1>
  {items_with_recipes}  
  <Filtering mode='single' placeholder="Select an Item" on:selection={(e) => { lookupRecipe(e.detail.selection[0].key)}} items={new_items}/>
    {#if recipes_for_item.length > 0}
      Please Choose a Recipe:
      <select bind:value={chosen_recipe}>
        <option value={null} disabled>Choose one</option>
        {#each recipes_for_item as recipe}
          <option value={recipe}>{recipe.name}</option>
        {/each}
      </select>
    {/if}
  {/if}
  
</div>

<footer class="p-2 text-center bg-black text-gray-200">
  <p>&copy; Jim Burbridge 2021.</p>
  <p>This is just a calculator for a game. I don't own the rights to anything Satisfactory related. I'm just trying to not get sued man.</p>
</footer>