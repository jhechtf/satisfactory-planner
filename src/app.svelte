<script lang="ts">
  import { ItemType } from './classes/item';
  import type { ItemCount } from 'types/items';
  import { Router, Route } from 'yrv';
  import Filtering from './components/filtering.svelte';
  import Navbar from './components/navbar.svelte';
  import items from './stores/items';
  import loading from './stores/loading';
  import Recipe from './classes/recipe';
  
  let new_items: any[] = [];
  let recipes_for_item: Recipe[] = [];
  let chosen_recipe:  Recipe;
  let raw_items: ItemCount[] = [];

  $: new_items = [...$items.values()];

  $: {
    if(chosen_recipe) {
      raw_items = chosen_recipe.calculateRawMaterials({});
    }
  }

  function lookupRecipe(id: string) {
    const recipes = Recipe.RecipesByOutput.get(id);
    if(!recipes) return;
    recipes_for_item = recipes;
  }

</script>

<Navbar />

<Router pending="Loading..." path="/">
  <Route exact path="/" pending={"Loading"} component={() => import('./routes/index.svelte')}/>
  <Route fallback>
    404 Shenanigans not found.
  </Route>
</Router>

<footer class="p-2 text-center bg-black text-gray-200">
  <p>&copy; Jim Burbridge 2021.</p>
  <p>This is just a calculator for a game. I don't own the rights to anything Satisfactory related. I'm just trying to not get sued man.</p>
</footer>