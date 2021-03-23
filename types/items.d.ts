export interface ItemCount {
  /** @description the count of the items consumed / produced per minute */
  count: number;
  /**
   * @description the item being produced.
   */
  item: Item
}