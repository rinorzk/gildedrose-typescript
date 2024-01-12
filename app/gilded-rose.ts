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

  canIncreaseQuality(item: Item) {
    return item.quality < 50;
  }

  canDecreaseQuality(item: Item) {
    return item.quality > 0;
  }

  increaseQuality(item: Item) {
    item.quality = item.quality + 1;
  }

  decreaseQuality(item: Item) {
    item.quality = item.quality - 1;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.canDecreaseQuality(this.items[i])) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.decreaseQuality(this.items[i]);
          }
        }
      } else {
        if (this.canIncreaseQuality(this.items[i])) {
          this.increaseQuality(this.items[i]);
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.canIncreaseQuality(this.items[i])) {
                this.increaseQuality(this.items[i]);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.canIncreaseQuality(this.items[i])) {
                this.increaseQuality(this.items[i]);
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.canDecreaseQuality(this.items[i])) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.decreaseQuality(this.items[i]);
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.canIncreaseQuality(this.items[i])) {
            this.increaseQuality(this.items[i]);
          }
        }
      }
    }

    return this.items;
  }
}
