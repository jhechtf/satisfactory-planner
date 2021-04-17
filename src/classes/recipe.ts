import Item, { ItemType } from './item';
import type { ItemCount } from '../../types/items';

export default class Recipe {
  /** @description All recipes, organized by the output item. */
  static RecipesByOutput = new Map<string, Recipe[]>();
  static findMaxOutputPerMinute(itemId: string) {
    const recipes = Recipe.RecipesByOutput.get(itemId);
    if (recipes == undefined) return null;
    let max = null, maxCount = 0;
    for (const recipe of recipes) {
      const [{ count }] = recipe.outputs.filter((o) => [o.item.id, o.item.name].includes(itemId));
      if (count > maxCount) max = recipe;

    }
    return max;
  }
  public id: string;
  /**
   * @param name the human-version of the recipe.
   * @param id the ID of the recipe.
   * @param inputs 
   * @param outputs
   * @param power Power outtage in MJ
   */
  constructor(public name: string, id: string | null, public inputs: ItemCount[], public outputs: ItemCount[]) {
    // if we id is not explicitly given then we assume it to be the same as the name.
    if (id == null) {
      this.id = name;
    } else {
      this.id = id;
    }
    // for each of the outputs we have to add an entry to the Recipes map. If there are already recipes, then we concat the array with our current element.
    // Otherwise we simply set the array to a new array consisting of this element
    for (const { item } of outputs) {
      const recipes = Recipe.RecipesByOutput.get(item.id as string);
      if (recipes) {
        Recipe.RecipesByOutput.set(item.id as string, recipes.concat(this));
      } else {
        Recipe.RecipesByOutput.set(item.id as string, [this]);
      }
    }
  }
  toJSON(): string {
    for (let item of this.inputs) {
      if (item.item.name === 'Water') console.log(item.item.count)
    }
    return `Recipe ${this.name}: ${this.inputs.map(input => `${input.item.type === ItemType.LIQUID ? input.count / 1000 : input.count} ${input.item.name}`).join(' + ')} -> ${this.outputs.map(output => `${output.item.type === ItemType.LIQUID ? output.count / 1000 : output.count} ${output.item.name}`).join(' + ')}`
  }

  calculateRawMaterials(alternates: { [key: string]: Recipe } = {}): ItemCount[] {
    const materials = [];
    // Loop through the inputs
    for (let input of this.inputs) {
      // get the multiplier of the recipe, if needed. 
      let multiplier = this.outputs[0].count / input.count;
      // If the input item is a raw material, simply push it to the array. 
      if (input.item.isRaw) materials.push(input);
      else {
        // Otherwise, we grab all the recipes that designate this as an output.
        const recipes = Recipe.RecipesByOutput.get(input.item.id as string);
        // this if statement is needed to make TS happy since Maps could in theory be undefined.
        if (recipes) {
          // Iterate over the recipes.
          for (let recipe of recipes) {
            // If the recipe matches one of the chosen alternates, we use it and break this loop.
            if (alternates[recipe.name]) {
              materials.push(...recipe.calculateRawMaterials(alternates).map(v => ({ count: v.count * multiplier, item: v.item })));
              break;
            }
            // Else we stop when we hit the default recipe.
            if (!recipe.name.toLowerCase().includes('alternate:')) {
              materials.push(...recipe.calculateRawMaterials(alternates).map(v => ({ count: v.count * multiplier, item: v.item })));
              break;
            }
          }
        }
      }
    }
    // We reduce the item down to a generic object to consolidate the counts, otherwise for recipes that have multiple dependencies on the same resource
    // We s
    return Object.values(materials.reduce(
      (cum: { [key: string]: ItemCount }, cur) => {

        if (cum[cur.item.id as string]) {
          cum[cur.item.id as string].count += cur.count;
        } else {
          cum[cur.item.id as string] = cur;
        }

        return cum;
      },
      {}
    ));
  }
}
/**
 * When we are doing hot reloading this will wipeout our default recipes so we don't have to deal with the errors thrown.
 */
if (import.meta.hot) {
  import.meta.hot.accept(() => Recipe.RecipesByOutput = new Map<string, Recipe[]>());
}
