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
    if (this.canIncreaseQuality(item)) {
      item.quality = item.quality + 1;
    }
  }

  decreaseQuality(item: Item) {
    if (this.canDecreaseQuality(item)) {
      item.quality = item.quality - 1;
    }
  }

  isUnderSellIn(item: Item): boolean {
    return item.sellIn < SELL_IN_THRESHHOLD;
  }

  decreaseSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }

  private updateAgedBrie(item: Item): void {
    this.increaseQuality(item);

    if (this.isUnderSellIn(item)) {
      this.increaseQuality(item);
    }

    this.decreaseSellIn(item);
  }

  private updateBackstagePass(item: Item): void {
    this.increaseQuality(item);

    if (item.sellIn < 11) {
      this.increaseQuality(item);
    }
    if (item.sellIn < 6) {
      this.increaseQuality(item);
    }

    if (this.isUnderSellIn(item)) {
      item.quality = item.quality - item.quality;
    }

    this.decreaseSellIn(item);
  }

  private updateConjured(item: Item): void {
    this.decreaseQuality(item);
    this.decreaseQuality(item);

    this.decreaseSellIn(item);
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case "Aged Brie":
          this.updateAgedBrie(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.updateBackstagePass(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Conjured Mana Cake":
          this.updateConjured(item);
          break;
        default:
          this.decreaseQuality(item);
          this.decreaseSellIn(item);
          if (this.isUnderSellIn(item)) {
            this.decreaseQuality(item);
          }
          break;
      }
    }

    return this.items;
  }
}
