export default class Item {
  static allItems = new Map<string, Item>();
  static findOrCreate(name: string, id: string | null, description: string, type: ItemType = ItemType.SOLID, isRaw: boolean): Item {
    const item = Item.allItems.get(name);
    if (item !== undefined) return item;
    return new Item(name, id || name, description, type, isRaw);
  }
  constructor(public readonly name: string, public id: string | null, public readonly description: string, public readonly type: ItemType = ItemType.SOLID, public isRaw = false) {
    if (typeof id !== 'string') id = name, this.id = id;
    // if (id === 'Desc_Cement_C') console.log(id, name);
    // if (Item.allItems.has(id)) throw Error(`Duplicate key ${id} already found in items`);
    Item.allItems.set(id, this);
  }
}

export enum ItemType {
  SOLID = 'solid',
  LIQUID = 'liquid',
  GAS = 'gas'
}

if (import.meta.hot) {
  // For hot reloads we need to brick this, otherwise we got collision errors.
  import.meta.hot.accept(() => Item.allItems = new Map<string, Item>());
}