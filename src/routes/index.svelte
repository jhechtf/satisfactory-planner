<script lang="ts">
  import Checkbox from '@/components/checkbox';
  import InputTab from "./tabs/inputs.tabs.svelte";
  import Recipe from '../classes/recipe';
  import { Tabs, Tab } from '@/components/tabs';
  const j = [...Recipe.RecipesByOutput.entries()].reduce((cum, [key, recipes]) => {
    cum[key] = recipes.filter(r => r.name.includes('Alternate:') || r.name.includes('alternate:'))
    return cum;
  }, {} as {[key: string]: Recipe[]});
  let checked = true;
</script>

<div class="flex-grow">
  <div class="flex h-full">
    <div class="bg-gray-800 p-2 w-1/5">
      <div class="border border-gray-400 p-2 box-border rounded">
        <h1 class="text-2xl font-semibold">
          Mode
        </h1>
        <Checkbox/> Input bound
        <Tabs>
          <Tab header="Input">
            <div class="pt-2" style="font-size: 1rem">
              <InputTab />
            </div>
          </Tab>
          <Tab header="Alternates">
            Alternate recipes.
          </Tab>
          <Tab header="Outputs">
            Outputs?
          </Tab>
        </Tabs>
      </div>
    </div>
    <div class="p-2 flex-auto">
      This is the main section where I will attempt to draw some shit out.
      <pre>
        {JSON.stringify(j, null, 2)}
      </pre>
    </div>
  </div>
</div>