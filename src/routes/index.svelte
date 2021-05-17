<script lang="ts">
  import Filtering from '../components/filtering.svelte';
  import Recipe from '../classes/recipe';
  import { Tabs, Tab } from '@/components/tabs';
  const j = [...Recipe.RecipesByOutput.entries()].reduce((cum, [key, recipes]) => {
    cum[key] = recipes.filter(r => r.name.includes('Alternate:') || r.name.includes('alternate:'))
    return cum;
  }, {} as {[key: string]: Recipe[]});
  console.log(j);
  // let alternate_recipes;
  // $: alternate_recipes = Recipe.RecipesByOutput
</script>

<div class="flex-grow">
  <div class="flex h-full">
    <div class="bg-gray-800 p-2 w-1/6">
      <div class="border border-gray-400 p-2 box-border rounded">
        <h1 class="text-2xl font-semibold">
          Mode
        </h1>
        <label>
          <input type="checkbox" checked={true}>
          <span>Input Bound</span>
        </label>
        <Tabs>
          <Tab header="Input">
            What?
          </Tab>
          <Tab header="Alternates">
            Sup
          </Tab>
        </Tabs>
      </div>
    </div>
    <div class="p-2 flex-auto">
      This is the main section where I will attempt to draw some shit out.
    </div>
  </div>
</div>