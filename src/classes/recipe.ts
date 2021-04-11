import Item, { ItemType } from './item';
interface ItemCount {
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
  constructor(public name: string, id: string | null, public inputs: ItemCount[], public outputs: ItemCount[], public power: number = 100) {
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
}
