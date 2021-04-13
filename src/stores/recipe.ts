import Item, { ItemType } from '../classes/item';
import { derived } from 'svelte/store';
import type { RecipesInterface } from 'types/json';
import items from './items';
import Recipe from '../classes/recipe';

export default derived<typeof items, Recipe[]>(items, ($items, set) => {
  import('../data/recipes.json')
    .then(res => {
      // Sometimes when we first load the store it will have yet to process all of the items. We wait for that to finish.
      if ($items.size === 0) return null;
      const recipes = [];
      // iterate through the import.
      for (const { ClassName, inputs: rawInputs, outputs: rawOutputs, mManufactoringDuration, mDisplayName } of (res.default as RecipesInterface[])) {
        // Turn the duration into a number
        const manufacturingDuration = Number(mManufactoringDuration);
        // to get the per min we have to take the manufacturing duration, divide that into 60, and multiply that by each amount in the inputs/outputs. 
        const multiplier = Math.round(60 / manufacturingDuration * 1000) / 1000;
        // now we need to make the inputs and outputs match our structure for the recipes.
        const [inputs, outputs] = [
          rawInputs,
          rawOutputs
        ].map(ioArr => {
          return ioArr.map(io => {
            if (!$items.has(io.ItemClass)) new Item(io.ItemClass, null, ItemType.SOLID);
            return {
              count: io.Amount * multiplier,
              item: $items.get(io.ItemClass) as Item
            }
          });
        });
        recipes.push(new Recipe(mDisplayName, ClassName, inputs, outputs))
      }
      set(recipes);
    })
    .catch(console.error);
}, []);