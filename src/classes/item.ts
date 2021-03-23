export default class Item {
  static allItems = new Map<string, Item>();
  static findOrCreate(name: string, stackSize: number = 100, type: ItemType = ItemType.SOLID): Item {
    const item = Item.allItems.get(name);
    if (item !== undefined) return item;
    return new Item(name, stackSize, type);
  }
  constructor(public readonly name: string, public readonly stackSize: number = 100, public readonly type: ItemType = ItemType.SOLID) {
    if (Item.allItems.has(name)) throw Error(`Duplicate key ${name} already found in items`);
    Item.allItems.set(name, this);
  }
}

export enum ItemType {
  SOLID = 'solid',
  LIQUID = 'liquid',
  GAS = 'gas'
};
