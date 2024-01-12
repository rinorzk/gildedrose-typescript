const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const SELL_IN_THRESHHOLD = 0;

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  canIncreaseQuality(item: Item): boolean {
    return item.quality < MAX_QUALITY;
  }

  canDecreaseQuality(item: Item): boolean {
    return item.quality > MIN_QUALITY;
  }

  increaseQuality(item: Item) {
    item.quality = item.quality + 1;
  }

  decreaseQuality(item: Item) {
    item.quality = item.quality - 1;
  }

  private isAgedBrie(item: Item): boolean {
    return item.name === "Aged Brie";
  }

  private isBackstagePass(item: Item): boolean {
    return item.name === "Backstage passes to a TAFKAL80ETC concert";
  }

  updateQuality() {
    for (const item of this.items) {
      if (
        item.name != "Aged Brie" &&
        item.name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.canDecreaseQuality(item)) {
          if (item.name != "Sulfuras, Hand of Ragnaros") {
            this.decreaseQuality(item);
          }
        }
      } else {
        if (this.canIncreaseQuality(item)) {
          this.increaseQuality(item);
          if (this.isBackstagePass(item)) {
            if (item.sellIn < 11) {
              if (this.canIncreaseQuality(item)) {
                this.increaseQuality(item);
              }
            }
            if (item.sellIn < 6) {
              if (this.canIncreaseQuality(item)) {
                this.increaseQuality(item);
              }
            }
          }
        }
      }
      if (item.name != "Sulfuras, Hand of Ragnaros") {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < SELL_IN_THRESHHOLD) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (this.canDecreaseQuality(item)) {
              if (item.name != "Sulfuras, Hand of Ragnaros") {
                this.decreaseQuality(item);
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (this.canIncreaseQuality(item)) {
            this.increaseQuality(item);
          }
        }
      }
    }

    return this.items;
  }
}
