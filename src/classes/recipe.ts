import type Item from './item';
interface ItemCount {
  /** @description the count of the items consumed / produced per minute */
  count: number;
  /**
   * @description the item being produced.
   */
  item: Item
}
export default class Recipe {
  /**
   * 
   * @param inputs 
   * @param outputs
   * @param power Power outtage in MJ
   */
  constructor(public inputs: ItemCount[], public outputs: ItemCount[], public power: number = 100) { }

  scaleByInputName(itemName: string, value: number) {
    // Grab the things that I need
    const { inputs, outputs, power } = this;
    // "differential" aka "multiplier"
    let differential = 1;
    // Let's find the sumbitch we need.
    for (const { count: amt, item } of inputs) {
      // Found him.
      if (item.name === itemName) {
        if (value > 2.5 * amt) throw Error(`Invalid Recipe Scaling: ${value} is greater than ${2.5 * amt} (250% of ${amt})`);
        differential = value / amt;
      }
      throw Error(`Item ${itemName} is not a part of this recipe. Inputs are: ${inputs.map(({ item }) => item.name).join(', ')}`);
    }

    return {
      // calculate new inputs
      inputs: inputs.map(({ count, item }) => ({
        count: count * differential,
        item: item
      })),
      // calculate new outputs
      outputs: outputs.map(({ count, item }) => ({
        count: count * differential,
        item: item
      })),
      // update the power differentials
      power: power * differential
    };

  }
}
