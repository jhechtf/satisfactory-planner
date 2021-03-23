import type Item from './item';

export default class Recipe {
  constructor(public inputs: [number, Item][], public outputs: [number, Item][], public power: number = 100) { }

  scaleByInputName(itemName: string, value: number) {
    // Grab the things that I need
    const { inputs, outputs, power } = this;
    // "differential" aka "multiplier"
    let differential: number = 1;
    // Let's find the sumbitch we need.
    for (let [amt, item] of inputs) {
      // Found him.
      if (item.name === itemName) {
        if (value > 2.5 * amt) throw Error(`Invalid Recipe Scaling: ${value} is greater than ${2.5 * amt} (250% of ${amt})`);
        differential = value / amt;
      }
      throw Error(`Item ${itemName} is not a part of this recipe. Inputs are: ${inputs.map(([_, i]) => i.name).join(', ')}`);
    }

    return {
      // calculate new inputs
      inputs: inputs.map(([amt, item]) => [amt * differential, item]),
      // calculate new outputs
      outputs: outputs.map(([amt, item]) => [amt * differential, item]),
      // update the power differentials
      power: power * differential
    };

  }
}
