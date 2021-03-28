export default class Item {
  static allItems = new Map<string, Item>();
  static findOrCreate(name: string, stackSize = 100, type: ItemType = ItemType.SOLID): Item {
    const item = Item.allItems.get(name);
    if (item !== undefined) return item;
    return new Item(name, null, stackSize, type);
  }
  constructor(public readonly name: string, public id: string | null, public readonly stackSize: number = 100, public readonly type: ItemType = ItemType.SOLID) {
    if (typeof id !== 'string') id = name, this.id = id;

    if (Item.allItems.has(id)) throw Error(`Duplicate key ${id} already found in items`);
    Item.allItems.set(id, this);
  }
}

export enum ItemType {
  SOLID = 'solid',
  LIQUID = 'liquid',
  GAS = 'gas'
};
