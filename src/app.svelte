<script lang="ts">
  import type { ItemCount } from 'types/items';
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

<div class="flex-grow p-2">
  {#if $loading}
    LOADING...
  {:else}
  <section class="w-3/5 mx-auto">
    <h1 class="text-3xl font-sans">Plantorio</h1>
    <Filtering
      mode='single'
      placeholder="Select an Item"
      on:selection={(e) => { lookupRecipe(e.detail.selection[0].id)}}
      items={new_items}
      getLabel={i=>i.name}
      >
        <div slot="filtering-item" let:item={item}>
          <h2 class="text-lg font-bold">{item.name}</h2>
          <p class="italic">{item.description}</p>
        </div>
      </Filtering>
    
      {#if recipes_for_item.length > 0}
        <h3>Choose Recipe:</h3>
        <Filtering
          mode='single'
          placeholder="Select a recipe"
          on:selection={(e) => chosen_recipe = e.detail.selection[0] }
          items={recipes_for_item}
          getLabel={r => r.toJSON()}
        >
        <div slot="filtering-item" let:item={recipe}>
          <h2 class="font-semibold">
            {recipe.name}
          </h2>
          <div class="flex flex-col md:flex-row justify-between content-center">
            <div class="flex flex-col md:flex-row">
              {#each recipe.inputs as input, index}
                {#if index != 0}
                  <div class="mx-2">+</div>
                {/if}
                <div>{input.count} &times; {input.item.name}</div>
              {/each}
            </div>
            <div class="flex-shrink">
              &rightarrow;
            </div>
            <div class="flex flex-col md:flex-row">
              {#each recipe.outputs as output, index}
                <div>
                  {output.count} &times; {output.item.name}
                </div>
              {/each}
            </div>
          </div>
        </div>
      </Filtering>
      {/if}
  
    </section>
    {/if}
  
</div>

<footer class="p-2 text-center bg-black text-gray-200">
  <p>&copy; Jim Burbridge 2021.</p>
  <p>This is just a calculator for a game. I don't own the rights to anything Satisfactory related. I'm just trying to not get sued man.</p>
</footer>