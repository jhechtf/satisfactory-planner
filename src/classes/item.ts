export default class Item {
  static allItems = new Map<string, Item>();
  static findOrCreate(name: string, id: string | null, description: string, type: ItemType = ItemType.SOLID, isRaw: boolean): Item {
    const item = Item.allItems.get(name);
    if (item !== undefined) return item;
    return new Item(name, id || name, description, type, isRaw);
  }
  id: string;
  constructor(public readonly name: string, id: string | null, public readonly description: string, public readonly type: ItemType = ItemType.SOLID, public isRaw = false) {
    this.id = typeof id !== 'string' ? name : id;
    Item.allItems.set(this.id, this);
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