import Item, { ItemType } from './item';
export interface ItemCount {
  /** @description the count of the items consumed / produced per minute */
  count: number;
  /**
   * @description the item being produced.
   */
  item: Item
}
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
    return `Recipe ${this.name}: ${this.inputs.map(input => `${input.item.type === ItemType.LIQUID ? input.count / 1000 : input.count} ${input.item.name}`).join(' + ')} -> ${this.outputs.map(output => `${output.item.type === ItemType.LIQUID ? output.count / 1000 : output.count} ${output.item.name}`).join(' + ')}`
  }

  calculateRawMaterials() {
    const materials = [];
    for(let material of this.inputs) {
      const current_mats = [];
      const recipe = Recipe.RecipesByOutput.get(material.item.id as string)?.[0];
      if(recipe) {
        current_mats.push(...recipe.inputs.map(i => i.item.name));
        materials.push(...current_mats);
      }
    }
    console.log(materials);
    return materials;
  }
}
/**
 * When we are doing hot reloading this will wipeout our default recipes so we don't have to deal with the errors thrown.
 */
if(import.meta.hot) {
  import.meta.hot.accept(() => Recipe.RecipesByOutput = new Map<string, Recipe[]>());
}
