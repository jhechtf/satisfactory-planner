<script lang="ts">
  import Filtering from '../components/filtering.svelte';
  import Recipe from '../classes/recipe';
  import { Tabs, Tab } from '@/components/tabs';
  // let recipe_ids = [...Recipe.RecipesByOutput.keys()];
</script>

<div class="flex-grow">
  <div class="flex h-full">
    <div class="bg-gray-800 p-2 w-1/6">
      <div class="border border-gray-400 p-2 box-border rounded">
        <h1 class="text-2xl font-semibold">
          Mode
        </h1>
        <label>
          <input type="checkbox">
          <span>Hello</span>
        </label>
        <Tabs>
          <Tab header="hello">
            What?
          </Tab>
        </Tabs>
      </div>
      
    </div>
    <div class="p-2 flex-auto">
      Please select some recipes from the side in order to continue.
    </div>
  </div>
</div>