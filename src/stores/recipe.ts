import Item, { ItemType } from '../classes/item';
import { derived } from 'svelte/store';
import type { RecipesInterface } from 'types/json';
import items from './items';

export default derived(items, ($items, set) => {
  import('../data/recipes.json')
    .then(res => {
      // Sometimes when we first load the store it will have yet to process all of the items. We wait for that to finish.
      if ($items.size === 0) return;
      // iterate through the import.
      for (const { ClassName, inputs, outputs, mManufactoringDuration } of (res.default as RecipesInterface[])) {
        // Turn the duration into a number
        const manufacturingDuration = Number(mManufactoringDuration);
        // to get the per min we have to take the manufacturing duration, divide that into 60, and multiply that by each amount in the inputs/outputs. 
        const multiplier = Math.round(60 / manufacturingDuration * 1000) / 1000;
        // now we need to make the inputs and outputs match our structure for the recipes.
        const updatedInputs = inputs.map(input => {
          if (!$items.has(input.ItemClass)) new Item(input.ItemClass, null, ItemType.SOLID)
          return {
            count: input.Amount * multiplier,
            item: $items.get(input.ItemClass)
          }
        });
        const updatedOutputs = outputs.map(output => {
          if (!$items.has(output.ItemClass)) new Item(output.ItemClass, null, ItemType.SOLID);
          return {
            count: output.Amount * multiplier,
            item: $items.get(output.ItemClass)
          }
        })
        console.log(updatedInputs, updatedOutputs);
      }
    })
    .catch(console.error);
});